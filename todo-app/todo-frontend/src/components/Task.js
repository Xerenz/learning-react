import React, { Component } from 'react'

import { deleteTodoTask, putTodoTask } from '../APIHelper'

export default class Task extends Component {

    handleDelete = async id => {
        await deleteTodoTask(id)
        this.props.deleteTask(id)
    } 

    handleCheck = async (id, status) => {
        let payload = { completed : true }
        if (status) payload.completed = false

        console.log("PAYLOAD:", payload)
        let updatedTask = await putTodoTask(id, payload)
        console.log(updatedTask)

        let newStatus = !status

        this.props.updateStatus(id, newStatus)
    }

    render() {
        const {_id, task, completed} = this.props.data;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <input type="checkbox" 
                        className="list-box"
                        onClick={ () => this.handleCheck(_id, completed) } />
                    </div>
                    <div className="col-6">
                        {task}
                    </div>
                    <div className="col-1">
                        <button className="no-btn" onClick={ () => this.handleDelete(_id) }>
                            <i className="fa fa-times"></i>
                        </button>
                    </div>
                    <div className="col-1">
                        <button className="no-btn">
                            <i className="fa fa-pencil"></i>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
