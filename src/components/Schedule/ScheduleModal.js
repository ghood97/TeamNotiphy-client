import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import formattedDateWOTime from '../../formatDateWOTime'
import './ScheduleModal.scss'

const ScheduleModal = (props) => {
  const eventJsx = (
    props.events.map(x => {
      if (formattedDateWOTime(new Date(x.date)) === formattedDateWOTime(new Date(props.date))) {
        return (
          <div key={x.id}>
            <ul>
              <li><span className="font-weight-bold">When:</span> {x.day}, {x.date_formatted} at {x.time}</li>
              <li><span className="font-weight-bold">Who:</span> {x.opponent}</li>
              <li><span className="font-weight-bold">Where:</span> {x.location}</li>
            </ul>
            <hr />
          </div>
        )
      }
    })
  )
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Events on {formattedDateWOTime(new Date(props.date))}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {eventJsx}
      </Modal.Body>
      <Modal.Footer>
        <Button size="md" variant="secondary" onClick={props.handleClose} className="ml-2">Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ScheduleModal
