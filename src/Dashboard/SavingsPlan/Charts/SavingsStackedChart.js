import React, { Component } from 'react'
import * as d3 from "d3"
import "./ChartStyles.css"
import _ from "lodash"
import styled from "styled-components"
import {stackedKeysBarChart, stackedBarData, stackedBarData2} from "../reducers/savingsPlan_selectors"
import {connect} from "react-redux"
import {createStructuredSelector} from "reselect"

const drawChart = (props, width, height) => {

    const margin = {top: 20, right: 100, bottom: 50, left: 100}
    const graphHeight = height - margin.top - margin.bottom
    const graphWidth = width - margin.left - margin.right
    const color =  ["age", '#3B7B8E', "#3B7B8E", '#3B7B8E', ' #7898a1', "#7898a1",  '#7898a1']

    d3.select(".canvasSavingsStackedBarChart > *").remove()
    d3.select(".tooltip").remove()

    const data = props.stackedBarData2
    const svg = d3.select('.canvasSavingsStackedBarChart').append("svg").attr("viewBox", `0 0 ${width} ${height}`)

    
    const stackedKeys = ["age", "rrspContributions", "tfsaContributions", "nonRegisteredContributions", "rrspInterest", "tfsaInterest",  "nonRegisteredInterest"]

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
        
        const tooltip = d3.select(".canvasSavingsStackedBarChart").append("div")
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
    

        const min = d3.min(data, d =>  Object.values(d).reduce((acc,num) => acc + (typeof num === num ? num : 0)) ) > -30000 ? -30000 : 
        d3.min(data, d => Object.values(d).reduce((acc,num) => acc + num)) - 4000

       const max = d3.max(data, d =>  Object.values(d).reduce((acc,num) => acc + num) ) < 10000 ? 10000 : 
                   d3.max(data, d => Object.values(d).reduce((acc,num) => acc + num)) + 1000

        const series = stack(data);
        console.log(props.stackedBarData2);
        console.log(d3.min(data, d =>  data.map(d => Object.values(d).reduce((acc, num) => acc + num))))

   
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
                .attr("height", d => yScale(d[0]) - yScale(d[1]))
                .attr("x", d => xScale(d.data.age))
                .attr("width", xScale.bandwidth())
                    .on("mouseover", (d,i,n) => {
                                const name = n[0].parentNode.className.animVal
                                const nameIndex = stackedKeys.findIndex(type => type === name)
                                const thisColor = color[nameIndex]
                                const thisYearTotalIncome = Object.values(props.stackedBarData2[i]).slice(1).reduce((acc, num) => acc + num)
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

            const xAxis = d3.axisBottom(xScale)
                            .tickValues(ticks)
                            .tickFormat(function(d,i){ return tickLabels[i] })
                           
                                    
            // const yAxis = d3.axisLeft(yScale).ticks('1')
            //                 .tickFormat(d => `${d/1000}k`)


        xAxisGroup.call(xAxis)
        //yAxisGroup.call(yAxis)
    }

    update(data)
    
}

class StackedBarChartSavings extends Component {

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
            <Canvas className="canvasSavingsStackedBarChart" ref={canvasSavingsStackedBarChart => this.divRef = canvasSavingsStackedBarChart}>
                
            </Canvas>
        )
    }
}


const mapStateToProps = createStructuredSelector({
    stackedKeysBarChart,
    stackedBarData2,
    stackedBarData,
})

export default connect(mapStateToProps)(StackedBarChartSavings )

//-----------------------------------------------STYLES-----------------------------------------------//

const Canvas = styled.div`
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0rem;
        left: 0rem;
        z-index: 2;

`