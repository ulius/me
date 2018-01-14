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
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      render: text => <a href="#">{text}</a>,
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: 70,
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: 'Action',
      key: 'action',
      width: 360,
      render: (text, record) => (
        <span>
      <a href="#">Action 一 {record.name}</a>
      <Divider type="vertical" />
      <a href="#">Delete</a>
      <Divider type="vertical" />
      <a href="#" className="ant-dropdown-link">
        More actions <Icon type="down" />
      </a>
    </span>
      ),
    }];
    const data = [];
    for (let i = 1; i <= 10; i++) {
      data.push({
        key: i,
        name: 'John Brown',
        age: `${i}2`,
        address: `New York No. ${i} Lake Park`,
        description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
      });
    }

    const expandedRowRender = record => <p>{record.description}</p>;
    const title = () => 'Here is title';
    const showHeader = true;
    const footer = () => 'Here is footer';
    const scroll = { y: 240 };
    this.state = {
      bordered: false,
      loading: false,
      pagination: true,
      size: 'default',
      expandedRowRender,
      title,
      showHeader,
      footer,
      rowSelection: {},
      scroll: undefined,
    };
    return (
      <div>
        <Table {...this.state} columns={columns} dataSource={data} />
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
