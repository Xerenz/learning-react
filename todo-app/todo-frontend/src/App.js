import React, { Component } from 'react';

import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import CheckedList from './components/CheckedList';
import { getTodoTasks, createTodoTask } from './APIHelper'

export default class App extends Component {

  state = {
    tasks : []
  }

  componentDidMount() {
    this.setTasks()
  }

  setTasks = async () => {
    let todos = await getTodoTasks()
    let tasks = []
    console.log(todos)
    todos.forEach(task => {
      tasks = [...tasks, {...task}]
    })
    this.setState({ tasks })
  }

  addToTaskList = task => {
    this.setState({
      tasks : [...this.state.tasks, task]
    })
  }

  render() {
    return (
      <React.Fragment>
        <TodoForm method={ this.addToTaskList } />
        <TodoList list={ this.state.tasks }/>
        <CheckedList/>
      </React.Fragment>
    )
  }
}
