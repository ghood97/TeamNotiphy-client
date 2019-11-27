import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'
import apiUrl from '../../apiConfig'
import formatDate from '../../formatDate'
import './Post.scss'
import { Button } from 'react-bootstrap'

const Post = (props) => {
  const [post, setPost] = useState({ comments: [], created_at: '', id: null, text: '', title: '', user: {} })

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
      <h5 className="font-weight-bold">Comments:</h5>
      {commentJsx}
    </div>
  )

  return (
    <h1>{post === {} ? 'Loading...' : postJsx}</h1>
  )
}

export default withRouter(Post)
