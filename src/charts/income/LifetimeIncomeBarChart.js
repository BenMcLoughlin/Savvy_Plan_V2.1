import React, { Component } from 'react'
import * as d3 from "d3"
import _ from "lodash"
import styled from "styled-components"
import {incomeArray_selector, color_selector} from "redux/income/income_selectors"
import {connect} from "react-redux"

const drawChart = (props, width, height) => {

    //KEY VALUES
    const margin = {top: 20, right: 100, bottom: 50, left: 100}
    const graphHeight = height - margin.top - margin.bottom
    const graphWidth = width - margin.left - margin.right
    const color = ["#ef7959", "green", "#4BB9D0",'#72929B',  "#B0CFE3", '#FEDE76', '#81CCAF',  '#78b7bb','#D4D4D4','#72929B', "#F29278", '#FEDE76', "#a4d7e1", "#81CCAF", '#F7CDAB', '#D8BABB'];
    const data = props.incomeArray_selector

   //VALUE ACCESSORS
//    const xValue = d => d.age
//    const yValue = d => d.country

    const colors = props.color_selector
   
    const stackedKeys = Object.keys(data[0])

    d3.select(".canvasStackedbarChart > *").remove()
    d3.select(".tooltip").remove()


    const svg = d3.select('.canvasStackedbarChart')
                                .append("svg")
                                .attr("viewBox", `0 0 ${width} ${height}`)


    const graph = svg.append("g").attr("height", graphHeight)
                                 .attr("width", graphWidth)
                                 .attr("transform", `translate(${margin.left}, ${margin.top})`)
                                 .style("background", "blue")
                               
    const stack = d3.stack()
                                .keys(stackedKeys)
                                .order(d3.stackOrderNone)
                                .offset(d3.stackOffsetNone);
        
    const tooltip = d3.select(".canvasStackedbarChart").append("div")
                                .attr("class", "tooltip")
                                .style("opacity", 0)
                                .style("position", "absolute")
                                .style("top", 0)
                                .style("left", 0)
        
    
    const update = data => {
    
        const d3Max = d3.max(data, d =>  Object.values(d).reduce((acc,num) => acc + num) ) < 90000 ? 90000 : 
                        d3.max(data, d => Object.values(d).reduce((acc,num) => acc + num)) + 10000

        const series = stack(data);
        const yScale = d3.scaleLinear().range([graphHeight, 0]).domain([0, d3Max])
        const xScale = d3.scaleBand().range([0, graphWidth]).paddingInner(0.2).paddingOuter(0.3)
        .domain(data.map(item => item.age))
     
////-------------------------PROTECT--------------------------------        

    const layers = graph.append("g").selectAll("g")
                                            .data(series).enter().append("g").attr("fill", (d,i) => colors[d.key])
                                            .attr("backgroundColor", (d,i) => color[i])
                                            .attr("class", (d,i) => (
                                                d.key === "cppIncome" ? "CPP Income" 
                                                :
                                                d.key === "oasIncome" ? "OAS Income" 
                                                :
                                                d.key === "tfsa" ? "Reccomended TFSA Income" 
                                                :
                                                d.key === "rrsp" ? "Reccomended RRSP Income" 
                                                : 
                                                d.key === "nonRegistered" ? "Reccomended Non-Registered Income" 
                                                : 
                                                d.key))

    const rects = layers.selectAll("rect").data(d => d).enter().append("rect")
                                            .attr("x", (d,i) => xScale(d.data.age))
                                            .attr("y", d => yScale(d[1]))
                                            .attr("border-radius", "10px")
                                            .attr("height", d => yScale(d[0]) > 0 ? yScale(d[0]) - yScale(d[1]) : 0)
                                            .attr("width", xScale.bandwidth())
                                    

      rects.on("mouseover", (d,i,n) => {
                                const name = n[0].parentNode.className.animVal
                                const nameIndex = stackedKeys.findIndex(type => type === name)
                                const thisColor = color[nameIndex]
                                const thisYearTotalIncome = Object.values(data[i]).slice(1).reduce((acc, num) => acc + num)
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
                                                        ${(d[1] - d[0])/1000} 
                                                        <span> K</span>
                                                    </p>
                                                </div>
                                                <div class="total">
                                                    <h3 class="title">  Total Income </h3>
                                                    <p class="value" style="border-left: .3px solid #72929B;">  
                                                        ${thisYearTotalIncome/1000} 
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

//AXIS 
const xAxisGroup = graph.append("g")
.attr("transform", `translate(0, ${graphHeight})`)
.attr("class", "axis")

const yAxisGroup = graph.append("g")
.attr("class", "axis")

            const xAxis = d3.axisBottom(xScale)
                            .tickValues(ticks)
                            .tickFormat(function(d,i){ return tickLabels[i] })
                           
                                    
            const yAxis = d3.axisLeft(yScale).ticks('3')
                            .tickFormat(d => `${d/1000}k`)

           // const colorScale = d3.scaleOrdinal().domain(props.stackedChartKeys).range(color)

        xAxisGroup.call(xAxis)
        yAxisGroup.call(yAxis)
        const legendGroup = graph.append('g')
        .attr("transform", `translate(${graphWidth + 20}, ${140})`)

      const uselessFunctionToClearUnusedNames = () => {
          return legendGroup
      }
      uselessFunctionToClearUnusedNames()
    }
 

    update(data)
    
}

class StackedBarChartLifetimeIncome extends Component {

    state = {
        elementWidth: 0,
        elementHeight: 0
    }

    updateSize = () => {
        this.setState({ 
            elementWidth: this.divRef.clientWidth, 
            elementHeight: this.divRef.clientHeight, 
        });
        drawChart(this.props, this.state.elementWidth, this.state.elementHeight )
      }

componentDidMount() {
    this.setState({ 
        elementWidth: this.divRef.clientWidth, 
        elementHeight: this.divRef.clientHeight 
    });
    drawChart(this.props, this.state.elementWidth, this.state.elementHeight)
}

componentDidUpdate() {
    drawChart(this.props, this.state.elementWidth, this.state.elementHeight)
}

componentWillUnmount() {
    window.removeEventListener('resize', this.updateSize);
   }
   
    render() {

        window.addEventListener('resize', this.updateSize)
 
        return (
            <Canvas className="canvasStackedbarChart" ref={canvasStackedBarChart => this.divRef = canvasStackedBarChart}>
                
            </Canvas>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        incomeArray_selector: incomeArray_selector(state),
        color_selector: color_selector(state),
    }
}

export default connect(mapStateToProps)(StackedBarChartLifetimeIncome)

//-----------------------------------------------style-----------------------------------------------//

const Canvas = styled.div`
        width: 100%;
        height: 100%;
        position: relative;

`