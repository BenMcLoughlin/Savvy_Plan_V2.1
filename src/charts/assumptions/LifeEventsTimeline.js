import React, { useState, useEffect, useRef} from 'react'
import * as d3 from "d3"
import _ from "lodash"
import styled from "styled-components"
import {stackedBarData} from "redux/assumptions/assumptions_selectors"
import {connect} from "react-redux"
import {createStructuredSelector} from "reselect"
import {lifeEventsArray} from "redux/lifeEvents/lifeEvents_selectors"


const drawChart = (data, width, height, birthYear) => {

    const margin = {top: 100, right: 50, bottom: 40, left: 80}
    const graphHeight = height - margin.top - margin.bottom
    const graphWidth = width - margin.left - margin.right
    const color = ["#55869d", "#f5ab97", "#F29278", "#ee6c4a"]
    const circleRadius = 20

    d3.select(".canvasTaxStacked > *").remove()
    d3.select(".tooltipStackedChart").remove()

       //VALUE ACCESSORS
    const xValue = Object.keys(data[0])[0]
    const xAxisLabel = "horsepower"
   
    const yValue = d => d.cost
    const yAxisLabel = "weight"

       
    const namesArray = Object.keys(data[0])
    const  stackedKeys = namesArray.slice(1,namesArray.length)

    const svg = d3.select('.canvasTaxStacked').append("svg").attr("viewBox", `0 0 ${width} ${height}`)

    const graph = svg.append("g").attr("height", graphHeight)
                                 .attr("width", graphWidth)
                                 .attr("transform", `translate(${margin.left}, ${margin.top})`)
                                 
    const xAxisGroup = graph.append("g")
                                .attr("transform", `translate(0, ${graphHeight - 130})`)
                                .attr("class", "axis")

const update = data => {

        const yScale = d3.scaleLinear().range([graphHeight, 0]).domain([0, 30000])
        const xScale = d3.scaleBand().range([0, graphWidth]).paddingInner(0.2).paddingOuter(0.3)
                              .domain(data.map(item => item.age))

         const rects = graph.append("g")
                                .selectAll("g")
                                .data(data)

        rects.exit().remove()

        rects.enter().append("line")
                        .attr("x1", d => xScale(d.age))
                        .attr("x2", d => xScale(d.age))
                        .attr("y1", -40)
                        .attr("y2", 40)
                        .attr("opacity", d => d.name.length > 2 ? 1 : 0)
                        .attr("width", xScale.bandwidth())
                        .attr("fill","white")
                        .style('stroke', 'lightGrey')
                            .style('stroke-width', '1')
                         .attr('r', circleRadius);

        rects.enter().append("circle")
                        .attr("cx", d => xScale(d.age))
                        .attr("cy", d => yScale(yValue))
                        .attr("opacity", d => d.name.length > 2 ? 1 : 0)
                        .attr("width", xScale.bandwidth())
                        .attr("fill","turquoise")
                        .style('stroke', 'lightGrey')
                            .style('stroke-width', '1')
                         .attr('r', circleRadius);

        rects.enter().append("rect")
                        .attr("x", d => xScale(d.age))
                        .attr("y", 10)
                        .attr("opacity", d => d.name.length > 2 ? 1 : 0)
                        .attr("width", 30)
                        .attr("height", 30)
                        .attr("transform", "rotate(20deg)")
                        .attr("fill","red")



        rects.enter().append("text")
                        .attr("x", d => xScale(d.age)- 6)
                        .attr("y", d => yScale(yValue))
                        .attr("opacity", d => d.name.length > 2 ? 1 : 0)
                        .attr("width", xScale.bandwidth())
                        .attr("fill","turquoise")
                        .text(d => d.age )
                        .style('stroke', 'lightGrey')
                            .style('stroke-width', '1')
                         .attr('r', circleRadius);

        rects.enter().append("text")
                        .attr("x", d => xScale(d.age)- 20)
                        .attr("y", d => -45)
                        .attr("opacity", d => d.name.length > 2 ? 1 : 0)
                        .attr("width", xScale.bandwidth())
                        .attr("fill","lightGrey")
                        .text(d => d.age + birthYear)
                        .style('stroke', 'lightGrey')
                        .style('font-size', '12px')
                        .attr('r', circleRadius)
                        .attr('transform', "rotate(45deg)")

        rects.enter().append("text")
                        .attr("x", d => xScale(d.age)- 20)
                        .attr("y", d => 45)
                        .attr("opacity", d => d.name.length > 2 ? 1 : 0)
                        .attr("width", xScale.bandwidth())
                        .attr("fill","lightGrey")
                        .text(d => d.name)
                        .style('stroke', 'lightGrey')
                        .style('font-size', '12px')
                        .attr('r', circleRadius)
                        .attr('transform', "rotate(45deg)")



            var ticks = [20, 40, 60, 80];
            var tickLabels = ['','','','']
                

            const xAxis = d3.axisBottom(xScale)
                            .tickValues(ticks)
                            .tickFormat(function(d,i){ return tickLabels[i] })
                           
                                    

        xAxisGroup.call(xAxis)
    }

    update(data)
    
}


const LifeEventsTimeline = ({data, user_reducer}) =>  {

    const inputRef = useRef(null)

    const birthYear = user_reducer.birthYear

    useEffect(()=> {
       const width = inputRef.current.offsetWidth
       const height = inputRef.current.offsetHeight
        drawChart(data, width, height, birthYear )
    }, [data])

        return (
            <Canvas className="canvasTaxStacked" ref={inputRef}>
            </Canvas>
        )
}


const mapStateToProps = (state) => ({
    data: lifeEventsArray(state), 
    user_reducer: state.user_reducer
})

export default connect(mapStateToProps)(LifeEventsTimeline)
//-----------------------------------------------style-----------------------------------------------//

const Canvas = styled.div`
        width: 100%;
        height: 100%;
        position: relative;

`

