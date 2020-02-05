import React, { useState, useEffect, useRef} from 'react'
import * as d3 from "d3"
import _ from "lodash"
import styled from "styled-components"
import {stackedBarData} from "redux/assumptions/assumptions_selectors"
import {connect} from "react-redux"
import {createStructuredSelector} from "reselect"
import {chartAssets_selector, totalAssets_selector, chartLiabilities_selector, totalLiabilities_selector} from "redux/netWorth/netWorth_selectors"





const drawChart = (data, width, height, total, className) => {
    



    const margin = {top: 10, right: 50, bottom: 40, left: 80}
    const graphHeight = height - margin.top - margin.bottom
    const graphWidth = width - margin.left - margin.right
    const AssetColors = ['#72929B', "#4BB9D0",  "#B0CFE3", '#FEDE76', '#81CCAF',  '#78b7bb','#D4D4D4','#72929B', "#F29278", '#FEDE76', "#a4d7e1", "#81CCAF",]
    const LiabilitiesColors = ['red', "#F29278", "#f5ab97"]
    const colors = className === "liabilitiesSunburst" ? LiabilitiesColors : AssetColors
    const colorDomain = className === "liabilitiesSunburst" ? ["Short Term", "Long Term", "Other"] : ["Cash", "Investments", "Property"] 
    const legendRectSize = 5; 
    const legendSpacing = 8; 

        const radius = Math.min(width, height) / 2.5;
        const color = d3.scaleOrdinal(colors);

        const update = data => {

            d3.select(`.${className} > *`).remove()

            d3.select(".tooltip").remove()
        

        const svg = d3.select(`.${className}`)
                        .append("svg")
                        .attr("viewBox", `0 0 ${width} ${height}`)

        const graph = svg.append("g")
                        .attr("height", graphHeight)
                        .attr("width", graphWidth)
                        .attr("transform", `translate(${margin.left + 20}, ${margin.top + 90})`)

      
                        const tooltip = d3.select(`.${className}`).append("div")
                        .attr("class", `tooltip`)
                        .style("opacity", 0)
                        .style("position", "absolute")
                        .style("top", 0)
                        .style("left", 0)
                        .style("background", "#F7F7F5")
                        .style("height", "18rem")
                        .style("width", "24rem")
                        .style("border", "1px solid #556976")

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
                        .on("mouseover", (d,i,n) => {
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
                                        </div>
                                        <div class="financialOutput">
                                            <div class="total" style="color: ${"#536D7A"}; ">
                                                <h3 class="title">  ${_.startCase(d.data.name)} </h3>
                                                <p class="value" style="border-bottom: .3px solid #72929B; border-left: .3px solid #72929B;">  
                                                ${d.value/1000}
                                                    <span> K</span>
                                                </p>
                                            </div>
                                            <div class="total">
                                                <h3 class="title">  Percentage </h3>
                                                <p class="value" style="border-left: .3px solid #72929B;">  
                                                    ${Math.round((d.value/total)*100)} 
                                                    <span> %</span>
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
                                        tooltip.style('top', (d3.event.layerY ) + 30 + 'px') // always 10px below the cursor
                                            .style('left', (d3.event.layerX ) + 15 + 'px'); // always 10px to the right of the mouse
                                        });
       const colorScale = d3.scaleOrdinal().domain(colorDomain).range(colors)
        const legendGroup = graph.append('g')
                        .attr("transform", `translate(100, 30)`)
                
                      
        }
        update(data)
        }


const LifeEventsTimeline = ({chartType, chartAssets_selector, chartLiabilities_selector, totalLiabilities_selector, totalAssets_selector}) =>  {

    const inputRef = useRef(null)


    const data = chartType === "liability" ? chartLiabilities_selector : chartAssets_selector
    const total = chartType === "liability" ? totalLiabilities_selector : totalAssets_selector

    const className = chartType === "liability" ? "liabilitiesSunburst" : "assetsSunburst"

    useEffect(()=> {
       const width = inputRef.current.offsetWidth
       const height = inputRef.current.offsetHeight
        drawChart(data, width, height, total, className)
    }, [data])

        return (
            <Canvas className={className} ref={inputRef}>
            </Canvas>
        )
}


const mapStateToProps = (state) => ({
    chartAssets_selector: chartAssets_selector(state), 
    totalAssets_selector: totalAssets_selector(state), 
    chartLiabilities_selector: chartLiabilities_selector(state), 
    totalLiabilities_selector: totalLiabilities_selector(state), 
    user_reducer: state.user_reducer
})

export default connect(mapStateToProps)(LifeEventsTimeline)
//-----------------------------------------------style-----------------------------------------------//

const Canvas = styled.div`
        width: 100%;
        height: 100%;
`

