import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { Table, Button, ButtonGroup } from 'react-bootstrap'
import './ScheduleTable.scss'

const Schedule = (props) => {
  const eventJsx = props.events.map(x => {
    // seperates scores with a dash
    // const score = `${x.own_score}\n${x.opp_score}`

    // sets class name to change color based on result
    let result
    if (x.own_score > x.opp_score) {
      result = 'win'
    } else if (x.own_score < x.opp_score) {
      result = 'loss'
    } else {
      result = 'tie'
    }

    // checks for ownership and displays edit and delete buttons
    return (
      <tr key={x.id}>
        <td className='text-center text-wrap'>{x.day}</td>
        <td className='text-center text-wrap'>{x.date}</td>
        <td className='text-center text-wrap'>{x.opponent}</td>
        <td className='text-center text-wrap'>{x.location}</td>
        <td className='text-center text-wrap'>{x.time}</td>
        <td className={`${result} text-center`}>{x.own_score}<br/>--<br/>{x.opp_score}</td>
        {props.user && props.user.id === x.user_id
          ? <td className="text-right">
            <ButtonGroup vertical>
              <Button
                size="sm"
                variant="info"
                data-comment-id={x.id}
                className="schedule-btn-group"
                onClick={props.handleEditShow}>
                Edit
              </Button>
              <Button
                size="sm"
                data-comment-id={x.id}
                onClick={props.handleDelete}
                variant="danger"
                className="schedule-btn-group"
              >
                Delete
              </Button>
            </ButtonGroup>
          </td>
          : null}
      </tr>
    )
  })

  return (
    <Fragment>
      <br /><p className="mt-3 mb-0 px-2 legend"><small><span className="win">Green</span> = win<br/><span className="loss">Red</span> = loss<br/><span className="tie">Yellow</span> = tie</small></p>
      <Table variant="dark" striped bordered hover size="sm" responsive>
        <thead>
          <tr>
            <th>Day</th>
            <th>Date</th>
            <th>Opponent</th>
            <th>Location</th>
            <th>Time</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {eventJsx}
        </tbody>
      </Table>
    </Fragment>
  )
}

export default withRouter(Schedule)
