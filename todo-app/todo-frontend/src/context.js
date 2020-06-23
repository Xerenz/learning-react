import React, { Component } from 'react'

const ProductContext = React.createContext()

export class ProductProvider extends Component {

    state = {
        tasks : [],
        inputBox : ""
    }

    componentDidMount() {
        this.setTasks()
    }

    addToTaskList = (task) => {
        this.setState({ tasks : [...tasks, task]})
    }

    setTasks = () => {
        let tasks = []

        this.state.tasks.forEach(task => {
            tasks = [...tasks, {...task}]
        })

        this.setState({ tasks : tasks })
    }

    render() {
        return (
            <ProductContext.Provider
            value={
                {
                    ...this.state,
                    addToTaskList : this.addToTaskList
                }
            }>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

export const ProductConsumer = ProductContext.Consumer()