import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'
import apiUrl from '../../apiConfig'
import formatDate from '../../formatDate'

const Post = (props) => {
  const [post, setPost] = useState({ comments: [], created_at: '', id: null, text: '', title: '', user: {} })

  useEffect(() => {
    Axios(`${apiUrl}/posts/${props.match.params.id}`)
      .then(res => {
        console.log(res.data.post)
        setPost(res.data.post)
      })
      .catch(console.error)
  }, [])

  const formattedDate = formatDate(new Date(post.created_at))

  const commentJsx = post.comments.map(x => (
    <div key={x.id}>
      <h6>{x.text}</h6>
    </div>
  ))

  const postJsx = (
    <div>
      <h6>Created at: {formattedDate} | By: {post.user.email}</h6>
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
