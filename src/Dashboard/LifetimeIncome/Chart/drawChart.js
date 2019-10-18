import * as d3 from "d3"
import "./ChartStyles.css"
import _ from "lodash"

const height = 600;
const width = 850;
const margin = {top: 20, right: 20, bottom: 100, left: 90}
const graphHeight = height - margin.top - margin.bottom
const graphWidth = width - margin.left - margin.right
const color = ['#7DA4B7','#7bccc4','#43a2ca', "#ef6c67", "#039be5", '#ffd152', "#ef6c67", "#039be5", '#ffd152'];

const drawChart = (props) => {

    d3.select(".canvas > *").remove()
    d3.select(".tooltip").remove()

    const data = props.data


    const svg = d3.select('.canvas').append("svg").attr("viewBox", `0 0 ${width} ${height}`)


    
    const graph = svg.append("g").attr("height", graphHeight)
                                 .attr("width", graphWidth)
                                 .attr("transform", `translate(${margin.left}, ${margin.top})`)
    
    const xAxisGroup = graph.append("g")
                            .attr("transform", `translate(0, ${graphHeight})`)
                            .attr("class", "axis")
                            
    const yAxisGroup = graph.append("g")
                        .attr("class", "axis")

    const yAxisHorizontalLineGroup = graph.append("g")
    
       const stack = d3.stack()
        .keys(props.stackedKeys)
        .order(d3.stackOrderNone)
        .offset(d3.stackOffsetNone);
        const div = d3.select(".canvas").append("div")
                        .attr("class", "tooltip")
                        .style("opacity", 0)
   
    
    const update = data => {
    
        const d3Max = d3.max(data, d =>  Object.values(d).reduce((acc,num) => acc + num) ) < 70000 ? 70000 : 
                        d3.max(data, d => Object.values(d).reduce((acc,num) => acc + num)) + 10000
        const series = stack(data);
        const yScale = d3.scaleLinear().range([graphHeight, 0]).domain([0, d3Max])
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
                .attr("height", d => yScale(d[0]) - yScale(d[1]))
                .attr("width", xScale.bandwidth())
    
        rects.enter().append("g")
            .attr("fill", (d,i) => color[i])
            .attr("backgroundColor", (d,i) => color[i])
            .attr("class", (d,i) => d.key)
            .selectAll("rect") 
            .data(d => d)
            .enter().append("rect")
                .attr("x", d => xScale(d.data.age))
                .attr("y", d => yScale(d[1]))
                .attr("height", d => yScale(d[0]) - yScale(d[1]))
                .attr("width", xScale.bandwidth())
                            .on("mouseover", (d,i,n) => {
                                const name = n[0].parentNode.className.animVal
                                const nameIndex = props.stackedKeys.findIndex(type => type === name)
                                const thisColor = color[nameIndex]
                                const thisYearTotalIncome = Object.values(props.data[i]).slice(1).reduce((acc, num) => acc + num)
                                d3.select(n[i])
                  .transition()
                    .duration(100)
                    .attr("opacity", 0.7)
                    .attr("cursor", "pointer")
        
                // var thisage = d3.select(this.parentNode).datum().key;
        
                    div.transition()
                    .duration(200)
                    .style("opacity", 1)
                    .style("left", (d3.event.pageX + 42 ) + "px")
                    .style("top", (d3.event.pageY - 10) + "px")
                    .style("pointer-events", "none")
                    

                    div.html(
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
        
                    div.transition()
                    .duration(100)
                    .style("opacity", 0)
                    
        })
            var ticks = [20,40, 60, 80, 95];
            var tickLabels = ['Age 20','Age 40','Age 60','Age 80','Age 95']

            const xAxis = d3.axisBottom(xScale)
                            .tickValues(ticks)
                            .tickFormat(function(d,i){ return tickLabels[i] })
                           
                                    
            const yAxis = d3.axisLeft(yScale).ticks('3')
                            .tickFormat(d => `$${d.toLocaleString()}`)

            const yAxisHorizontalLine = d3.axisBottom(xScale).tickValues([])

            yAxisHorizontalLineGroup.call(yAxisHorizontalLine)

        xAxisGroup.call(xAxis)
        yAxisGroup.call(yAxis)
    }

    update(data)
    
}
    
    export default drawChart