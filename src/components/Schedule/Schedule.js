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

  if (events === []) {
    return <h1>Loading...</h1>
  }

  return (
    <div>
      <Link to='/create-event'><Button variant='success'>New Event</Button></Link>
      <ScheduleTable user={props.user} events={events} />
    </div>
  )
}

export default withRouter(Schedule)
