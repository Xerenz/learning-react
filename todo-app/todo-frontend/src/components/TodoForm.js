import React, { Component } from 'react';

export default class TodoForm extends Component {
    render() {
        return (
            <div className="container">
                <form>
                    <div className="form-row my-5">
                        <div className="col-10">
                            <input type="text" className="form-control"/>
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
