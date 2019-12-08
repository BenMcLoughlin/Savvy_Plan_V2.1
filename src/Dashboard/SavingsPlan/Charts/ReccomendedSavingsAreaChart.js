import React, { Component } from 'react'
import * as d3 from "d3"
import "./ChartStyles.css"
import _ from "lodash"
import styled from "styled-components"

const drawChart = (props, width, height) => {

    const margin = {top: 40, right: 70, bottom: 20, left: 60}
    const graphHeight = height - margin.top - margin.bottom
    const graphWidth = width - margin.left - margin.right
    const color = ["#ef7959","#7DA8B8", "#F29278", "#828F98", "#4BB9D0", '#FEDE76', "#7DA8B8", '#81CCAF', '#D8BABB', '#B0CFE3','#D4D4D4','#72929B', "#F29278", "#4BB9D0", '#FEDE76', "#7DA8B8", "#81CCAF", '#F7CDAB', '#D8BABB'];

    d3.select(".canvasReccomendedSavingsStackedAreaChart > *").remove()
    d3.select(".tooltip").remove()

    const data = props.data
    const max = props.max

    const svg = d3.select('.canvasReccomendedSavingsStackedAreaChart').append("svg").attr("viewBox", `0 0 ${width} ${height}`)



    const graph = svg.append("g").attr("height", graphHeight)
                                 .attr("width", graphWidth)
                                 .attr("transform", `translate(${margin.left}, ${margin.top})`)
                                 

    const xAxisGroup = graph.append("g")
                            .attr("transform", `translate(0, ${graphHeight})`)
                            .attr("class", "axis")
                            
    const yAxisGroup = graph.append("g")
                        .attr("class", "axis")

    
    const stack = d3.stack()
                        .keys(props.stackedKeys)
                        .order(d3.stackOrderNone)
                        .offset(d3.stackOffsetDiverging);
        

    const tooltip = d3.select(".canvasReccomendedSavingsStackedAreaChart").append("div")
                        .attr("class", "tooltip")
                        .style("opacity", 0)
                        .style("position", "absolute")
                        .style("top", 0)
                        .style("left", 0)
   
    
    const update = data => {
    
        const d3Max = d3.max(data, d =>  Object.values(d).reduce((acc,num) => acc + num) ) < 70000 ? 70000 : 
                        d3.max(data, d => Object.values(d).reduce((acc,num) => acc + num)) + 1000
    

        const layers = stack(data);

        const area = d3.area()
                    .x(d => xScale(d.data.age))
                    .y0(d => yScale(d[0]))
                    .y1(d => yScale(d[1]))
                    .curve(d3.curveBasis)                                                                                                       //sets the lines to be less jagged   


        const yScale = d3.scaleLinear().range([graphHeight, 0]).domain([0, max])
        const xScale = d3.scaleBand().range([0, graphWidth]).paddingInner(0.2).paddingOuter(0.3).domain(data.map(item => item.age))

            var layer = graph.selectAll(".layer")
            .data(stack(data))
            .enter().append("g")
            .attr("class", "layer");

            layer.append("path")
            .attr("class", "area")
            .style("fill", (d,i) => color[i])
            .style("opacity", 0.3)
            .attr("d", area);

    // const chart = graph.append("path")
    //             .attr("class", "line-path")
    //             .attr("d", area(series))
    
    //     chart.exit().remove()
    
    //     chart.selectAll("path")
    //         .data(d => d)
    //         .enter().append("path")
    //             .attr("class", "area")
    //             .attr("x", d => xScale(d.data.age))
    //             .attr("y", d => yScale(d[1]))
    //          .merge(chart)

    
    //     chart.enter().append("g")
    //         .attr("fill", (d,i) => color[i])
    //         .attr("backgroundColor", (d,i) => color[i])
    //         .attr("class", (d,i) => d.key)
    //         .selectAll("path") 
    //         .data(d => d)
    //         .enter().append("path")
    //             .attr("y", d => yScale(d[1]))
    //             .attr("height", d => yScale(d[0]) - yScale(d[1]))
    //             .attr("x", d => xScale(d.data.age))
    //             .attr("width", xScale.bandwidth())
    //                 .on("mouseover", (d,i,n) => {
    //                             const name = n[0].parentNode.className.animVal
    //                             const nameIndex = props.stackedKeys.findIndex(type => type === name)
    //                             const thisColor = color[nameIndex]
    //                             const thisYearTotalIncome = Object.values(props.data[i]).slice(1).reduce((acc, num) => acc + num)
    //                             d3.select(n[i])
    //                                 .transition()
    //                                     .duration(100)
    //                                     .attr("opacity", 0.7)
    //                                     .attr("cursor", "pointer")
                            
    //                                     tooltip.transition()
    //                                     .duration(200)
    //                                     .style("opacity", 1)
    //                                     .style("pointer-events", "none")

    //                                     tooltip.html(
    //                                         `
    //                                         <div class="topHeader">
    //                                             <p> ${(d.data.age)} Yrs Old</p>
    //                                             <p>  Year ${(d.data.age + 1988)} </p>
    //                                         </div>
    //                                         <div class="financialOutput">
    //                                             <div class="total" style="color: ${thisColor}; ">
    //                                                 <h3 class="title">  ${_.startCase(name)} </h3>
    //                                                 <p class="value" style="border-bottom: .3px solid #72929B; border-left: .3px solid #72929B;">  
    //                                                     ${(d[1] - d[0])/1000} 
    //                                                     <span> K</span>
    //                                                 </p>
    //                                             </div>
    //                                             <div class="total">
    //                                                 <h3 class="title">  Total Income </h3>
    //                                                 <p class="value" style="border-left: .3px solid #72929B;">  
    //                                                     ${thisYearTotalIncome/1000} 
    //                                                     <span> K</span>
    //                                                 </p>
    //                                             </div>
    //                                         </div>
    //                                         `
    //                                     )
                                        
    //                                 })
    //                                 .on("mouseout", (d,i,n) => {d3.select(n[i])
    //                                     .transition()
    //                                     .duration(100)
    //                                     .attr("opacity", 1)
                            
    //                                     tooltip.transition()
    //                                     .duration(100)
    //                                     .style("opacity", 0)   
    //                                         })
    //                                 .on('mousemove', function(d) { // when mouse moves                  
    //                                         tooltip.style('top', (d3.event.layerY - 20) + 'px') // always 10px below the cursor
    //                                             .style('left', (d3.event.layerX + 30) + 'px'); // always 10px to the right of the mouse
    //                                         });
                        
    

            const xAxis = d3.axisBottom(xScale)
                             .tickValues([])

                                    
            const yAxis = d3.axisLeft(yScale).ticks('3')
                            .tickFormat(d => `${d/1000}k`)


        xAxisGroup.call(xAxis)
        yAxisGroup.call(yAxis)
    }

    update(data)
    
}

export default class StackedBarChartLifetimeIncome extends Component {

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
            <Canvas className="canvasReccomendedSavingsStackedAreaChart" ref={canvasReccomendedSavingsStackedAreaChart => this.divRef = canvasReccomendedSavingsStackedAreaChart}>
                
            </Canvas>
        )
    }
}


//-----------------------------------------------STYLES-----------------------------------------------//

const Canvas = styled.div`
        width: 100%;
        height: 100%;
        position: relative;
        position: absolute;
        top: 0rem;
        left: 0rem;
`