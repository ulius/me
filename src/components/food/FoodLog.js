import React, { Component } from 'react'
import { AutoComplete, DatePicker, Button, Row, Col } from 'antd';
import { Table, Input, Popconfirm } from 'antd';
import {connect} from "react-redux";


export class FoodLog extends Component {
  render() {
    return (
      <div>
        <DatePicker onChange={this.onChange} />
        <Row>
          <Col span={3}>
            <EditableTable {...this.props} />
          </Col>
          <Col span={3}>
            <EditableTable {...this.props} />
          </Col>
          <Col span={3}>
            <EditableTable {...this.props} />
          </Col>
          <Col span={3}>
            <EditableTable {...this.props} />
          </Col>
          <Col span={4}>
            <EditableTable {...this.props} />
          </Col>
          <Col span={4}>
            <EditableTable {...this.props} />
          </Col>
          <Col span={4}>
            <EditableTable {...this.props} />
          </Col>
        </Row>
      </div>
    )
  }

}
///
const data = [];
for (let i = 0; i < 5; i++) {
  data.push({
    key: i.toString(),
    name: `food ${i}`,
    protein: 1,
    carbs: 2,
    fat: 2,
    servingSize: "grams",
    amount: 2
  });
}

const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      { title: 'name', dataIndex: 'name',render: (text, record) => this.renderName(text, record, 'name') },
      { title: 'protein', dataIndex: 'protein', render: (text, record) => this.renderColumns(text, record, 'protein')},
      { title: 'carbs', dataIndex: 'carbs', render: (text, record) => this.renderColumns(text, record, 'carbs')},
      { title: 'fat', dataIndex: 'fat', render: (text, record) => this.renderColumns(text, record, 'fat')},
      { title: 'serving size', dataIndex: 'servingSize', render: (text, record) => this.renderColumns(text, record, 'servingSize')},
      { title: 'amount', dataIndex: 'amount', render: (text, record) => this.renderColumns(text, record, 'amount')},
    ];
    this.state = {
      data: data,
      editable: false
    };
    this.cacheData = data.map(item => ({...item}));
  }

  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={this.state.editable}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  }

  renderName(text, record, column) {
    const users = this.props.users.map(user => user.name)
    return (
      <AutoComplete
        style={{ width: 20 }}
        dataSource={ users }
        placeholder="try to type `b`"
        key
        filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
        // filterOption={true}
      />
    );
  }

  handleChange(value, key, column) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target[column] = value;
      this.setState({ data: newData });
    }
  }
  edit(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target.editable = true;
      this.setState({ data: newData });
    }
  }
  save(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      delete target.editable;
      this.setState({ data: newData });
      this.cacheData = newData.map(item => ({ ...item }));
    }
  }
  cancel(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
      delete target.editable;
      this.setState({ data: newData });
    }
  }

  editAll() {
    console.log("editAll")
    this.setState({ editable: !this.state.editable })
  }

  add() {
    const newData = [...this.state.data];
    newData.unshift({
      key: (new Date).getTime(),
      name: `new food`,
      protein: 0,
      carbs: 0,
      fat: 0,
      servingSize: "grams",
      amount: 0
    });
    this.setState({ data: newData });
  }


  render() {
    console.log("food log props:", this.props.users)
    const tableConfig = {
      bordered: true,
      pagination: false,
      size: 'small',
    };
    return (
      <div>
        <Button onClick={() => this.editAll()}>Edit</Button>
        <Button type="primary" onClick={() => this.add()}>Add</Button>
        <Table {...tableConfig} dataSource={this.state.data} columns={this.columns} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.users.map(user => {
      return {...user, key: user.id.toString()}
    })
  };
}

export default connect(mapStateToProps)(FoodLog);
