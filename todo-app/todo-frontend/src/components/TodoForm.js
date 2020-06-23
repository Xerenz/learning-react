import React, { Component } from 'react';

import { createTodoTask } from "../APIHelper";

export default class TodoForm extends Component {

    state = {
        value : ""
    };

    handleChange = event => {
        this.setState({
            value : event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();
        const createdTask = await createTodoTask(this.state.value);
        console.log(createdTask)
        this.setState({value : ""})
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={ this.handleSubmit }>
                    <div className="form-row my-5">
                        <div className="col-10">
                            <input type="text" 
                            value={ this.state.value } 
                            className="form-control" 
                            onChange={ this.handleChange } />
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
