import React, { useRef, useEffect} from 'react'
import * as d3 from "d3"
import styled from "styled-components"
import {incomeArrayWithRRIF_selector, color_selector} from "redux/income/income_selectors"
import {setKeyValue_action} from "redux/actions"
import {connect} from "react-redux"
import _ from "lodash"

const drawChart =  (age1, age2, birthYear, colors, data, width, height, setKeyValue_action, stream, className) => {
   
    const margin = {top: 20, right: 100, bottom: 20, left: 100}
    const graphHeight = height - margin.top - margin.bottom
    const graphWidth = width - margin.left - margin.right

    d3.select(`.${className} > *`).remove()
    d3.select(`.${className}tooltip`).remove()

    const svg = d3.select(`.${className}`).append("svg").attr("viewBox", `0 0 ${width} ${height}`)

    const stackedKeys = Object.keys(data[15])

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
                        .style("top", 0)
                        .style("left", 0)
                          
    const update = data => {
    
       const max = d3.max(data, d =>  Object.values(d).reduce((acc,num) => acc + num) ) < 60000 ? 60000 : 
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
            .attr("fill", (d,i) => colors[d.key])
            .attr("class", (d,i) => d.key)
            .selectAll("rect") 
            .data(d => d)
            .enter().append("rect")
                .attr("y", d => yScale(d[1]))
                .attr("height", d => yScale(d[0]) > 0 ? yScale(d[0]) - yScale(d[1]) : 0)
                .attr("x", d => xScale(d.data.age))
                .attr("opacity", (d, i, n) =>  {
                    const name = n[0].parentNode.className.animVal
                    return stream === name && d.data.age >= age1 && d.data.age < age2 ? 0.7 : 1
                })
                .attr("width", xScale.bandwidth())
                .on("click", d => {
                    setKeyValue_action("stream", "ui_reducer", null)
                    setKeyValue_action("id", "ui_reducer", null)
                    setKeyValue_action("taxAge", "ui_reducer", d.data.age)
                })
                    .on("mouseover", (d,i,n) => {
                                const name = n[0].parentNode.className.animVal

                                const thisColor = colors[d.key]
                        
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
                                                    <h3 class="title">  Total Income </h3>
                                                    <p class="value" style="border-left: .3px solid #72929B;">  
                                                    ${Math.round(Object.values(d.data).reduce((acc, num) => acc + num)/1000)} 
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
                                        .attr("opacity", (d, i, n) =>  {
                                            const name = n[0].parentNode.className.animVal
                                            return stream === name && d.data.age >= age1 && d.data.age < age2 ? 0.7 : 1
                                        })
                            
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
                           
                                    
            const yAxis = d3.axisLeft(yScale).ticks('2')
                            .tickFormat(d => `${d/1000}k`)


        xAxisGroup.call(xAxis)
        yAxisGroup.call(yAxis)
    }

    update(data)
    
}

const SpendingBarChart = ({data, color_selector, setKeyValue_action, user_reducer, ui_reducer, income_reducer}) =>  {

    const inputRef = useRef(null)
    const className = "lifetimeBarChart"
    const {birthYear} = user_reducer
    const {id, stream} = ui_reducer
    const {age1, age2} = income_reducer[id] || 0

    useEffect(()=> {
       const width = inputRef.current.offsetWidth
       const height = inputRef.current.offsetHeight
        drawChart(age1, age2, birthYear, color_selector, data, width, height, setKeyValue_action, stream, className)
    }, [data, color_selector, age1, age2])

        return (
            <Canvas className={className} ref={inputRef}>
            </Canvas>
        )
}

const mapStateToProps = (state) => ({
    data: incomeArrayWithRRIF_selector(state),
    color_selector: color_selector(state),
    user_reducer: state.user_reducer,
    ui_reducer: state.ui_reducer,
    income_reducer: state.income_reducer,
})

export default connect(mapStateToProps, {setKeyValue_action})(SpendingBarChart)
//-----------------------------------------------style-----------------------------------------------//

const Canvas = styled.div`
        width: 100%;
        height: 100%;
`
