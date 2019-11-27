import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'
import apiUrl from '../../apiConfig'
import formatDate from '../../formatDate'
import './Post.scss'
import CommentModal from '../Comment/CommentModal'
import { Button } from 'react-bootstrap'

const Post = (props) => {
  const [post, setPost] = useState({ comments: [], created_at: '', id: null, text: '', title: '', user: {} })
  const [show, setShow] = useState(false)
  const [comment, setComment] = useState({ text: '', user_id: props.user.id, post_id: props.match.params.id })

  const handleChange = (event) => {
    event.persist()
    setComment({ ...comment, [event.target.name]: event.target.value })
  }

  // for modal
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // handleCommentSubmitHere!!!

  useEffect(() => {
    Axios(`${apiUrl}/posts/${props.match.params.id}`)
      .then(res => {
        setPost(res.data.post)
      })
      .catch(console.error)
  }, [])

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

  const commentJsx = post.comments.map(x => (
    <div key={x.id}>
      <h6>{x.text}</h6>
    </div>
  ))

  const deleteJsx = (
    <Button onClick={handleDelete} variant="danger">Delete</Button>
  )

  const postJsx = (
    <div>
      <h6 className="date-line">Created at: {formattedDate} | By: {post.user.email}</h6>
      {props.user ? (props.user.id === post.user.id ? deleteJsx : '') : ''}
      <hr />
      <h1>{post.title}</h1>
      <hr />
      <h4>{post.text}</h4>
      <hr />
      <div className="d-flex flex-row justify-content-between mr-auto">
        <h5 className="font-weight-bold align-self-center">Comments</h5>
        <Button onClick={handleShow} size="sm" variant="success" className="align-self-center">New</Button>
      </div>
      {commentJsx}
      <CommentModal post={post} comment={comment} handleChange={handleChange} handleClose={handleClose} show={show} />
    </div>
  )

  return (
    <h1>{post === {} ? 'Loading...' : postJsx}</h1>
  )
}

export default withRouter(Post)
