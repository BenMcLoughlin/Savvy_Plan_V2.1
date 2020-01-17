import React, { Component } from "react"
import * as d3 from "d3"
import styled from "styled-components"
import "./ChartStyles.css"
import _ from "lodash"

const drawTaxDonutChart = (props, width, height) => {

    d3.select(".canvasTaxDonutChart_tile > *").remove()
    d3.select(".tooltipDonutChart_tile").remove()
    d3.select(".centerValue_tile").remove()

    const data = props.taxDonutChartData
    const beforeTaxIncome = data.map(d => d.value).reduce((acc, num) => acc + num)
    const totalTaxLiability = data.filter(d => d.name !== "afterTaxIncome") 
                                   .filter(d => d.name !== "taxCredit")         
                                    .map(d => d.value).reduce((acc, num) => acc + num)


    const radius = width / 4
    const center = {x: (width / 2), y: (height / 2)} // chart dimension

    const svg = d3.select(".canvasTaxDonutChart_tile")
                    .append("svg")
                    .attr('width', width + 100)
                    .attr('height', height + 100)

    const graph = svg.append("g")
                    .attr("transform", `translate(${center.x}, ${center.y})`) //placing the chart in the center of the div


    const centerValue = d3.select('.canvasTaxDonutChart_tile') 
                        .append('div')                          
                        .attr('class', 'centerValue_tile')
                        .style("opacity", 1)
                        .style('position', 'absolute')
                        .style('top', `${center.y - 50}px`)
                        .style("left", `${center.x - 78}px`)
                        .style("width", '30px')
                        .html(`
                        <div class="summary_tile">
                        ${  Math.round(totalTaxLiability/beforeTaxIncome * 100) }%
                            <span class="subHeader">Average Tax Rate</span>
                        </div>
                         `)

                             
    const tooltip = d3.select('.canvasTaxDonutChart_tile') 
                        .append('div')                          
                        .attr('class', 'tooltipDonutChart_tile')
                        .style("opacity", 0)
                        .style('position', 'absolute')
                        .style("top", 0)
                        .style("left", 0)



    const pie = d3.pie()
                    .sort(null)
                    .value(d => d.value)

    const arcPath = d3.arc()
                    .outerRadius(radius)
                    .innerRadius(radius / 1.2)

    const color = ['#4BB9D0',"#55869d", "#FFD152", "#F29278", "#ee6c4a"]

    const titleList = ["After Tax Income", "Tax Credit Income", "Federal Taxes", "Provincial Taxes", "CPP & EI"]

    //const colorScale = d3.scaleOrdinal().domain(titleList).range(color)



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
                  console.log('hi');
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

                const uselessFunctionToClearUnusedNames = () => {
                   
                   return centerValue +  titleList
                }
                uselessFunctionToClearUnusedNames()
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
            elementWidth: this.divRef.clientWidth, 
            elementHeight: this.divRef.clientHeight
        });
        drawTaxDonutChart(this.props, this.state.elementWidth, this.state.elementHeight)
    }
    componentDidUpdate () {
        drawTaxDonutChart(this.props, this.state.elementWidth, this.state.elementHeight)
    }
    

    render() {
        //if (window) {window.addEventListener('resize', this.updateSize)}
        if (window) {setTimeout(function(){ window.addEventListener('resize', this.updateSize)}, 3000);}

        return (
            <Canvas className="canvasTaxDonutChart_tile" ref={taxDonutCanvas => this.divRef = taxDonutCanvas}>

            </Canvas>

   
        )
    }
}


//-----------------------------------------------style-----------------------------------------------//

const Canvas = styled.div`
        width: 100%;
        height: 100%;
        position: relative;


`


