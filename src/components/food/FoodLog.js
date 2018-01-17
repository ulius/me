import React, { Component } from 'react'
import { AutoComplete, DatePicker, Button, Row, Col } from 'antd';
import { Table, Input, Popconfirm, Tag } from 'antd';
import {connect} from "react-redux";
import _ from 'lodash'


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
      { title: 'name', dataIndex: 'name',render: (text, record, index) => this.renderName(text, record, index) },
      { title: 'amount', dataIndex: 'amount', render: (text, record, index) => this.renderColumns(text, record, index)},
      { title: 'serving size', dataIndex: 'servingSize'},
      { title: 'protein', dataIndex: 'protein'},
      { title: 'carbs', dataIndex: 'carbs'},
      { title: 'fat', dataIndex: 'fat'},
      { title: 'calories', dataIndex: 'calories'},
    ];
    this.state = {
      logs: [],
      editable: false
    };
    this.cacheData = this.state.logs.map(item => ({...item}));
  }

  renderColumns(text, record, index) {
    return (
      <EditableCell
        editable={this.state.editable}
        value={text}
        onChange={value => this.handleAmountChange(value, record.key, index)}
      />
    );
  }

  onAutoCompleteSelect(value, option) {

    const newData = [...this.state.logs];
    const sourceFood = this.props.users.filter(item => value === item.name)[0];
    if (sourceFood) {
      const oldKey = newData[this.state.currentAutoComplete]['key'];
      newData[this.state.currentAutoComplete] =
        {
          source: sourceFood,
          amount: 0,
          protein: 0,
          carbs: 0,
          fat: 0,
          calories: 0,
          key: oldKey,
          name: sourceFood.name,
          servingSize: sourceFood.servingSize
        };

    }
    // const target = newData.filter(item => key === item.key)[0];
    // target[column] = value;
    this.setState({ logs: newData });
  }

  onAutoCompleteChange = (index) => {
    this.state.currentAutoComplete = index;
  };

  renderName = (text, record, index) => {
    const users = this.props.users.map(user => user.name).sort();
    return (
      <AutoComplete
        style={{ width: 200 }}
        key
        autoFocus
        value={text}
        dataSource={ users }
        onChange={() => this.onAutoCompleteChange(index)}
        onSelect={this.onAutoCompleteSelect}
        filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
      />
    );
  };

// {
//   source: sourceFood,
//   amount: 0,
//   protein: 0,
//   carbs: 0,
//   fat: 0,
//   key: oldKey,
//   name: sourceFood.name,
//   servingSize: sourceFood.servingSize
// };
  handleAmountChange = (value, key, index) => {
    const regex = /^(\d+\.?\d{0,9}|\.\d{1,2})$/;
    const isNumber = (value === '' || regex.test(value));
    if (!isNumber) return;

    const newData = [...this.state.logs];
    const target = this.state.logs[index];
    console.log(target);
    if (target) {
      const multiplier = value / target.source.amount;
      target.amount = value;
      target.protein = (multiplier * target.source.protein).toFixed(2);
      target.carbs = (multiplier * target.source.carbs).toFixed(2);
      target.fat = (multiplier * target.source.fat).toFixed(2);
      target.calories = ((target.protein * 4) + (target.carbs * 4) + (target.fat * 9)).toFixed(2);

      this.setState({ logs: newData });
    }
  };

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
    this.setState({ editable: !this.state.editable })
  }

  add() {
    const newData = [...this.state.logs];
    newData.push({
      key: (new Date).getTime(),
      name: "",
      protein: 0,
      carbs: 0,
      fat: 0,
      calories: 0,
      servingSize: "",
      amount: 0
    });
    this.setState({
      logs: newData,
      editable: true
    });
  }

  renderFooter = () => {
    return (
      <div>
        <Tag>
          Protein:{' '}
          {_.sumBy(this.state.logs, "protein")}
        </Tag>

        <Tag>
          Carbs:{' '}
          {_.sumBy(this.state.logs, "carbs")}
        </Tag>

        <Tag>
          Fat:{' '}
          {_.sumBy(this.state.logs, "fat")}
        </Tag>

        <Tag>
          Fat:{' '}
          {_.sumBy(this.state.logs, "calories")}
        </Tag>
      </div>
    );
  };


  render() {
    const tableConfig = {
      bordered: true,
      pagination: false,
      size: 'small',
    };
    return (
      <div>
        <Button onClick={() => this.editAll()}>Edit</Button>
        <Button type="primary" onClick={() => this.add()}>Add</Button>
        <Table {...tableConfig}
               dataSource={this.state.logs}
               columns={this.columns}
               footer={this.renderFooter}/>
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
