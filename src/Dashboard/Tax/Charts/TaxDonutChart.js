import React, { Component } from 'react'
import * as d3 from "d3"
import styled from "styled-components"
import "./ChartStyles.css"
import _ from "lodash"

const drawTaxDonutChart = (props, width, height) => {

    d3.select(".canvasTaxDonutChart > *").remove()
    d3.select(".tooltipDonutChart").remove()
    d3.select(".centerValue").remove()
        

    const data = props.taxDonutChartData
    const beforeTaxIncome = data.map(d => d.value).reduce((acc, num) => acc + num)
    const totalTaxLiability = data.filter(d => d.name !== "afterTaxIncome") 
                                   .filter(d => d.name !== "taxCredit")         
                                    .map(d => d.value).reduce((acc, num) => acc + num)


    const radius = width / 4.6
    const center = {x: (width / 3), y: (height / 2)} // chart dimension
    const legendRectSize = 10; 
    const legendSpacing = 6; 

    const svg = d3.select(".canvasTaxDonutChart")
                    .append("svg")
                    .attr('width', width + 100)
                    .attr('height', height + 100)

    const graph = svg.append("g")
                    .attr("transform", `translate(${center.x}, ${center.y})`) //placing the chart in the center of the div


    const centerValue = d3.select('.canvasTaxDonutChart') 
                        .append('div')                          
                        .attr('class', 'centerValue')
                        .style("opacity", 1)
                        .style('position', 'absolute')
                        .style('top', `${center.y - 50}px`)
                        .style("left", `${center.x - 70}px`)
                        .style("width", '30px')
                        .html(`
                        <div class="summary">
                        ${  Math.round(totalTaxLiability/beforeTaxIncome * 100) }%
                            <span class="subHeader">Average Tax Rate</span>
                        </div>
                         `)

                             
    const tooltip = d3.select('.canvasTaxDonutChart') 
                        .append('div')                          
                        .attr('class', 'tooltipDonutChart')
                        .style("opacity", 0)
                        .style('position', 'absolute')
                        .style("top", 0)
                        .style("left", 0)



    const pie = d3.pie()
                    .sort(null)
                    .value(d => d.value)

    const arcPath = d3.arc()
                    .outerRadius(radius)
                    .innerRadius(radius / 1.3)

    const color = ['#88adbf',"#55869d", "#f5ab97", "#F29278", "#ee6c4a"]

    const titleList = ["After Tax Income", "Tax Credit Income", "Federal Taxes", "Provincial Taxes", "CPP & EI"]

    const colorScale = d3.scaleOrdinal().domain(titleList).range(color)

    const legendGroup = graph.append('g')
             .attr("transform", `translate(${center.x}, ${center.y - 50})`)

    const legend = legendGroup.selectAll('.legend')
        .data(colorScale.domain())
        .enter() 
        .append('g')
        .attr('class', 'legend') 
        .attr('transform', function(d, i) {                   
            const height = legendRectSize + legendSpacing + 10;   
            const offset =  height * colorScale.domain().length / 1.2;  
            const horz = 5 * legendRectSize; 
            const vert = i * height - offset; 
            return 'translate(' + horz + ',' + vert + ')';   
        });

        legend.append('circle') // append rectangle squares to legend                                   
            .attr('r', legendRectSize) // width of rect size is defined above                        
            .attr('height', legendRectSize) // height of rect size is defined above                                     
            .style('fill', colorScale) // each fill is passed a color
            .style('stroke', color) // each stroke is passed a color
        
        legend.append('text')                                    
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .text(function(d) { return d }); // return name

        //Join new pie data to path elements 

    const update = (data) => {
        const paths = graph.selectAll("path") 
        .data(pie(data))   


        paths.enter()  
                .append("path")
                .attr('class', "arc")
                .attr("d", arcPath)
                .attr('fill', (d, i) =>  color[i])


        graph.selectAll("path")
              .on("mouseover",  (d,i,n) => {
                d3.select(n[i])
                .transition().duration(100)
                .attr("opacity", 0.9)
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
                    <div class="total" style="color:${color[i]}; ">
                        <h3 class="title"> ${_.startCase(d.data.name)} </h3>
                        <p class="value" style="border-bottom: .3px solid #72929B; border-left: .3px solid #72929B;">  
                           ${(Math.round(d.value/100)*100)/1000}
                            <span> K</span>
                        </p>
                    </div>
                    <div class="total">
                        <h3 class="title">  Percentage </h3>
                        <p class="value" style="border-left: .3px solid #72929B;">  
                             ${(d.value/beforeTaxIncome).toFixed(2)*100}
                            <span> %</span>
                        </p>
                    </div>
                    </div>
                    `
                    )

              })
              .on("mouseout",  (d,i,n) => {
                d3.select(n[i])
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
    }
   

    update(data)

}

export default class TaxDonutChart extends Component {

    state = {
        elementWidth: 0,
        elementHeight: 0
    }


     updateSize = () => {
        this.setState({ 
            elementWidth: this.divRef.clientWidth, 
            elementHeight: this.divRef.clientHeight 
        });
        drawTaxDonutChart(this.props, this.state.elementWidth, this.state.elementHeight )
      }

    componentDidMount () {
        this.setState({ 
            elementWidth: this.divRef.clientWidth || 400, 
            elementHeight: this.divRef.clientHeight || 400 
        });
        drawTaxDonutChart(this.props, this.state.elementWidth, this.state.elementHeight)
    }
    componentDidUpdate () {
        drawTaxDonutChart(this.props, this.state.elementWidth, this.state.elementHeight)
    }
    

    render() {
        window.addEventListener('resize', this.updateSize)

        return (
            <Canvas className="canvasTaxDonutChart" ref={taxDonutCanvas => this.divRef = taxDonutCanvas}>

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


