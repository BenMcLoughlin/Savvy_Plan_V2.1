import React, { useState, useEffect, useRef} from 'react'
import * as d3 from "d3"
import _ from "lodash"
import styled from "styled-components"
import {stackedBarData} from "redux/assumptions/assumptions_selectors"
import {connect} from "react-redux"
import {createStructuredSelector} from "reselect"
import {chartAssets_selector} from "redux/netWorth/netWorth_selectors"





const drawChart = (data, width, height, birthYear) => {
    
    d3.select(".sunburtCanvas > *").remove()

    const margin = {top: 10, right: 50, bottom: 40, left: 80}
    const graphHeight = height - margin.top - margin.bottom
    const graphWidth = width - margin.left - margin.right
    const colors = ["#55869d", "#f5ab97", "#F29278", "#ee6c4a"]

        const radius = Math.min(width, height) / 2.5;
        const color = d3.scaleOrdinal(colors);

        const update = data => {

        const svg = d3.select('.sunburtCanvas')
                        .append("svg")
                        .attr("viewBox", `0 0 ${width} ${height}`)
                        .style("fill", "blue")

        const graph = svg.append("g")
                        .attr("height", graphHeight)
                        .attr("width", graphWidth)
                        .attr("transform", `translate(${margin.left + 20}, ${margin.top + 90})`)

        const partition = d3.partition()
                      .size([2 * Math.PI, radius]);


        const root = d3.hierarchy(data)
                       .sum(function (d) { return d.value});

        partition(root)

        const arc = d3.arc()
                        .startAngle(d => d.x0)
                        .endAngle(d => d.x1)
                        .innerRadius(d => d.y0)
                        .outerRadius(d => d.y1);

        const rects = graph.selectAll('path')
                        .data(root.descendants())
                        .enter().append('path')
                        .attr("display", d => d.depth ? null : "none")
                        .attr("d", arc)
                        .style('stroke', '#fff')
                        .style("fill", d => color((d.children ? d : d.parent).data.name))
                       
                        rects.append("text")
                        .attr("fill","blue")
                        .attr("x",d => d.x0)
                        .attr("y",d => d.y0)
                        .style('font-size', '100px')
                        .text("95")
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
            <Canvas className="sunburtCanvas" ref={inputRef}>
            </Canvas>
        )
}


const mapStateToProps = (state) => ({
    data: chartAssets_selector(state), 
    user_reducer: state.user_reducer
})

export default connect(mapStateToProps)(LifeEventsTimeline)
//-----------------------------------------------style-----------------------------------------------//

const Canvas = styled.div`
        width: 100%;
        height: 100%;
`

