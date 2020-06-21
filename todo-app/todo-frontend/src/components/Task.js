import React, { Component } from 'react'

export default class Task extends Component {

    render() {
        const {id, task, completed} = this.props.data;

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
                        <i className="fa fa-times"></i>
                    </div>
                    <div className="col-1">
                        <i className="fa fa-pencil"></i>
                    </div>
                </div>
            </div>
        )
    }
}
