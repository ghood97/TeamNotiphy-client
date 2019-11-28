import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'
import apiUrl from '../../apiConfig'
import formatDate from '../../formatDate'
import './Post.scss'
import CommentModal from '../Comment/CommentModal'
import CommentTable from '../Comment/CommentTable'
import { Button, Container } from 'react-bootstrap'

const Post = (props) => {
  const [post, setPost] = useState({ comments: [], created_at: '', id: null, text: '', title: '', user: {} })
  const [show, setShow] = useState(false)
  const [comment, setComment] = useState({ text: '', user_id: props.user.id, post_id: props.match.params.id })

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

  // for modal
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

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
    <Button onClick={handleDelete} size="sm" variant="danger">Delete</Button>
  )

  const postJsx = (
    <Container fluid="true">
      <div className="text-right">
        {props.user ? (props.user.id === post.user.id ? deleteJsx : '') : ''}
      </div>
      <h6 className="date-line">Created at: {formattedDate} | By: {post.user.email}</h6>
      <h1>{post.title}</h1>
      <hr />
      <h6>{post.text}</h6>
      <hr />
      <div className="d-flex flex-row justify-content-between mr-auto">
        <h5 className="font-weight-bold align-self-center">Comments</h5>
        <Button onClick={handleShow} size="sm" variant="success" className="align-self-center">New</Button>
      </div>
      <CommentTable user={props.user} handleDelete={handleCommentDelete} comments={post.comments}/>
      <CommentModal
        post={post}
        comment={comment}
        handleChange={handleChange}
        handleClose={handleClose}
        handleCommentSubmit={handleCommentSubmit}
        show={show}
      />
    </Container>
  )

  return (
    <h1>{post === {} ? 'Loading...' : postJsx}</h1>
  )
}

export default withRouter(Post)
