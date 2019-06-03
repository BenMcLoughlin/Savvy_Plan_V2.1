import React, { Component } from 'react'

export const StateContext = React.createContext()

export class StateManager extends Component {

    constructor(props) {
        super(props) 
        this.state = {
            age: 20,
            handleSlider: this.handleSlider,
        }
    }

    handleSlider(event) {
        const {name, value, type} = event.target
        this.setState({
            [name]: value
        }) 
      }

    render() {
        console.log(this.state.age);

        return (
            <StateContext.Provider value={this.state}>
                {this.props.children}
            </StateContext.Provider>
        )
    }
}
