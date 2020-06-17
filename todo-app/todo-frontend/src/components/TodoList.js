import React, { Component } from 'react';

import Task from './Task';

export default class TodoList extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <Task/>
                </div>
            </div>
        )
    }
}
