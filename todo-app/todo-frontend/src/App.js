import React, { Component } from 'react'

import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import CheckedList from './components/CheckedList'
import { getTodoTasks, createTodoTask } from './APIHelper'

import './App.css'

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

  deleteFromTaskList = id => {
    let tempList = [...this.state.tasks]
    let updatedList = tempList.filter(task => task._id !== id)
    this.setState({ tasks : updatedList })
  }

  updateTaskStatus = (id, status) => {
    let tempList = [...this.state.tasks]
    let task = tempList.find(task => task._id === id)
    task.completed = status
    console.log(tempList)
    this.setState({ tasks : tempList })
  }

  render() {
    return (
      <React.Fragment>
        <TodoForm method={ this.addToTaskList } />
        <TodoList list={ this.state.tasks } methods={ {
          deleteTask : this.deleteFromTaskList,
          updateStatus : this.updateTaskStatus
          } } />
        <CheckedList/>
      </React.Fragment>
    )
  }
}
