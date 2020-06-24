import React, { Component } from 'react';

import Task from './Task';
import { deleteTodoTask } from '../APIHelper';

export default class TodoList extends Component {

    render() {

        const { deleteTask, updateStatus } = this.props.methods

        return (
            <div className="container">
                <div className="row">
                    {
                        this.props.list.map(task => {
                            return <Task key={ task._id } 
                                    data={ task } 
                                    deleteTask={ deleteTask }
                                    updateStatus={ updateStatus } />
                        })
                    }
                </div>
            </div>
        )
    }
}
