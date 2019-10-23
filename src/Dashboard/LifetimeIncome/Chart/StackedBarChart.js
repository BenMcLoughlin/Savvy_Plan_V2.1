import React, { Component } from 'react'
import drawChart from "./drawChart"
import "./ChartStyles.css"


export default class StackedBarChart extends Component {

componentDidMount() {
    drawChart(this.props)
}

componentDidUpdate() {
    drawChart(this.props)
}



    render() {
        return (
            <div className="canvas" style={{height: "80rem"}} >
                
            </div>
        )
    }
}

