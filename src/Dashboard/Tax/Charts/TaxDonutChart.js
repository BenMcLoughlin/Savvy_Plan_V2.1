import React, { Component } from 'react'
import * as d3 from "d3"
import styled from "styled-components"
import { getDivWidth} from "../../../services/ChartFunctions"
import "./ChartStyles.css"


const drawTaxDonutChart = (props, width, height) => {

    d3.select(".canvas > *").remove()
    d3.select(".tooltip").remove()
    d3.select(".centerValue").remove()
        

    const data = props.taxDonutChartData

    const radius = width / 4
    const center = {x: (width / 2 + 5), y: (height / 1.5 )} // chart dimension
    const legendRectSize = 10; 
    const legendSpacing = 6; 

    const svg = d3.select(".canvas")
                    .append("svg")
                    .attr('width', width + 100)
                    .attr('height', height + 100)

    const graph = svg.append("g")
                    .attr("transform", `translate(${center.x}, ${center.y})`) //placing the chart in the center of the div


    const centerValue = d3.select('.canvas') 
                        .append('div')                          
                        .attr('class', 'centerValue')
                        .style("opacity", 1)
                        .style('position', 'absolute')
                        .style('top', `${center.y / 2}px`)
                        .style("left", `${center.x/1.4}px`)
                        .style("width", '30px')
                        .html(`
                        <div class="summary">
                        ${  ((data.filter(d => d.name !== "afterTaxIncome").map(d => d.value).reduce((acc, num) => acc + num) /
                            data.map(d => d.value).reduce((acc, num) => acc + num) || 0) * 100).toFixed()
                        }%
                            <span class="subHeader">Average Tax Rate</span>
                        </div>
                         `)

                             
    const tooltip = d3.select('.canvas') 
                        .append('div')                          
                        .attr('class', 'tooltip')
                        .style("opacity", 1)
                        .style('position', 'absolute')
                        .style('top', '20px')
                        .style("left", '30px')


    const pie = d3.pie()
                    .sort(null)
                    .value(d => d.value)

    const arcPath = d3.arc()
                    .outerRadius(radius)
                    .innerRadius(radius / 1.3)

    const color = ['#7DA8B8',"#F7CDAB", "#F29278", "#828F98", "#4BB9D0", '#FEDE76', "#7DA8B8", '#81CCAF']

    const titleList = ["After Tax Income", "Tax Credit Income", "Federal Taxes", "Provincial Taxes", "CPP & EI"]

    const colorScale = d3.scaleOrdinal().domain(titleList).range(color)

    const legendGroup = graph.append('g')
             .attr("transform", `translate(${center.x - 150}, ${center.y - 30})`)

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
                        <h3 class="title"> ${titleList[i]} </h3>
                        <p class="value" style="border-bottom: .3px solid #72929B; border-left: .3px solid #72929B;">  
                            ${(Math.round(d.value/100)*100)/1000}
                            <span> K</span>
                        </p>
                    </div>
                    <div class="total">
                        <h3 class="title">  Percentage </h3>
                        <p class="value" style="border-left: .3px solid #72929B;">  
                        ${(d.value / data.map(d => d.value).reduce((acc, num) => acc + num) * 100).toFixed()}
                            <span> %</span>
                        </p>
                    </div>
                    </div>
                    `
                    )

              })
              .on("mouseout",  (d,i,n) => {
                d3.select(n[i])
                .transition().duration(100).attr("opacity", 1)

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
            elementWidth: this.divRef.clientWidth || 400, 
            elementHeight: this.divRef.clientHeight || 400 
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
        window.addEventListener('resize', this.updateSize)

        return (
            <Canvas className="canvas" ref={taxDonutCanvas => this.divRef = taxDonutCanvas}>

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




// function getDivWidth (div) {
//     var width = d3.select(div)
//       // get the width of div element
//       .style('width')
//       // take of 'px'
//       .slice(0, -2)
//     // return as an integer
//     return Math.round(Number(width))
//   }

// const drawTaxDonutChart = (props) => {

// const height = 400
// const width = getDivWidth(".canvas");
// const margin = {top: 50, right: 20, bottom: 10, left: 40}
// const graphHeight = height - margin.top - margin.bottom
// const graphWidth = width - margin.left - margin.right
// const color = ['#7DA8B8',"#F7CDAB", "#F29278", "#828F98", "#4BB9D0", '#FEDE76', "#7DA8B8", '#81CCAF']
// const radius = Math.min(width, height) / 4.5;
// const legendRectSize = 10; 
// const legendSpacing = 6; 
// const colorScale = d3.scaleOrdinal().domain(["After Tax Income", "Federal Taxes", "Provincial Taxes", "CPP & EI"]).range(color)

// d3.select(".canvas > *").remove()
// d3.select(".tooltip").remove()

// const data = props.taxDonutChartData

// const svg = d3.select('.canvas') .append('svg') .attr("viewBox", `0 0 ${width} ${height}`)
            
// const graph = svg.append('g') 
//              .attr("height", graphHeight)
//              .attr("width", graphWidth)
//              .attr("transform", `translate(${margin.left + 130}, ${margin.top + 100})`)

// const legendGroup = graph.append('g')
//              .attr("transform", "translate(120,50)")

// const legend = legendGroup.selectAll('.legend')
//         .data(colorScale.domain())
//         .enter() 
//         .append('g')
//         .attr('class', 'legend') 
//         .attr('transform', function(d, i) {                   
//             const height = legendRectSize + legendSpacing + 10;   
//             const offset =  height * colorScale.domain().length / 1.2;  
//             const horz = 5 * legendRectSize; 
//             const vert = i * height - offset; 
//             return 'translate(' + horz + ',' + vert + ')';   
//         });

//         legend.append('circle') // append rectangle squares to legend                                   
//             .attr('r', legendRectSize) // width of rect size is defined above                        
//             .attr('height', legendRectSize) // height of rect size is defined above                                     
//             .style('fill', colorScale) // each fill is passed a color
//             .style('stroke', color) // each stroke is passed a color
        
//         legend.append('text')                                    
//         .attr('x', legendRectSize + legendSpacing)
//         .attr('y', legendRectSize - legendSpacing)
//         .text(function(d) { return d }); // return name

//         const arc = d3.arc()
//         .innerRadius(radius/1.2) 
//         .outerRadius(radius); 

//     const pie = d3.pie() 
//         .sort(null) 
//         .value(d => d.value ) 
  
//         const tooltip = d3.select('.canvas') 
//         .append('div')                          
//         .attr('class', 'tooltip'); 

//         const path = graph.selectAll('path') 
//         .data(pie(data)) 
//         .enter() 
//         .append('path') 
//         .attr('d', arc)
//         .attr('fill', (d, i) =>  color[i])
//         .each(function(d) {return this._current - d; });

//         tooltip.append('div')                       
//         .attr('class', 'name');                  

//         tooltip.append('div')                 
//                     .attr('class', 'value');           

//         tooltip.append('div') 
//         .attr('class', 'percent');

//   const update = data => {


// path.on("mouseover", (d,i,n) => {
 

//     d3.select(n[i])
// .transition()
// .duration(100)
// .attr("opacity", 0.7)
// .attr("cursor", "pointer")

// tooltip.transition()
// .duration(200)
// .style("opacity", 1)
// .style("pointer-events", "none")


// tooltip.html(
// `
// <div class="topHeader">
// <p> 12 Yrs Old</p>
// <p>  Year 12 </p>
// </div>
// <div class="financialOutput">
// <div class="total" style="color: 12; ">
//     <h3 class="title"> 12 </h3>
//     <p class="value" style="border-bottom: .3px solid #72929B; border-left: .3px solid #72929B;">  
//         12
//         <span> K</span>
//     </p>
// </div>
// <div class="total">
//     <h3 class="title">  Total Income </h3>
//     <p class="value" style="border-left: .3px solid #72929B;">  
//        12
//         <span> K</span>
//     </p>
// </div>
// </div>
// `
// )

// })
// .on("mouseout", (d,i,n) => {d3.select(n[i])
// .transition()
// .duration(100)
// .attr("opacity", 1)

// tooltip.transition()
// .duration(100)
// .style("opacity", 0)

// })

// path.on('mousemove', function(d) { // when mouse moves                  
//   tooltip.style('top', (d3.event.layerY + 10) + 'px') // always 10px below the cursor
//     .style('left', (d3.event.layerX + 10) + 'px'); // always 10px to the right of the mouse
//   });





        
//         data.forEach(d =>  d.value = +d.value);

//   }

//     update(data)



// }

