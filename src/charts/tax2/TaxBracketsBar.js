import React, { useRef, useEffect} from 'react'
import * as d3 from "d3"
import styled from "styled-components"
import {taxBracketsChartData_selector} from "redux/taxCredits/taxCredits_selectors"
import {connect} from "react-redux"
import _ from "lodash"

const drawChart = (data, width, height, colors) => {
console.log(data);
    const data1 = [
        {
            bracketIncome: 5000,
            totalIncome: 5000,
            type: "deduction", 
            federalTaxes: .1,
            provincialTaxes: .1,
            cppAndEI: .05,
            keep: .75,
        },
        {
            bracketIncome: 20000,
            totalIncome: 25000,
            federalTaxes: .1,
            type: "",
            provincialTaxes: .1,
            cppAndEI: .05,
            keep: .75,
        },
        {
            bracketIncome: 20000,
            totalIncome: 45000,
            federalTaxes: .15,
            type: "", 
            provincialTaxes: .15,
            cppAndEI: .05,
            keep: .65,
        },
        {
            bracketIncome: 30000,
            totalIncome: 75000,
            federalTaxes: .25,
            type: "", 
            provincialTaxes: .15,
            cppAndEI: .05,
            keep: .55,
        },
        {
            bracketIncome: 10000,
            totalIncome: 85000,
            type: "deduction", 
            federalTaxes: .25,
            provincialTaxes: .15,
            cppAndEI: .05,
            keep: .55,
        },
    ]

    const margin = {top: 20, right: 15, bottom: 20, left: 70}
    const graphHeight = height - margin.top - margin.bottom
    const graphWidth = width - margin.left - margin.right
    const color = ['#88adbf',"#ee6c4a", "#f5ab97", "#F29278", "#ee6c4a"]

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
                .attr("y", (d,i) =>   d.data.type === "deduction" && i === 0 ?  yScale(d.data.totalIncome) - 2 : yScale(d.data.totalIncome)) 
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
                        
          

            var ticks = [48535,97069, 150473, 214368, 400000];
            var tickLabels = ['48k','97k','150k','214k','400k']
 

                              
            const xAxis = d3.axisBottom(xScale)
                              .ticks('2')
                              .tickFormat(d => `${d*100}%`)
                         
            const yAxis = d3.axisLeft(yScale).tickValues(ticks)
                                 .tickFormat(function(d,i){ return tickLabels[i] })

        xAxisGroup.call(xAxis)
        yAxisGroup.call(yAxis)
    }

    update(data)
    
}

const TaxBarChart = ({taxBracketsChartData_selector}) =>  {

    const data = taxBracketsChartData_selector

    const inputRef = useRef(null)
    useEffect(()=> {
       const width = inputRef.current.offsetWidth
       const height = inputRef.current.offsetHeight
        drawChart(data, width, height)
    }, [data])

        return (
            <Canvas className="taxBarChart" ref={inputRef}>
            </Canvas>
        )
}

const mapStateToProps = (state) => ({
    taxBracketsChartData_selector: taxBracketsChartData_selector(state),
})

export default connect(mapStateToProps)(TaxBarChart)
//-----------------------------------------------style-----------------------------------------------//

const Canvas = styled.div`
        width: 100%;
        height: 100%;
`
