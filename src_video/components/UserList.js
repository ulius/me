import React from 'react';

import UserListElement from './UserListElement'
import UserDelete from './UserDelete'
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';

class UserList extends React.Component {
  render() {
    return (
      <div>
      <Table bordered hover responsive striped>
        <thead>
        <tr>
          <th>id</th>
          <th>username</th>
          <th>job</th>
          <th>edit</th>
          <th>delete</th>
        </tr>
        </thead>
        <tbody>
        {this.props.users.map((user, index) => {
          return (
            <UserListElement key={user.id} user={user}/>
          )
        })}

        </tbody>
      </Table>
      <UserDelete/>
    </div>
    )
  }
}

function mapStateToProps(state) {
  return({
    users: state.users.list
  })
}

export default connect(mapStateToProps)(UserList)

