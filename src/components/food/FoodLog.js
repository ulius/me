import React, { Component } from 'react'
import { AutoComplete, DatePicker, Button, Row, Col } from 'antd';
import { TimePicker, Table, Input, Popconfirm, Tag } from 'antd';
import {connect} from "react-redux";
import _ from 'lodash'
import moment from 'moment';


export class FoodLog extends Component {
  render() {
    return (
      <div>
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
      { title: 'pro', dataIndex: 'protein', width: 60},
      { title: 'carb', dataIndex: 'carbs', width: 60},
      { title: 'fat', dataIndex: 'fat', width: 60},
      { title: 'cals', dataIndex: 'calories', width: 75},
      { title: 'serving size', dataIndex: 'servingSize', width: 100},
      { title: 'amount', dataIndex: 'amount', width: 75,
        render: (text, record, index) => this.renderColumns(text, record, index)},
      { title: 'name', dataIndex: 'name', width: 150,
        render: (text, record, index) => this.renderName(text, record, index) },
      { title: 'time', dataIndex: 'time',
        render: (text, record, index) => this.renderTime(text, record, index),
        // sorter: (a, b) => {
        // console.log(a.time.unix(), b.time.unix());
        // return a.time.unix() - b.time.unix();
        // }, defaultSortOrder: "ascend"
      },
    ];
    this.state = {
      logs: [],
      editable: false,
      date: moment()
    };
    this.cacheData = this.state.logs.map(item => ({...item}));
    console.log("ULI")
    // console.log( moment().format("yyyy-MM-dd'T'HH:mm:ss'Z'") )
    console.log(
      moment.utc().format('YYYY-MM-DD[T]HH:mm:ss[Z]')
    )
  }

  onTimeChange = (time, timeString) => {
   // console.log("onTimeChange", time, timeString);
    const newData = [...this.state.logs];
    const selectedLogRow = newData[this.state.autoCompleteIndex];
    selectedLogRow.time = time;
    this.setState({ logs: newData });
  };

  renderTime = (text, record, index) => {
    // console.log(record)
    return (
      <div>
        {this.state.editable
          ? <TimePicker
            onChange={this.onTimeChange}
            format='HH:mm'
            value={text}
            minuteStep={30}
            onOpenChange={() => this.state.autoCompleteIndex = index}
            defaultOpenValue={moment('12:00:00', 'HH:mm')}
            disabled={!this.state.editable}/> : text.format("HH:mm")
        }
      </div>
    )
  };

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
      const selectedLogRow = newData[this.state.autoCompleteIndex];
      selectedLogRow.source = sourceFood;
      selectedLogRow.name = sourceFood.name;
      selectedLogRow.servingSize = sourceFood.servingSize;
    }
    this.setState({ logs: newData });
  }

  onAutoCompleteChange = (index) => {
    this.state.autoCompleteIndex = index;
  };

  renderName = (text, record, index) => {
    const users = this.props.users.map(user => user.name).sort();
    return (
      <div>
        {this.state.editable
          ? <AutoComplete
            style={{ width: 200 }}
            key
            autoFocus
            value={text}
            dataSource={ users }
            onChange={() => this.state.autoCompleteIndex = index}
            onSelect={this.onAutoCompleteSelect}
            filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
            disabled={!this.state.editable}
          />
          : text
        }
      </div>
    )
  };

  handleAmountChange = (value, key, index) => {
    const regex = /^(\d+\.?\d{0,9}|\.\d{1,2})$/;
    const isNumber = (value === '' || regex.test(value));
    if (!isNumber) return;

    const newData = [...this.state.logs];
    const target = this.state.logs[index];
    // console.log(target);
    if (target) {
      const multiplier = value / target.source.amount;
      target.amount = value;
      target.protein = Number.parseFloat((multiplier * target.source.protein).toFixed(2));
      target.carbs = Number.parseFloat((multiplier * target.source.carbs).toFixed(2));
      target.fat = Number.parseFloat((multiplier * target.source.fat).toFixed(2));
      target.calories = Number.parseFloat(((target.protein * 4) + (target.carbs * 4) + (target.fat * 9)).toFixed(2));

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

  editAll() {
    this.setState({ editable: !this.state.editable })
  }

  add() {
    const newData = [...this.state.logs];
    newData.push({
      key: (new Date).getTime(),
      time: moment().set("hour", 12).set("minute", 0).set("second", 0).set("millisecond", 0),
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
        <Tag color="#D68F92">
          Protein:{' '}
          {_.sumBy(this.state.logs, "protein").toFixed(2)}
        </Tag>

        <Tag color="blue">
          Carbs:{' '}
          {_.sumBy(this.state.logs, "carbs").toFixed(2)}
        </Tag>

        <Tag color="volcano">
          Fat:{' '}
          {_.sumBy(this.state.logs, "fat").toFixed(2)}
        </Tag>

        <Tag>
          Calories:{' '}
          {_.sumBy(this.state.logs, "calories").toFixed(2)}
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
        <DatePicker defaultValue={this.state.date} onChange={this.onChange}/>
        <Button onClick={() => this.editAll()}>
          {this.state.editable ? "Save" : "Edit"}
        </Button>
        <Button type="primary" onClick={() => this.add()}>Add</Button>
        <Table {...tableConfig}
               dataSource={this.state.logs}
               columns={this.columns}
               footer={this.renderFooter}
               size="small"
        />
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
