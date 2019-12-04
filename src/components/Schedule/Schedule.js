import React, { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Axios from 'axios'
import apiUrl from '../../apiConfig'
import ScheduleTable from './ScheduleTable'
import { Button } from 'react-bootstrap'

const Schedule = (props) => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    Axios(`${apiUrl}/events`)
      .then(res => {
        setEvents(res.data.events)
      })
      .catch(console.error)
  }, [])

  const handleDelete = (event) => {
    event.preventDefault()
    const eventId = event.target.dataset.eventId
    Axios({
      method: 'DELETE',
      url: `${apiUrl}/events/${eventId}`,
      headers: {
        Authorization: `Token token=${props.user.token}`
      }
    })
      .then(res => {
        Axios({
          url: `${apiUrl}/events`,
          method: 'GET',
          headers: {
            'Authorization': `Token token=${props.user.token}`
          }
        })
          .then(res => {
            setEvents(res.data.events)
          })
      })
      .then(() => {
        props.alert({
          heading: 'Deleted',
          message: 'Event deleted',
          variant: 'danger'
        })
      })
      .catch(() => {
        props.alert({
          heading: 'Oops',
          message: 'Couldn\'t delete your event. Try Again.',
          variant: 'danger'
        })
      })
  }

  if (events === []) {
    return <h1>Loading...</h1>
  }

  return (
    <div>
      {props.user ? <Link to='/create-event'><Button variant='success'>New Event</Button></Link> : null}
      <ScheduleTable user={props.user} events={events} handleDelete={handleDelete}/>
    </div>
  )
}

export default withRouter(Schedule)
