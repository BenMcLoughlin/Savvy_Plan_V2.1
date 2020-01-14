import React, { Component } from 'react'
import * as d3 from "d3"
import styled from "styled-components"
import {stackedAreaData} from "redux/savings/savings_selectors"
import {connect} from "react-redux"
import {createStructuredSelector} from "reselect"

const drawChart = (props, width, height) => {

    const margin = {top: 20, right: 100, bottom: 50, left: 100}
    const graphHeight = height - margin.top - margin.bottom
    const graphWidth = width - margin.left - margin.right
    const color =  ["age", '#3B7B8E', "#3B7B8E", '#3B7B8E', ' #7898a1', "#7898a1",  '#7898a1']
    const colorList =  [ ' #7898a1', '#3B7B8E',]
    const colorScale = d3.scaleOrdinal().domain(["Interest Growth", "Contributions / Withdrawals"]).range(colorList)
   
   //["age", '#488487', '#3B7B8E', '#B9B0A2', '#488487', '#3B7B8E',  '#B9B0A2']
   //["age", '#3B7B8E', "#3B7B8E", '#3B7B8E', '#e1e8ea', "#e1e8ea",  '#e1e8ea']
   //["age", '#3B7B8E', "#3B7B8E", '#3B7B8E', '#e1e8ea', "#e1e8ea",  '#e1e8ea']
   //["age", "#ef7959", "#4BB9D0", #7DA8B8", "#ef7959", "#4BB9D0",  #7DA8B8"]
    d3.select(".canvasSavingsStackedAreaChart > *").remove()
    d3.select(".tooltip").remove()

    const legendRectSize = 5; 
    const legendSpacing = 8; 

    const stackedKeys = ["age", "rrspContributions", "tfsaContributions", "nonRegisteredContributions", "rrspInterest", "tfsaInterest",  "nonRegisteredInterest"]
    const data = props.stackedAreaData

    const svg = d3.select('.canvasSavingsStackedAreaChart').append("svg").attr("viewBox", `0 0 ${width} ${height}`)



    const graph = svg.append("g").attr("height", graphHeight > 100 ? graphHeight : 100)
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
        

    const tooltip = d3.select(".canvasSavingsStackedAreaChart").append("div")
                        .attr("class", "tooltip")
                        .style("opacity", 0)
                        .style("position", "absolute")
                        .style("top", 0)
                        .style("left", 0)

                        const uselessFunctionToClearUnusedNames = () => {
                            return tooltip
                         }
                         uselessFunctionToClearUnusedNames()

    const update = data => {
    
    
        const d3Max = d3.max(data, d =>  Object.values(d).reduce((acc,num) => acc + num) ) < 90000 ? 90000 : 
                        d3.max(data, d => Object.values(d).reduce((acc,num) => acc + num)) + 10000


        const area = d3.area()
                    .x(d => xScale(d.data.age))
                    .y0(d => yScale(d[0]))
                    .y1(d => yScale(d[1]))
                    .curve(d3.curveBasis)                                                                                                       //sets the lines to be less jagged   


        const yScale = d3.scaleLinear().range([graphHeight, 0]).domain([0, d3Max])
        const xScale = d3.scaleBand().range([0, graphWidth]).paddingInner(0.2).paddingOuter(0.3).domain(data.map(item => item.age))

            var layer = graph.selectAll(".layer")
            .data(stack(data))
            .enter().append("g")
            .attr("class", "layer");

            layer.append("path")
            .attr("class", "area")
            .style("fill", (d,i) => color[i])
            .style("opacity", (d,i) => i > 3 ? 0.3 : 1)
            .attr("d", area);

            // const totalGroup = graph.append("g")
            //                 .attr('transform', function(d, i) {                   
            //                     const height = yScale(d3Max);   
            //                     const offset =  height * colorScale.domain().length / 1.2;  
            //                     const horz = 6 * legendRectSize; 
            //                     const vert = i * height - offset; 
            //                     return 'translate(' + horz + ',' + vert + ')';   
            //                 })

            // totalGroup.append('text')                                    
            //                   .attr('x', 50 )
            //                   .attr('y',50)
            //                   .text("total")

            const legendGroup = graph.append('g')
            .attr("transform", `translate(${graphWidth}, ${d3Max-40})`)
    
            const legend = legendGroup.selectAll('.legend')
            .data(colorScale.domain())
            .enter() 
            .append('g')
            .attr('class', 'legend') 
            .attr('transform', function(d, i) {                   
                const height = legendRectSize + legendSpacing + 10;   
                const offset =  height * colorScale.domain().length / 1.2;  
                const horz = 6 * legendRectSize; 
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
                .attr('y', legendRectSize - legendSpacing + 6)
                .text(function(d) { return d }); // return name
                
         


            const xAxis = d3.axisBottom(xScale)
                           .tickValues([])
                           
                                    
            const yAxis = d3.axisLeft(yScale).ticks('3')
                            .tickFormat(d => `${d/1000}k`)


        xAxisGroup.call(xAxis)
        yAxisGroup.call(yAxis)
    }

    update(data)
    
}

class StackedAreaChartSavings extends Component {

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
            <Canvas className="canvasSavingsStackedAreaChart" ref={canvasSavingsStackedAreaChart => this.divRef = canvasSavingsStackedAreaChart}>
                
            </Canvas>
        )
    }
}


const mapStateToProps = createStructuredSelector({
    stackedAreaData
})

export default connect(mapStateToProps)(StackedAreaChartSavings )

//-----------------------------------------------STYLES-----------------------------------------------//

const Canvas = styled.div`
        width: 100%;
        height: 100%;
        position: relative;
        position: absolute;
        top: 0rem;
        left: 0rem;
        z-index: 2;
`