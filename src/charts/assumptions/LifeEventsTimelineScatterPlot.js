import React, { useState, useEffect, useRef} from 'react'
import * as d3 from "d3"
import _ from "lodash"
import styled from "styled-components"
import {stackedBarData} from "redux/assumptions/assumptions_selectors"
import {connect} from "react-redux"
import {createStructuredSelector} from "reselect"
import {lifeEventsArray} from "redux/lifeEvents/lifeEvents_selectors"

const drawChart = (data, width, height) => {

    const margin = {top: 100, right: 50, bottom: 40, left: 80}
    const graphHeight = height - margin.top - margin.bottom
    const graphWidth = width - margin.left - margin.right
    const color = ["#55869d", "#f5ab97", "#F29278", "#ee6c4a"]

    console.log(data);

    d3.select(".canvasTaxStacked > *").remove()
    d3.select(".tooltipStackedChart").remove()
    
    const svg = d3.select(".canvasTaxStacked").append('svg').attr("width", width).attr("height", height)

    const graph = svg.append("g")
                        .attr("width", graphWidth)
                        .attr("height", graphHeight)
                        .attr("transform", `translate(${margin.left}, ${margin.top})`)
    
                        
    const xAxisGroup = graph.append('g').attr("transform", `translate(0, ${graphHeight})`)
    const yAxisGroup = graph.append('g')
    
    //scale
    const y = d3.scaleLinear().range([graphHeight, 0])
    
    const x = d3.scaleBand()
                            .range([0,500])
                            .paddingInner(0.2)
                            .paddingOuter(0.3)
                            
    
    
    const xAxis = d3.axisBottom(x)
    const yAxis = d3.axisLeft(y)
        .ticks(3)
        .tickFormat(d => d + " orders")
    

const update = data => {

    const min = d3.min(data, d => d.orders)
    const max = d3.max(data, d => d.orders)

    y.domain([0,max])
    x.domain(data.map(item => item.name))
    
    const rects = graph.selectAll("rect")
        .data(data)

        //remove exit selection
    rects.exit().remove()

    //update current shapes in dom
    rects.attr("width", x.bandwidth)
    .attr("height", y(d => graphHeight - d.orders))
    .attr("fill", "orange")
    .attr("x", d => x(d.name))
    .attr("y", d => y(d.orders))

    rects.enter().append("rect").attr("width", x.bandwidth)
    .attr("height", d => graphHeight - y(d.orders))
    .attr("fill", "orange")
    .attr("x", d => x(d.name))
    .attr("y", d => y(d.orders))

    // call axis
    xAxisGroup.call(xAxis)
    yAxisGroup.call(yAxis)

    }

    update(data)
    
}


const StackedBarChart = ({data}) =>  {

    const inputRef = useRef(null)

    useEffect(()=> {
       const width = inputRef.current.offsetWidth
       const height = inputRef.current.offsetHeight
        drawChart(data, width, height)
    }, [data])

        return (
            <Canvas className="canvasTaxStacked" ref={inputRef}>
            </Canvas>
        )
}


const mapStateToProps = createStructuredSelector({
    data: lifeEventsArray,
})

export default connect(mapStateToProps)(StackedBarChart)
//-----------------------------------------------style-----------------------------------------------//

const Canvas = styled.div`
        width: 100%;
        height: 100%;
        position: relative;

`

