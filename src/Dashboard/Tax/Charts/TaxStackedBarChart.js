import React, { Component } from 'react'
import * as d3 from "d3"
import "./ChartStyles.css"
import _ from "lodash"
import styled from "styled-components"

const drawChart = (props, width, height) => {

    const margin = {top: 100, right: 50, bottom: 30, left: 80}
    const graphHeight = height - margin.top - margin.bottom
    const graphWidth = width - margin.left - margin.right
    const color = ['#88adbf',"#55869d", "#f5ab97", "#F29278", "#ee6c4a"]

    d3.select(".canvasTaxStacked > *").remove()
    d3.select(".tooltipStackedChart").remove()



    const data = props.taxStackedData
   

    const svg = d3.select('.canvasTaxStacked').append("svg").attr("viewBox", `0 0 ${width} ${height}`)



    const graph = svg.append("g").attr("height", graphHeight)
                                 .attr("width", graphWidth)
                                 .attr("transform", `translate(${margin.left}, ${margin.top})`)
                                 

    const xAxisGroup = graph.append("g")
                            .attr("transform", `translate(0, ${graphHeight + 10})`)
                            .attr("class", "axis")
                            
    const yAxisGroup = graph.append("g")
                        .attr("class", "axis")

    
       const stack = d3.stack()
                        .keys(props.taxStackedKeys)
                        .order(d3.stackOrderNone)
                        .offset(d3.stackOffsetNone);
        
        const tooltip = d3.select(".canvasTaxStacked").append("div")
                        .attr("class", "tooltipStackedChart")
                        .style("opacity", 0)
                        .style("position", "absolute")
                        .style("top", 0)
                        .style("left", 0)

   

    const update = data => {
    
        const d3Max = d3.max(data, d =>  d.incomeAfterTax ) < 90000 ? 90000 : 
                        d3.max(data, d => d.incomeAfterTax ) + 10000

        const series = stack(data);
        const yScale = d3.scaleLinear().range([graphHeight, 0]).domain([0, d3Max])
        const xScale = d3.scaleBand().range([0, graphWidth]).paddingInner(0.2).paddingOuter(0.3)
        .domain(data.map(item => item.bracket))


 

    const rects = graph.append("g")
        .selectAll("g")
        .data(series)
    
        rects.exit().remove()
    
        rects.selectAll("rect")
            .data(d => d)
            .enter().append("rect")
                .attr("x", d => xScale(d.data.bracket))
                .attr("y", d => yScale(d[1]))
             .merge(rects)
                .attr("height", d => yScale(d[0]) - yScale(d[1]))
                .attr("width", xScale.bandwidth())
            
                rects.append("text")
                .attr("text-anchor", "middle")
                .attr("x", xScale.bandwidth()/2)
                .attr("y", function(d) { return yScale("bboobies"); }) // d.total!
                .style("fill", "black")
                .text(function(d) { return "bboobies" });

//    
        rects.enter().append("g")
            .attr("fill", (d,i) => color[i])
            .attr("backgroundColor", (d,i) => color[i])
            .attr("class", (d,i) => d.key)
            .selectAll("rect") 
            .data(d => d)
            .enter().append("rect")
                .attr("x", d => xScale(d.data.bracket))
                .attr("y", d => yScale(d[1]))
                .attr("height", d => yScale(d[0]) - yScale(d[1]))
                .attr("width", xScale.bandwidth())
      
                            .on("mouseover", (d,i,n) => {
                                const name = n[0].parentNode.className.animVal
                                const nameIndex = props.taxStackedKeys.findIndex(type => type === name)
                                const thisColor = color[nameIndex]
                                const thisYearTotalIncome = props.taxStackedData[i].incomeAfterTax
                                d3.select(n[i])
                                    .transition()
                                        .duration(100)
                                        .attr("opacity", 0.9)
                                        .attr("cursor", "pointer")
                            
                                        tooltip.transition()
                                        .duration(200)
                                        .style("opacity", 1)
                                        .style("pointer-events", "none")
                                        tooltip.html(
                                            `
                                            <div class="topHeader">
                                          hi
                                            </div>
                                            <div class="financialOutput">
                                                <div class="total" style="color: ${thisColor}; ">
                                                    <h3 class="title">  ${_.startCase(name)} </h3>
                                                    <p class="value" style="border-bottom: .3px solid #72929B; border-left: .3px solid #72929B;">  
                                                    ${Math.round((d[1] - d[0]).toFixed()/1000)*1000/1000} 
                                                        <span> K</span>
                                                    </p>
                                                </div>
                                                <div class="total">
                                                    <h3 class="title"> Total Income In Bracket </h3>
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

            var ticks = [1,2,3,4,5,6];
            var tickLabels = ['Bracket 1','Bracket 2','Bracket 3','Bracket 4','Bracket 5']
                

            const xAxis = d3.axisBottom(xScale)
                            .tickValues(ticks)
                            .tickFormat(function(d,i){ return tickLabels[i] })
                           
                                    
            const yAxis = d3.axisLeft(yScale).ticks('3')
                            .tickFormat(d => `${d/1000}k`)


        xAxisGroup.call(xAxis)
        yAxisGroup.call(yAxis)
    }

    update(data)
    
}

export default class StackedBarChart extends Component {

    state = {
        elementWidth: 0,
        elementHeight: 0
    }

    updateSize = () => {
        this.setState({ 
            elementWidth: this.divRef.clientWidth || 400, 
            elementHeight: this.divRef.clientHeight || 400 
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
componentUnMount() {

}


    render() {

        window.addEventListener('resize', this.updateSize)

        return (
            <Canvas className="canvasTaxStacked" ref={taxStackedCanvas => this.divRef = taxStackedCanvas}>
                
            </Canvas>
        )
    }
}


//-----------------------------------------------STYLES-----------------------------------------------//

const Canvas = styled.div`
        width: 100%;
        height: 100%;
        position: relative;

`


// <div class="topHeader">
// <p> Marginal Rate: ${((+d.data.federalTax + +d.data.provincialTax + +d.data.CppAndEI )/thisYearTotalIncome *100).toFixed()}%</p>
// </div>
// <div class="financialOutput">
// <div class="total" style="color: ${thisColor}; ">
//     <h3 class="title">  ${_.startCase(name)} </h3>
//     <p class="value" style="border-bottom: .3px solid #72929B; border-left: .3px solid #72929B;">  
//         ${Math.round((d[1] - d[0]).toFixed()/1000)*1000/1000} 
//         <span> K</span>
//     </p>
// </div>
// <div class="total">
//     <h3 class="title"> Total Income In Bracket </h3>
//     <p class="value" style="border-left: .3px solid #72929B;">  
//         ${Math.round(thisYearTotalIncome/1000)*1000/1000} 
//         <span> K</span>
//     </p>
// </div>
// </div>
// `