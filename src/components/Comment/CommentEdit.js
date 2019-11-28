import React, { useState, useEffect } from 'react'
import { Card, Form, Container, Button } from 'react-bootstrap'
import { withRouter, Redirect } from 'react-router-dom'
import Axios from 'axios'
import apiUrl from '../../apiConfig'

const CommentEdit = (props) => {
  const [comment, setComment] = useState({ text: '', user: {}, post_id: null })
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    Axios(`${apiUrl}/comments/${props.match.params.commentId}`)
      .then(res => {
        setComment(res.data.comment)
      })
      .catch(console.error)
  }, [])

  const handleChange = (event) => {
    event.persist()
    setComment({ ...comment, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    Axios({
      method: 'PATCH',
      url: `${apiUrl}/comments/${props.match.params.commentId}`,
      headers: {
        Authorization: `Token token=${props.user.token}`
      },
      data: { comment }
    })
      .then(res => {
        props.alert({ heading: 'Success', message: 'Comment updated', variant: 'success' })
        setUpdated(true)
      })
      .catch(() => {
        props.alert({
          heading: 'Oops',
          message: 'Something went wrong. Please try again.',
          variant: 'danger'
        })
      })
  }

  if (updated) {
    props.setUpdated(true)
    return <Redirect to={`/posts/${props.match.params.id}`} />
  }

  return (
    <Card bg="light" text="black" className="my-4 post-card">
      <Card.Header>
        <h2>{`Edit comment on ${props.post.title}`}</h2>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="text">
            <Form.Label>Edit your comment below</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              required
              name="text"
              value={comment.text}
              type="text"
              placeholder="Comment goes here"
              onChange={handleChange}
            />
          </Form.Group>
          <Container fluid="true" className="d-flex flex-row justify-content-end">
            <Button size="md" variant="primary"type="submit" onClick={props.handleClose}>Update</Button>
            <Button size="md" variant="secondary" onClick={props.handleClose} className="ml-2">Close</Button>
          </Container>
        </Form>
      </Card.Body>
      <Card.Footer>
      </Card.Footer>
    </Card>
  )
}

export default withRouter(CommentEdit)
