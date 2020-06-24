import React, { Component } from 'react'

import { deleteTodoTask } from '../APIHelper'

export default class Task extends Component {

    handleDelete = async id => {
        console.log(id)
        let deleted = await deleteTodoTask(id)
        console.log(deleted)
        window.location.reload()
    } 

    render() {
        const {_id, task, completed} = this.props.data;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-2">
                        <input type="checkbox" className="list-box" />
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
