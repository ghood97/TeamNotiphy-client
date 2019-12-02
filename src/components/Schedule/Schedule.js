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
        console.log(res)
        setEvents(res.data.events)
        console.log(events)
      })
      .catch(console.error)
  }, [])

  if (events === []) {
    return <h1>Loading...</h1>
  }

  return (
    <div>
      <Link to='/create-event'><Button>New Event</Button></Link>
      <ScheduleTable events={events} />
    </div>
  )
}

export default withRouter(Schedule)
