import React, { Component } from 'react';

import Task from './Task';

import { getTodoTasks } from '../APIHelper';

export default class TodoList extends Component {

    state = { tasks : [] }

    componentDidMount() {

        this.getAllTasks()
        .then(response => {
            this.setState({ tasks : response })
        })
    }

    getAllTasks = async () => {
        const tasks = await getTodoTasks()
        return tasks;
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    {
                        this.state.tasks.map(task => {
                            return <Task key={ task._id } data={ task } />
                        })
                    }
                </div>
            </div>
        )
    }
}
