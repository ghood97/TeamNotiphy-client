import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const ScheduleForm = (props) => {
  return (
    <Form onSubmit={props.handleSubmit}>
      <Form.Group controlId="date">
        <Form.Label>Date</Form.Label>
        <Form.Control
          required
          name="date"
          value={props.event.date}
          type="datetime-local"
          onChange={props.handleChange}
        />
      </Form.Group>
      <Form.Group controlId="opponent">
        <Form.Label>Opponent</Form.Label>
        <Form.Control
          required
          name="opponent"
          value={props.event.opponent}
          type="text"
          placeholder="Opponent"
          onChange={props.handleChange}
        />
      </Form.Group>
      <Form.Group controlId="location">
        <Form.Label>Location</Form.Label>
        <Form.Control
          required
          name="location"
          value={props.event.location}
          type="text"
          placeholder="Text"
          onChange={props.handleChange}
        />
      </Form.Group>
      <Form.Group controlId="own-score">
        <Form.Label>{'My team\'s score'}</Form.Label>
        <Form.Control
          required
          name="own_score"
          value={props.event.own_score}
          type="number"
          placeholder="Own Score"
          onChange={props.handleChange}
        />
      </Form.Group>
      <Form.Group controlId="opp-score">
        <Form.Label>{'Opponent\'s Score'}</Form.Label>
        <Form.Control
          required
          name="opp_score"
          value={props.event.opp_score}
          type="number"
          placeholder="Oppoenent's Score"
          onChange={props.handleChange}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
      >
        Submit
      </Button>
      <Link to={props.cancelPath}><Button variant='danger'>Cancel</Button></Link>
    </Form>
  )
}

export default withRouter(ScheduleForm)
