import React, { useEffect, useState, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'
import apiUrl from '../../apiConfig'
import formatDate from '../../formatDate'
import './Post.scss'
import CommentModal from '../Comment/CommentModal'
import CommentTable from '../Comment/CommentTable'
import { Button, ButtonGroup, Card } from 'react-bootstrap'

const Post = (props) => {
  const [post, setPost] = useState({ comments: [], created_at: '', id: null, text: '', title: '', user: {} })
  const [showCreate, setShowCreate] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [comment, setComment] = useState({ text: '', user_id: props.user.id, post_id: props.match.params.id })
  const [commentId, setCommentId] = useState(null)

  useEffect(() => {
    Axios(`${apiUrl}/posts/${props.match.params.id}`)
      .then(res => {
        setPost(res.data.post)
      })
      .catch(console.error)
  }, [])

  const handleChange = (event) => {
    event.persist()
    setComment({ ...comment, [event.target.name]: event.target.value })
  }

  // for comment create modal
  const handleCreateClose = () => setShowCreate(false)
  const handleCreateShow = () => setShowCreate(true)

  // for comment edit modal
  const handleEditClose = () => setShowEdit(false)
  const handleEditShow = (event) => {
    event.persist()
    setShowEdit(true)
    setCommentId(event.target.dataset.commentId)
  }

  // handleSubmit for comment-create modal
  const handleCommentSubmit = (event) => {
    event.preventDefault()
    Axios({
      method: 'POST',
      url: `${apiUrl}/comments`,
      headers: {
        Authorization: `Token token=${props.user.token}`
      },
      data: { comment }
    })
      .then(res => {
        Axios(`${apiUrl}/posts/${props.match.params.id}`)
          .then(res => {
            setPost(res.data.post)
          })
      })
      .catch(console.error)
  }

  const handleCommentEdit = (event) => {
    event.preventDefault()
    Axios({
      method: 'PATCH',
      url: `${apiUrl}/comments/${commentId}`,
      headers: {
        Authorization: `Token token=${props.user.token}`
      },
      data: { comment }
    })
      .then(res => {
        Axios(`${apiUrl}/posts/${props.match.params.id}`)
          .then(res => {
            setPost(res.data.post)
          })
      })
      .catch(console.error)
  }

  const handleCommentDelete = (event) => {
    event.preventDefault()
    const commentId = event.target.dataset.commentId
    Axios({
      method: 'DELETE',
      url: `${apiUrl}/comments/${commentId}`,
      headers: {
        Authorization: `Token token=${props.user.token}`
      }
    })
      .then(res => {
        Axios(`${apiUrl}/posts/${props.match.params.id}`)
          .then(res => {
            setPost(res.data.post)
          })
      })
      .catch(console.error)
  }

  const handleDelete = (event) => {
    event.preventDefault()
    Axios({
      method: 'DELETE',
      url: `${apiUrl}/posts/${props.match.params.id}`,
      headers: {
        Authorization: `Token token=${props.user.token}`
      }
    })
      .then(res => {
        props.alert({
          heading: 'Deleted',
          message: 'Post Deleted.',
          variant: 'danger'
        })
      })
      .then(() => {
        props.history.push('/')
      })
      .catch(console.error)
  }

  const formattedDate = formatDate(new Date(post.created_at))

  const deleteJsx = (
    <div className="d-flex flex-column align-items-end">
      <ButtonGroup vertical>
        <Button href={`#posts/${props.match.params.id}/edit`} size="sm" variant="info">Edit</Button>
        <Button onClick={handleDelete} size="sm" variant="danger">Delete</Button>
      </ButtonGroup>
    </div>
  )

  const postJsx = (
    <Fragment>
      <Card bg="light" text="black" className="my-4 post-card">
        <Card.Header>
          <div className="text-right">
            {props.user ? (props.user.id === post.user.id ? deleteJsx : null) : null}
          </div>
          <h6 className="date-line">Created at: {formattedDate} | By: {post.user.email}</h6>
          <h2>{post.title}</h2>
        </Card.Header>
        <Card.Body>
          <Card.Text className="card-text">
            {post.text}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <div className="d-flex flex-row justify-content-between mr-auto">
            <h5 className="font-weight-bolder align-self-center">Comments</h5>
            <Button onClick={handleCreateShow} size="sm" variant="success" className="align-self-center">New</Button>
          </div>
          <CommentTable
            user={props.user}
            handleDelete={handleCommentDelete}
            handleEditShow={handleEditShow}
            comments={post.comments}
          />
        </Card.Footer>
      </Card>
      <CommentModal
        header='New comment on '
        action={handleCommentSubmit}
        post={post}
        comment={comment}
        handleChange={handleChange}
        handleClose={handleCreateClose}
        show={showCreate}
      />
      <CommentModal
        header="Update your comment on "
        action={handleCommentEdit}
        post={post}
        comment={comment}
        handleChange={handleChange}
        handleClose={handleEditClose}
        show={showEdit}
      />
    </Fragment>
  )

  return (
    <h1>{post === {} ? 'Loading...' : postJsx}</h1>
  )
}

export default withRouter(Post)
