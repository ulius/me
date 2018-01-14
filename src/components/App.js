import React, { Component } from 'react'
import { Dropdown, Icon, Menu, Segment } from 'semantic-ui-react'
import { Route, Link } from 'react-router-dom'
import FoodList from './food/FoodList'
import FoodLog from './food/FoodLog'
import FoodRecipes from './food/FoodRecipes'

export default class App extends Component {
  render() {
    return (
      <div>
        <Menu attached='top'>
          <Dropdown item text="Food">
            <Dropdown.Menu>

              <Link to="/food/log">
                <Dropdown.Item>Log</Dropdown.Item>
              </Link>

              <Link to="/food/list">
                <Dropdown.Item>List</Dropdown.Item>
              </Link>

              <Link to="/food/recipes">
                <Dropdown.Item>Recipes</Dropdown.Item>
              </Link>
            </Dropdown.Menu>
          </Dropdown>
        </Menu>

        <Segment attached='bottom'>
          <Route path="/food/log" component={FoodLog}/>
          <Route path="/food/list" component={FoodList}/>
          <Route path="/food/recipes" component={FoodRecipes}/>
        </Segment>
      </div>
    )
  }
}
