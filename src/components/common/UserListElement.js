import React, { PropTypes } from "react";
import { Link } from "react-router";
import { Button, Glyphicon } from "react-bootstrap";

// User List Element component
export default class UserListElement extends React.Component {
  // render
  render() {
    const {user, showDelete} = this.props;
    return (
      <tr>
        <td>#{user.id}</td>
        <td>{user.name}</td>
        <td>{user.protein}</td>
        <td>{user.carbs}</td>
        <td>{user.fat}</td>
        <td>serving size</td>
        <td>{user.amount}</td>
        <td>
          <Link to={'user-edit/' + user.id}>
            <Button bsSize="xsmall">
              Edit <Glyphicon glyph="edit"/>
            </Button>
          </Link>
        </td>
        <td>
          <Button bsSize="xsmall" className="user-delete" onClick={() => showDelete(user)}>
            Delete <Glyphicon glyph="remove-circle"/>
          </Button>
        </td>
      </tr>
    );
  }
}

// prop checks
UserListElement.propTypes = {
  user: PropTypes.object.isRequired,
  showDelete: PropTypes.func.isRequired,
}
