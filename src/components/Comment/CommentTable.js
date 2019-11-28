import React from 'react'
import { withRouter } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import './CommentTable.scss'

const CommentTable = (props) => {
  const commentJsx = props.comments.map(x => (
    <tr key={x.id}>
      <td className="font-weight-bold tableRow text-wrap text-break col-6">{x.text}</td>
      <td className="font-weight-bold tableRow text-right col-4">{x.user.email}</td>
      {props.user.id === x.user.id
        ? <td className="text-right col-2">
          <Button
            data-comment-id={x.id}
            onClick={props.handleDelete}
            variant="danger"
            className="comment-delete-btn align-center"
          >
            Delete
          </Button>
        </td>
        : <td className="font-weight-bold tableRow no-delete-text text-center col-2">{'Can\'t delete'}</td>}
    </tr>
  ))

  return (
    <Table striped bordered hover size="sm" responsive className="mt-3">
      <thead>
      </thead>
      <tbody>
        {commentJsx}
      </tbody>
    </Table>
  )
}

export default withRouter(CommentTable)
