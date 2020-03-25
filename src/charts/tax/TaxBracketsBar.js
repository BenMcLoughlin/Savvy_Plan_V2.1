import React, { useRef, useEffect} from 'react'
import * as d3 from "d3"
import styled from "styled-components"
import {taxBracketsChartData_selector} from "redux/tax/tax_selectors"
import {connect} from "react-redux"
import _ from "lodash"

const drawChart = (data1, width, height, colors) => {

    const data = [
        {
            bracketIncome: 48000,
            totalIncome: 48000,
            federalTaxes: .1,
            type: "",
            provincialTaxes: .1,
            cppAndEI: .05,
            keep: .75,
        },
        {
            bracketIncome: 40000,
            totalIncome: 88000,
            federalTaxes: .15,
            type: "", 
            provincialTaxes: .15,
            cppAndEI: .05,
            keep: .65,
        },
        {
            bracketIncome: 40000,
            totalIncome: 128000,
            federalTaxes: .25,
            type: "", 
            provincialTaxes: .15,
            cppAndEI: .05,
            keep: .55,
        },
    ]

    const margin = {top: 20, right: 50, bottom: 20, left: 70}
    const graphHeight = height - margin.top - margin.bottom
    const graphWidth = width - margin.left - margin.right
    const color = ['#63bbcf',"#F29278", "#F29278", "#F29278"]

   d3.select(".taxBarChart > *").remove()
   d3.select(".tooltip").remove()
  
    const svg = d3.select('.taxBarChart').append("svg").attr("viewBox", `0 0 ${width} ${height}`)

    const stackedKeys = ["keep","federalTaxes", "provincialTaxes", "cppAndEI"]
  

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
        
        const tooltip = d3.select(".taxBarChart").append("div")
                        .attr("class", "tooltip")
                        .style("opacity", 0)
                        .style("position", "absolute")
                        .style("top", 0)
                        .style("left", 0)
   
                          
    const update = data => {
    
        const max = d3.max(data, d =>  d.totalIncome) + 10000

        const series = stack(data);
   
        const xScale = d3.scaleLinear().range([0, graphWidth]).domain([0, 1])

        const yScale =  d3.scaleLinear().range([graphHeight, 0]).domain([0, max])
                                  
    const rects = graph.append("g")
        .selectAll("g")
        .data(series)
    
        rects.exit().remove()
    
        rects.selectAll("rect")
            .data(d => d)
            .enter()
            .append("rect")
            .attr("x", d => xScale(d[0]))
            .merge(rects)


        rects.enter().append("g")
            .attr("fill", (d,i) => color[i])
            .attr("backgroundColor", (d,i) => color[i])
            .attr("class", (d,i) => d.key)
            .selectAll("rect") 
            .data(d => d)
            .enter().append("rect")
                .attr("x", d => xScale(d[0]))
                .attr("fill", (d,i) => d.data.type === "deduction" && d[0] > 0 ? "#8CB8B7" : null)

                .attr("width", d => xScale(d[1]) - xScale(d[0]))
                .attr("y", (d,i) =>  yScale(d.data.totalIncome)) 
                .attr("height", (d,i) => {
                   return d.data.type === "deduction" && i > 0 ? graphHeight - yScale(d.data.bracketIncome) : 
                   d.data.type === "deduction" && i === 0 ? graphHeight - yScale(d.data.bracketIncome) + 2 : 
                            (graphHeight - yScale(d.data.bracketIncome) - 2) }
                    ) 
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
                                                        ${100000/1000} 
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
                        
                               rects.enter().append("text")
                                            .attr("x", 362)
                                            .attr("y", (d,i )=> d[i] !== undefined ? yScale(d[i].data.totalIncome) + 23 : -1000)
                                            .attr("text-anchor", "middle")
                                            .attr("fill","grey")
                                            .attr("font-size","1.1rem")
                                            .text((d,i) => d[i] !== undefined ? `- ${(d[i].data.federalTaxes + d[i].data.provincialTaxes + d[i].data.cppAndEI)*100} %` : null)

            var ticks = [48535,97069, 150473, 214368, 400000];
            var tickLabels = ['48k','97k','150k','214k','400k']
 

                              
            const xAxis = d3.axisBottom(xScale)
                              .ticks('none')
            
                         
            const yAxis = d3.axisLeft(yScale).tickValues(ticks)
                                 .tickFormat(function(d,i){ return tickLabels[i] })
                               

        xAxisGroup.call(xAxis)
        yAxisGroup.call(yAxis)
    }

    update(data)
    
}

const TaxBarChart = ({}) =>  {

    //const data = taxBracketsChartData_selector

    const inputRef = useRef(null)
    useEffect(()=> {
       const width = inputRef.current.offsetWidth
       const height = inputRef.current.offsetHeight
        drawChart(null, width, height)
    }, [])

        return (
            <Canvas className="taxBarChart" ref={inputRef}>
    
            </Canvas>
        )
}

const mapStateToProps = (state) => ({
//taxBracketsChartData_selector: taxBracketsChartData_selector(state),
})

export default connect(mapStateToProps)(TaxBarChart)
//-----------------------------------------------style-----------------------------------------------//

const Canvas = styled.div`
        width: 100%;
        height: 100%;
`