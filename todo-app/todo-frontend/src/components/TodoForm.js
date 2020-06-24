import React, { Component } from 'react';

import { createTodoTask } from '../APIHelper'

export default class TodoForm extends Component {

    state = {
        box : ''
    }

    handleInput = event => {
        this.setState({ box : event.target.value })
    }

    handleSubmit = async event => {
        event.preventDefault();
        let newTask = await createTodoTask(this.state.box)
        this.props.method(newTask)
        this.setState({ box : '' })
    }   

    render() {

        return (
            <div className="container">
                <form onSubmit={ this.handleSubmit }>
                    <div className="form-row my-5">
                        <div className="col-10">
                            <input type="text" 
                            value={ this.state.box }
                            className="form-control" 
                            onChange={ this.handleInput } />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-warning">Add</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
