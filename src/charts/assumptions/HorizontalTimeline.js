import React, { useState, useEffect, useRef} from 'react'
import * as d3 from "d3"
import _ from "lodash"
import styled from "styled-components"
import {stackedBarData} from "redux/assumptions/assumptions_selectors"
import {connect} from "react-redux"
import {createStructuredSelector} from "reselect"
import {lifeEventsArray} from "redux/lifeEvents/lifeEvents_selectors"


const drawChart = (data, width, height, birthYear) => {

    const margin = {top: 10, right: 50, bottom: 40, left: 80}
    const graphHeight = height - margin.top - margin.bottom
    const graphWidth = width - margin.left - margin.right
    const color = ["#55869d", "#f5ab97", "#ffd152", "#ee6c4a"]
    const circleRadius = 13

    d3.select(".verticalTimelineCanvas > *").remove()
    d3.select(".tooltipStackedChart").remove()

       //VALUE ACCESSORS
    const xValue = Object.keys(data[0])[0]
    const xAxisLabel = "horsepower"
   
    const yValue = d => d.cost
    const yAxisLabel = "weight"

       
    const namesArray = Object.keys(data[0])
    const  stackedKeys = namesArray.slice(1,namesArray.length)

    const svg = d3.select('.verticalTimelineCanvas').append("svg").attr("viewBox", `0 0 ${width} ${height}`)

    const graph = svg.append("g").attr("height", graphHeight)
                                 .attr("width", graphWidth)
                                 .attr("transform", `translate(40, 0)`)
                                 
    const xAxisGroup = graph.append("g")
                                .attr("transform", `translate(0, ${graphHeight/2})`)
                                .attr("class", "LeftAxis")
                                .style("fill", "blue")
                                .style("stroke-dasharray", "5 5")



    const today = new Date()
    const year = today.getFullYear()
    const currentAge = year - birthYear

    const tooltip = d3.select(".canvasTaxStacked").append("div")
                        .attr("class", "tooltipStackedChart")
                        .style("opacity", 0)
                        .style("position", "absolute")
                        .style("top", 0)
                        .style("left", 0)

const update = data => {

        const max = d3.max(data, d => d.cost)

        const xScale = d3.scaleBand().range([0, graphWidth]).paddingInner(0.2).paddingOuter(0.3)
                              .domain(data.map(item => item.age))

        const yScale = d3.scaleLinear().range([graphWidth, 0]).domain([0, max])

         const rects = graph.append("g")
                                .selectAll("g")
                                .data(data)

        rects.exit().remove()

        graph.enter().append("text")
        .attr("x", margin.top - 7)
        .attr("y",  10)
        .attr("fill","white")
        .style('font-size', '13px')
        .text("Events you're saving for")
                                            

                // rects.enter().append("line")
                //         .attr("y1", graphHeight/2)
                //         .attr("y2", graphHeight/2)
                //         .attr("x1", 20)
                //         .attr("x2", xScale(age))
                //         .attr("opacity", d => d.name.length > 2 ? 1 : 0)
                //         .style('stroke', "#55869d")
                //         .style('stroke-width', '1')


                rects.enter().append("circle")
                        .attr("cy", graphHeight/2)
                        .attr("cx", d => xScale(d.age))
                        .attr("opacity", d => d.name.length > 2 ? 1 : 0)
                        .attr("fill", d => d.position ? "#ffd152" : "#536D7A")
                         .attr('r', circleRadius)
                         .style("cursor", "pointer")
                         .on('click', d => console.log('hi'))
                         

                rects.enter().append("circle")
                        .attr("cy", graphHeight/2)
                        .attr("cx", margin.top)
                        .attr("fill", "#536D7A")
                         .attr('r', circleRadius)

                rects.enter().append("circle")
                        .attr("cy", graphHeight/2)
                        .attr("cx", d => xScale(75))
                        .attr("fill", "#536D7A")
                         .attr('r', circleRadius)


                rects.enter().append("text")
                       .attr("cy", graphHeight/2)
                        .attr("cx", d => xScale(95))
                        .attr("opacity", d => d.name.length > 2 ? 1 : 0)
                        .attr("fill","white")
                        .style('font-size', '10px')
                        .text("75")


                rects.enter().append("text")
                        .attr("x", margin.top - 7)
                        .attr("y",  graphHeight/2 + 4)
                        .attr("opacity", d => d.name.length > 2 ? 1 : 0)
                        .attr("width", xScale.bandwidth())
                        .attr("fill","white")
                        .style('font-size', '13px')
                        .text(currentAge)
 

        rects.enter().append("text")
                        .attr("x", d => xScale(d.age) - 7)
                        .attr("y", graphHeight/2 + 4)
                        .attr("opacity", d => d.name.length > 2 ? 1 : 0)
                        .attr("width", xScale.bandwidth())
                        .attr("fill","white")
                        .style('font-size', '13px')
                        .text(d => d.age )
                        .style("cursor", "pointer")
                        .on('click', d => console.log('hi'))
                        
                        

        rects.enter().append("text")
                        .attr("x", d => xScale(d.age) - 14)
                        .attr("y", d => graphHeight/2 + (d.position ? 30 : -50))
                        .attr("opacity", d => d.name.length > 2 ? 1 : 0)
                        .attr("width", xScale.bandwidth())
                        .attr("fill","grey")
                        .style('font-weight', '200')
                        .style('font-size', '12px')
                        .text(d => d.age + birthYear)
                        .style("cursor", "pointer")
                        .on('click', d => console.log('hi'))
                        
           
        rects.enter().append("text")
                        .attr("x", d => xScale(d.age) - 15)
                        .attr("y", d => graphHeight/2 + (d.position ? 45 : -37))
                        .attr("opacity", d => d.name.length > 2 ? 1 : 0)
                        .attr("width", xScale.bandwidth())
                        .attr("fill","grey")
                        .style('font-size', '10px')
                        .style('text-align', 'right')
                        .style('font-weight', '200')
                        .text(d => d.name)
                        .style("cursor", "pointer")
                        .on('click', d => console.log('hi'))

        rects.enter().append("text")
                        .attr("x", d => xScale(d.age) - 15)
                        .attr("y", d => graphHeight/2 + (d.position ? 60 : -20))
                        .attr("opacity", d => d.name.length > 2 ? 1 : 0)
                        .attr("width", xScale.bandwidth())
                        .attr("fill","grey")
                        .style('font-size', '10px')
                        .style('text-align', 'right')
                        .style('font-weight', '200')
                        .text(d => `$${d.cost.toLocaleString()}`)
                        .style("cursor", "pointer")
                        .on('click', d => console.log('hi'))
                        

            var ticks = [20, 40, 60, 80];
            var tickLabels = ['','','','']
                

            const xAxis = d3.axisBottom(xScale)
                             .tickFormat((d) => '')
                             .tickSize(0)
                           
                                    

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
        drawChart(data, width, height, birthYear)
    }, [data])

        return (
            <Canvas className="verticalTimelineCanvas" ref={inputRef}>
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
`

