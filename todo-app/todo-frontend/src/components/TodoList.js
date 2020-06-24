import React, { Component } from 'react';

import Task from './Task';

export default class TodoList extends Component {

    render() {
        return (
            <div className="container">
                <div className="row">
                    {
                        this.props.list.map(task => {
                            return <Task key={ task._id } data={ task } deleteTask={ this.props.method } />
                        })
                    }
                </div>
            </div>
        )
    }
}
