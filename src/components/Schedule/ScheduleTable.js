import React from 'react'
import { withRouter } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Schedule = (props) => {
  const eventJsx = props.events.map(x => (
    <tr key={x.id}>
      <td>day</td>
      <td>{new Date().toString()}</td>
      <td>{x.opponent}</td>
      <td>{x.location}</td>
      <td>time</td>
      <td>{x.result}</td>
      <td>{x.score}</td>
    </tr>
  ))

  return (
    <Table striped bordered hover size="sm" responsive className="mt-3">
      <thead>
        <tr>
          <th>Day</th>
          <th>Date</th>
          <th>Opponent</th>
          <th>Location</th>
          <th>Time</th>
          <th>Result</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {eventJsx}
      </tbody>
    </Table>
  )
}

export default withRouter(Schedule)
