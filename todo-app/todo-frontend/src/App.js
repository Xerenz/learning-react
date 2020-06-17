import React, { Component } from 'react';

import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import CheckedList from './components/CheckedList';

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <TodoForm/>
        <TodoList/>
        <CheckedList/>
      </React.Fragment>
    )
  }
}
