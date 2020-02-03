import React, { useState, useEffect, useRef} from 'react'
import * as d3 from "d3"
import _ from "lodash"
import styled from "styled-components"
import {stackedBarData} from "redux/assumptions/assumptions_selectors"
import {connect} from "react-redux"
import {createStructuredSelector} from "reselect"
import {chartProjection_selector} from "redux/netWorth/netWorth_selectors"


const drawChart = (data, width, height, className) => {
    
    
    const margin = {top: 20, right: 100, bottom: 50, left: 100}
    const graphHeight = height - margin.top - margin.bottom
    const graphWidth = width - margin.left - margin.right
    const color =  ["age", '#3B7B8E', "#F29278",'#72929B',  "#B0CFE3", '#FEDE76', '#81CCAF',]

    d3.select(`.${className} > *`).remove()
    d3.select(".tooltip").remove()


    const svg = d3.select(`.${className}`).append("svg").attr("viewBox", `0 0 ${width} ${height}`)

    
    const stackedKeys = ["age", "totalOther", "totalLongTerm", "totalProperty", "totalCash", "totalInvestments"]

    // totalCash: lastValue.totalCash * 1.02,
    //             totalInvestments: lastValue.totalInvestments * 1.05,
    //             totalProperty: lastValue.totalProperty * 1.01,
    //             totalLongTerm: - (lastValue.totalLongTerm - 100),
    //             // ///totalShortTerm: Object.values(netWorth_reducer.liability).filter(d => d.subCategory == "shortTerm").map(d => d.financialValue).reduce((acc, num) => acc + num),
    //            totalOther:

    const graph = svg.append("g").attr("height",  graphHeight > 0 ? graphHeight : 0)
                                 .attr("width", graphWidth)
                                 .attr("transform", `translate(${margin.left}, ${margin.top})`)
                                 

    const xAxisGroup = graph.append("g")
                            .attr("transform", `translate(0, ${graphHeight})`)
                            .attr("class", "axis")
                            
    const yAxisGroup = graph.append("g")
                        .attr("class", "axis")

    
       const stack = d3.stack()
                        .keys(stackedKeys)
                        .order(d3.stackOrderNone)
                        .offset(d3.stackOffsetDiverging);
        
        const tooltip = d3.select(`.${className}`).append("div")
                        .attr("class", "tooltip")
                        .style("opacity", 0)
                        .style("position", "absolute")
                        .style("top", 0)
                        .style("left", 0)
   
       
 graph.append("text")
                        .attr("y", -4)
                        .attr("x", 10)
                        .attr("class", "title")
                        .text("Contributions & Withdrawals")

                          
    const update = data => {
    

        const min = -180000

       const max = 100000

        const series = stack(data);
   
        const yScale = d3.scaleLinear().range([graphHeight, 0]).domain([min, max])
        const xScale = d3.scaleBand().range([0, graphWidth]).paddingInner(0.2).paddingOuter(0.3)
        .domain(data.map(item => item.age))



    const rects = graph.append("g")
        .selectAll("g")
        .data(series)
    
        rects.exit().remove()
    
        rects.selectAll("rect")
            .data(d => d)
            .enter().append("rect")
                .attr("x", d => xScale(d.data.age))
                .attr("y", d => yScale(d[1]))
             .merge(rects)

    
        rects.enter().append("g")
            .attr("fill", (d,i) => color[i])
            .attr("backgroundColor", (d,i) => color[i])
            .attr("class", (d,i) => d.key)
            .selectAll("rect") 
            .data(d => d)
            .enter().append("rect")
                .attr("y", d => yScale(d[1]))
                .attr("height", d => yScale(d[0]) > 0 ? yScale(d[0]) - yScale(d[1]) : 0)
                .attr("x", d => xScale(d.data.age))
                .attr("width", xScale.bandwidth())
                    .on("mouseover", (d,i,n) => {
                                const name = n[0].parentNode.className.animVal
                                const nameIndex = stackedKeys.findIndex(type => type === name)
                                const thisColor = color[nameIndex]
                               
                                d3.select(n[i])
                                    .transition()
                                        .duration(100)
                                        .attr("opacity", 0.7)
                                        .attr("cursor", "pointer")
                            
                                        tooltip.transition()
                                        .duration(200)
                                        .style("opacity", 1)
                                        .style("pointer-events", "none")

                                        tooltip.html(
                                            `
                                            <div class="topHeader">
                                                <p> ${(d.data.age)} Yrs Old</p>
                                                <p>  Year ${(d.data.age + 1988)} </p>
                                            </div>
                                            <div class="financialOutput">
                                                <div class="total" style="color: ${thisColor}; ">
                                                    <h3 class="title">  ${_.startCase(name)} </h3>
                                                    <p class="value" style="border-bottom: .3px solid #72929B; border-left: .3px solid #72929B;">  
                                                        ${(Math.round((d[1] - d[0])/1000)*1000)/1000} 
                                                        <span> K</span>
                                                    </p>
                                                </div>
                                                <div class="total">
                                                    <h3 class="title">  Total Income </h3>
                                                    <p class="value" style="border-left: .3px solid #72929B;">  
                                                        
                                                        <span> K</span>
                                                    </p>
                                                </div>
                                            </div>
                                            `
                                        )
                                        
                                    })
                                    .on("mouseout", (d,i,n) => {d3.select(n[i])
                                        .transition()
                                        .duration(100)
                                        .attr("opacity", 1)
                            
                                        tooltip.transition()
                                        .duration(100)
                                        .style("opacity", 0)   
                                            })
                                    .on('mousemove', function(d) { // when mouse moves                  
                                            tooltip.style('top', (d3.event.layerY - 20) + 'px') // always 10px below the cursor
                                                .style('left', (d3.event.layerX + 30) + 'px'); // always 10px to the right of the mouse
                                            });
                        
                           
                                        
           var ticks = [20,40, 60, 80, 95];
           var tickLabels = ['Age 20','Age 40','Age 60','Age 80','Age 95']

            const xAxis = d3.axisBottom(xScale)
                            .tickValues(ticks)
                            .tickFormat(function(d,i){ return tickLabels[i] })
                           
                                    
            const yAxis = d3.axisLeft(yScale).ticks('1')
                            .tickFormat(d => `${d/1000}k`)


        xAxisGroup.call(xAxis)
        yAxisGroup.call(yAxis)
    }

    update(data)
    }

const LifeEventsTimeline = ({chartProjection_selector}) =>  {

    const inputRef = useRef(null)


    const className = "netWorthProjection"

    useEffect(()=> {
       const width = inputRef.current.offsetWidth
       const height = inputRef.current.offsetHeight
        drawChart(chartProjection_selector, width, height, className)
    }, [chartProjection_selector])

        return (
            <Canvas className={className} ref={inputRef}>
            </Canvas>
        )
}


const mapStateToProps = (state) => ({
    chartProjection_selector: chartProjection_selector(state), 
})

export default connect(mapStateToProps)(LifeEventsTimeline)
//-----------------------------------------------style-----------------------------------------------//

const Canvas = styled.div`
        width: 100%;
        height: 100%;
`

