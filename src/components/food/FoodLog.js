import React, { Component } from 'react'
import { AutoComplete, DatePicker, Button, Row, Col } from 'antd';
import { Table, Input, Popconfirm } from 'antd';
import {connect} from "react-redux";


export class FoodLog extends Component {
  render() {
    return (
      <div>
        <DatePicker onChange={this.onChange} />
        <EditableTable {...this.props} />
      </div>
    )
  }

}
///
// const data = [];

  /**
   * add new food
   * use typeahead to find food
   * data.push
   * {
   * source: {name: "chicken", protein: 6, carbs: 0, fat: .7, servingSize: "ounce", amount: 1},
   * name: "chicken", protein: 6, carbs: 0, fat: .7, servingSize: "ounce", amount: .5
   * };
   * amount / source.amount
   * eg:
   * .5 / 1 = .5
   * 6/1 = 6
   * multiply this by source.protein, source.carbs, src.fat
   *
   *
   *
   *
   *
   { name: "chicken", protein: 6, carbs: 0, fat: .7, servingSize: "ounce", amount: 1 };
   */
  // data.push({
  //   key: i.toString(),
  //   name: `food ${i}`,
  //   protein: 1,
  //   carbs: 2,
  //   fat: 2,
  //   servingSize: "grams",
  //   amount: 2
  // });

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
    this.onAutoCompleteSelect = this.onAutoCompleteSelect.bind(this);
    this.columns = [
      { title: 'name', dataIndex: 'name',render: (text, record) => this.renderName(text, record, 'name') },
      { title: 'protein', dataIndex: 'protein'},
      { title: 'carbs', dataIndex: 'carbs'},
      { title: 'fat', dataIndex: 'fat'},
      { title: 'serving size', dataIndex: 'servingSize'},
      { title: 'amount', dataIndex: 'amount', render: (text, record) => this.renderColumns(text, record, 'amount')},
    ];
    this.state = {
      logs: [],
      editable: false
    };
    this.cacheData = this.state.logs.map(item => ({...item}));
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

  onAutoCompleteSelect(value, option) {
    const newData = [...this.state.logs];
    // const target = newData.filter(item => key === item.key)[0];
    const sourceFood = this.props.users.filter(item => value === item.name)[0];
    if (target) {
      // newData.push({
      //   source: sourceFood,
      //   name: sourceFood.name, protein: sourceFood.
      // });
      console.log(target)
      // target[column] = value;
      // this.setState({ logs: newData });
    }
  }

  renderName(text, record, column) {
    console.log("text:", text);
    console.log("record:", record);
    console.log("column:", column);
    const users = this.props.users.map(user => user.name).sort();
    return (
      <AutoComplete
        style={{ width: 200 }}
        key
        dataSource={ users }
        placeholder="try to type `b`"
        onSelect={this.onAutoCompleteSelect}
        filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
      />
    );
  }

  handleChange(value, key, column) {
    const newData = [...this.state.logs];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target[column] = value;
      this.setState({ logs: newData });
    }
  }
  edit(key) {
    const newData = [...this.state.logs];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target.editable = true;
      this.setState({ logs: newData });
    }
  }
  save(key) {
    const newData = [...this.state.logs];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      delete target.editable;
      this.setState({ logs: newData });
      this.cacheData = newData.map(item => ({ ...item }));
    }
  }
  cancel(key) {
    const newData = [...this.state.logs];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
      delete target.editable;
      this.setState({ logs: newData });
    }
  }

  editAll() {
    console.log("editAll")
    this.setState({ editable: !this.state.editable })
  }

  add() {
    const newData = [...this.state.logs];
    newData.unshift({
      key: (new Date).getTime(),
      name: `new food`,
      protein: 0,
      carbs: 0,
      fat: 0,
      servingSize: "grams",
      amount: 0
    });
    this.setState({ logs: newData });
  }


  render() {
    console.log("food log props:", this.props.users);
    const tableConfig = {
      bordered: true,
      pagination: false,
      size: 'small',
    };
    return (
      <div>
        <Button onClick={() => this.editAll()}>Edit</Button>
        <Button type="primary" onClick={() => this.add()}>Add</Button>
        <Table {...tableConfig} dataSource={this.state.logs} columns={this.columns} />
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
