import React, { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Axios from 'axios'
import apiUrl from '../../apiConfig'
import { Card, Button } from 'react-bootstrap'
import formatDate from '../../formatDate'

const Home = (props) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    Axios(`${apiUrl}/posts`)
      .then(res => {
        setPosts(res.data.posts)
      })
      .catch(console.error)
  }, [])

  const postJsx = posts.map(post => {
    const date = new Date(post.created_at)
    const postBtnJsx = (
      <Link to={`/posts/${post.id}`}><Button size="sm" variant="info">Click to view post</Button></Link>
    )
    return (
      <Card bg="secondary" text="white" key={post.id} className="my-4 post-card">
        <Card.Header as="h5">{post.title}</Card.Header>
        <Card.Body>
          <Card.Text>{post.text}</Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex flex-row">
          <div>
            {formatDate(date)}
          </div>
          <div className="ml-auto">
            {props.user ? postBtnJsx : ''}
          </div>
        </Card.Footer>
      </Card>
    )
  })

  return (
    <div>
      {posts !== [] ? postJsx : 'Loading...'}
    </div>
  )
}

export default withRouter(Home)
