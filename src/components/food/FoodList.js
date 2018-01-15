import React, { Component } from 'react'
import {connect} from "react-redux";
import { Table, Icon, Switch, Radio, Form, Divider } from 'antd';
const FormItem = Form.Item;

export class FoodList extends Component {
  componentWillMount() {

  }
  render() {
    const columns = [
      { title: 'name', dataIndex: 'name'},
      { title: 'protein', dataIndex: 'protein'},
      { title: 'carbs', dataIndex: 'carbs'},
      { title: 'fat', dataIndex: 'fat'},
      { title: 'serving size', dataIndex: 'servingSize'},
      { title: 'amount', dataIndex: 'amount'},
      ];
    const tableConfig = {
      bordered: true,
      pagination: false,
      size: 'small',
      rowSelection: {},
      scroll: undefined,
    };
    return (
      <div>
        <Table {...tableConfig} columns={columns} dataSource={this.props.users} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users.map(user => {
      return {...user, key: user.id}
    })
  };
}

export default connect(mapStateToProps)(FoodList);
