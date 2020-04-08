import React, { useRef, useEffect} from 'react'
import * as d3 from "d3"
import styled from "styled-components"
import {taxLifetimeChartData_selector} from "redux/tax/tax_selectors"
import {connect} from "react-redux"
import _ from "lodash"
import {setKeyValue_action} from "redux/actions"

const drawChart = (birthYear, data, width, height, setKeyValue_action, className, taxAge) => {
   
    const chartData = () => {
        const array = []
        for (let i = 0; i < 77; i++) {
            array.push({
                age: i + 18, 
                federalTax: i < 27 ? 4000 : i < 37 ? 6000 : i < 43 ? 9000 : 3000, 
                provincialTax: i < 27 ? 2000 : i < 37 ? 3000 : i < 43 ? 4000 : 1000, 
                cppAndEi: 2000, 
            })
        }
        return array
    }
    
    const margin = {top: 20, right: 50, bottom: 20, left: 50}
    const graphHeight = height - margin.top - margin.bottom
    const graphWidth = width - margin.left - margin.right
    const color =  ["age", "#F29278", "#F29278", "#F29278", ]

    d3.select(`.${className} > *`).remove()
    d3.select(`.${className}tooltip`).remove()

    const svg = d3.select(`.${className}`).append("svg").attr("viewBox", `0 0 ${width} ${height}`)

    const stackedKeys = ["age", "federalTax", "provincialTax", "cppAndEi", "oasClawback"]

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
                        .attr("class", `${className}tooltip`)
                        .style("opacity", 0)
                        .style("position", "absolute")
                        .style("top", "-15rem")
                        .style("left", "60rem")

                          
    const update = data => {
    
       const max = d3.max(data, d =>  Object.values(d).reduce((acc,num) => acc + num) ) < 600 ? 600 : 
                   d3.max(data, d => Object.values(d).reduce((acc,num) => acc + num)) + 1000

        const series = stack(data);
   
        const yScale = d3.scaleLinear().range([graphHeight, 0]).domain([0, max])
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
            .attr("fill", "#F29278")
            .attr("class", (d,i) => d.key)
            .selectAll("rect") 
            .data(d => d)
            .enter().append("rect")
                .attr("y", d => yScale(d[1]))
                .attr("height", d => yScale(d[0]) > 0 ? yScale(d[0]) - yScale(d[1]) : 0)
                .attr("x", d => xScale(d.data.age))
                .attr("width", xScale.bandwidth())
                .attr("opacity", d => d.data.age === taxAge ? 0.5 : 1)
                .on("click", d => {
                    setKeyValue_action("taxAge", "ui_reducer", d.data.age)
            }
                )
                    .on("mouseover", (d,i,n) => {
                                const name = n[0].parentNode.className.animVal

                                const thisColor = color[2]
                        
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
                                                <p>  Year ${(d.data.age + birthYear)} </p>
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
                                                    <h3 class="title">  Total Tax </h3>
                                                    <p class="value" style="border-left: .3px solid #72929B;">  
                                                    ${(Math.round((d.data.federalTax + d.data.provincialTax)/1000)*1000)/1000} 
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
                                        .attr("opacity", d => d.data.age === taxAge ? 0.5 : 1)
                            
                                        tooltip.transition()
                                        .duration(100)
                                        .style("opacity", 0)   
                                            })
                                    .on('mousemove', function(d) { // when mouse moves                  
                                            tooltip.style('top', (d3.event.layerY - 20) + 'px') // always 10px below the cursor
                                                .style('left', (d3.event.layerX + 30) + 'px'); // always 10px to the right of the mouse
                                            });
                        
                           
                                        
           const convertLabels = (array) => {
            const ticks = []                                                            
            const labels = []
            for (let i = 0; i< array.length; i++) {
                const age = array[i].age
                if (i % 10 === 0) {
                    ticks.push(age)
                    labels.push(`Age ${age}`)
                }
            }
            return [ticks, labels]
        }
        const [ticks, labels] = convertLabels(data)

            const xAxis = d3.axisBottom(xScale)
                            .tickValues(ticks)
                            .tickFormat(function(d,i){ return labels[i] })
                           
                                    
            const yAxis = d3.axisLeft(yScale).ticks('1')
                            .tickFormat(d => `${d/1000}k`)


        xAxisGroup.call(xAxis)
        yAxisGroup.call(yAxis)
    }

    update(data)
    
}

const TaxLifetimeBarChart = ({data, setKeyValue_action,  user_reducer, ui_reducer}) =>  {

    const inputRef = useRef(null)
    const className = "taxLifetimeBarChart"
    const {currentAge} = user_reducer
    const birthYear = new Date().getFullYear() - currentAge
    const {taxAge} = ui_reducer

    useEffect(()=> {
       const width = inputRef.current.offsetWidth
       const height = inputRef.current.offsetHeight
        drawChart(birthYear, data, width, height, setKeyValue_action, className, taxAge)
    }, [data, taxAge])

        return (
            <Canvas className={className} ref={inputRef}>
            </Canvas>
        )
}

const mapStateToProps = (state) => ({
    data: taxLifetimeChartData_selector(state),
    user_reducer: state.user_reducer,
    ui_reducer: state.ui_reducer,
})

export default connect(mapStateToProps, {setKeyValue_action})(TaxLifetimeBarChart)
//-----------------------------------------------style-----------------------------------------------//

const Canvas = styled.div`
        width: 100%;
        height: 100%;
`

