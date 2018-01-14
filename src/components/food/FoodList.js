import React, { Component } from 'react'
import {connect} from "react-redux";
import { Table, Icon, Switch, Radio, Form, Divider } from 'antd';
const FormItem = Form.Item;

export class FoodList extends Component {
  componentWillMount() {
    console.log("component mounting foodlist")
    this.props.dispatch({type: 'USERS_FETCH_LIST'});
  }
  render() {
    const columns = [
      { title: 'name', dataIndex: 'name', key: 'name' },
      { title: 'protein', dataIndex: 'protein', key: 'protein' },
      { title: 'carbs', dataIndex: 'carbs', key: 'carbs' },
      { title: 'fat', dataIndex: 'fat', key: 'fat' },
      { title: 'serving size', dataIndex: 'servingSize', key: 'servingSize' },
      { title: 'amount', dataIndex: 'amount', key: 'amount' },
      ];
    const tableConfig = {
      bordered: true,
      pagination: true,
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
    users: state.users
  };
}

export default connect(mapStateToProps)(FoodList);
