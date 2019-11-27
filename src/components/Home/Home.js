import React, { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Axios from 'axios'
import apiUrl from '../../apiConfig'
import { Card, Button } from 'react-bootstrap'
import formatDate from '../../formatDate'

const Home = (props) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    console.log('in useEffect')
    fetchPosts()
  }, [])

  const fetchPosts = () => {
    Axios(`${apiUrl}/posts`)
      .then(res => {
        console.log(res)
        setPosts(res.data.posts)
      })
      .catch(console.error)
  }

  const handleDelete = (event) => {
    event.preventDefault()
    const postId = event.target.getAttribute('data-id')
    Axios({
      method: 'DELETE',
      url: `${apiUrl}/posts/${postId}`,
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
        fetchPosts()
      })
      .catch(console.error)
  }

  const postJsx = posts.map(post => {
    const deleteBtnJsx = (
      <Button data-id={post.id} onClick={handleDelete} size="sm" variant="danger" className="ml-2">Delete</Button>
    )
    const date = new Date(post.created_at)
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
            <Link to={`/posts/${post.id}`}><Button size="sm" variant="info">Click to see comments</Button></Link>
            {props.user ? (props.user.id === post.user.id ? deleteBtnJsx : '') : ''}
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
