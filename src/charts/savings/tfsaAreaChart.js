import React, { useRef, useEffect, useState} from 'react'
import * as d3 from "d3"
import styled from "styled-components"
import {tfsaArea_selector} from "redux/savings/savings_selectors"
import {connect} from "react-redux"


const drawChart = (data, width, height) => {

    const margin = {top: 20, right: 100, bottom: 10, left: 100}
    const graphHeight = height - margin.top - margin.bottom
    const graphWidth = width - margin.left - margin.right
    const color =  ["age", '#3B7B8E', "#7898a1", '#3B7B8E', ' #7898a1', "#7898a1",  '#7898a1']
    
    d3.select(".tfsaAreaChart > *").remove()
    d3.select(".tooltip").remove()

    const stackedKeys = ["age", "principle", "interest",]

    const svg = d3.select('.tfsaAreaChart').append("svg").attr("viewBox", `0 0 ${width} ${height}`)


    const graph = svg.append("g").attr("height", graphHeight > 100 ? graphHeight : 100)
                                 .attr("width", graphWidth)
                                 .attr("transform", `translate(${margin.left}, ${margin.top})`)
                                 
    const stack = d3.stack()
                        .keys(stackedKeys)
                        .order(d3.stackOrderNone)
                        .offset(d3.stackOffsetDiverging);
        

    const tooltip = d3.select(".tfsaAreaChart").append("div")
                        .attr("class", "tooltip")
                        .style("opacity", 0)
                        .style("position", "absolute")
                        .style("top", 0)
                        .style("left", 0)

                        const uselessFunctionToClearUnusedNames = () => {
                            return tooltip
                         }
                         uselessFunctionToClearUnusedNames()

    const update = data => {
    
    
        const d3Max = d3.max(data, d =>  d.interest + d.principle) 


        const area = d3.area()
                    .x(d => xScale(d.data.age))
                    .y0(d => yScale(d[0]))
                    .y1(d => yScale(d[1]))
                    .curve(d3.curveBasis)                                                                                                       //sets the lines to be less jagged   


        const yScale = d3.scaleLinear().range([graphHeight, 0]).domain([0, d3Max])
        const xScale = d3.scaleBand().range([0, graphWidth]).paddingInner(0.2).paddingOuter(0.3).domain(data.map(item => item.age))

            var layer = graph.selectAll(".layer")
            .data(stack(data))
            .enter().append("g")
            .attr("class", "layer");


            layer.append("path")
            .attr("class", "area")
            .style("fill", (d,i) => color[i])
            .style("opacity", (d,i) => i > 3 ? 0.3 : 1)
            .attr("d", area);

        
            graph.enter().append("text")
            .attr("x", d => xScale(d.age)- 20)
            .attr("y", d => -45)
            .attr("opacity", d => d.name.length > 2 ? 1 : 0)
            .attr("width", xScale.bandwidth())
            .attr("fill","lightGrey")
            .text(d => d.age + 10)
            .style('stroke', 'lightGrey')
            .style('font-size', '12px')
            .attr('r', 10)
            .attr('transform', "rotate(45deg)")

        const xAxisGroup = graph.append("g")
            .attr("transform", `translate(0, ${graphHeight})`)
            .attr("class", "axis")
            
        const yAxisGroup = graph.append("g")
        .attr("class", "axis")

            const xAxis = d3.axisBottom(xScale)
                           .tickValues([])
                               
            const yAxis = d3.axisLeft(yScale).ticks('3')
                            .tickFormat(d => `${d/1000}k`)


        xAxisGroup.call(xAxis)
        yAxisGroup.call(yAxis)
    }

    update(data)
    
}

const TfsaAareaChart = ({data}) =>  {

    const inputRef = useRef(null)

    useEffect(()=> {
       const width = inputRef.current.offsetWidth
       const height = inputRef.current.offsetHeight
        drawChart(data, width, height)
    }, [data])

        return (
            <Canvas className="tfsaAreaChart" ref={inputRef}>
            </Canvas>
        )
}

const mapStateToProps = (state) => ({
    data: tfsaArea_selector(state), 
})

export default connect(mapStateToProps)(TfsaAareaChart)
//-----------------------------------------------style-----------------------------------------------//

const Canvas = styled.div`
        width: 100%;
        height: 100%;
`
