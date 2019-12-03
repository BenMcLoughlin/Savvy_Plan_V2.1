import React, { Component } from "react";
import * as d3 from "d3";
import d3Utils from "./utils";
import d3Config from "./config";
import styled from "styled-components";
import { transition } from "d3-transition";
import { extent } from "d3-array";

export default class LineGraph extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        { name: "Jan", value: 890 },
        { name: "Feb", value: 810 },
        { name: "Mar", value: 650 },
        { name: "Apr", value: 350 },
        { name: "May", value: 850 },
        { name: "Jun", value: 630 },
        { name: "July", value: 660 },
        { name: "Aug", value: 720 },
        { name: "Sep", value: 400 },
        { name: "Oct", value: 555 },
        { name: "Nov", value: 560 },
        { name: "Dec", value: 880 }
      ]
    };
    this.ref = React.createRef();
  }

  componentDidMount() {
    const parentWidth = 1000;
    const margin = { top: 40, right: 20, bottom: 50, left: 50 };
    const graphWidth = parentWidth - margin.left - margin.right;
    const graphHeight = 300 - margin.top - margin.bottom;
    const { data } = this.state;
    const ticks = 5;
    const t = transition().duration(1000);

    //const color = ["#f2503f", "#ea0859", "#404F70"];
    //const data = [this.props.Score];
    this.drawLine(margin, graphHeight, graphWidth, data);
  }

  drawLine(margin, graphHeight, graphWidth, data) {
    const svg = d3
      .select(this.refs.line)
      .append("svg")
      .attr("width", graphWidth + margin.left + margin.right)
      .attr("height", graphHeight + margin.top + margin.bottom);

    const graph = svg
      .append("g")
      .attr("width", graphWidth)
      .attr("height", graphHeight)
      .attr("transform", `translate(${margin.left},${margin.top})`);

    //scales
    const x = d3
      .scaleBand()
      //.domain(data.map(d => d.name))
      .range([0, graphWidth]);

    const y = d3
      .scaleLinear()
      // .domain(extent(data, d => d.value))
      .range([graphHeight, 0]);

    //axis groups
    const xAxisGroup = graph
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0," + graphHeight + ")")
      .attr("stroke", "grey")
      .attr("stroke-width", 1);

    const yAxisGroup = graph
      .append("g")
      .attr("class", "y-axis")
      .attr("stroke", "grey")
      .attr("stroke-width", 1);

    //d3 line path generator
    const line = d3
      .line()
      .x(d => x(d.name))
      .y(d => y(d.value));
    /* .x(function(d){return x(d.name)})
.y(funtion(d){return y(d.value)}); */

    //line path elements
    const path = graph.append("path");

    const update = data => {
      //sort data based on value(score) object
      //data.sort((a, b) => a.value - b.value);

      //set scale doimains
      //extent gives the min and max distance
      x.domain(data.map(d => d.name));
      y.domain([200, d3.max(data, d => d.value)]);

      //update path generateor data
      path
        .data([data])
        .attr("fill", "none")
        .attr("stroke", "#00bfa5")
        .attr("stroke-width", 2)
        .attr("d", line);
      //create circles for objects on graps
      const circles = graph.selectAll("circle").data(data);

      // remove unwanted points
      circles.exit().remove();

      //update current points
      circles.attr("cx", d => x(d.name)).attr("cy", d => y(d.value));

      //add new points
      circles
        .enter()
        .append("circle")
        .attr("r", 4)
        .attr("cx", d => x(d.name))
        .attr("cy", d => y(d.value))
        .attr("fill", "#ccc");

      graph
        .selectAll("circle")
        .on("mouseover", (d, i, n) => {
          d3.select(n[i])
            .transition()
            .duration(100)
            .attr("r", 8)
            .attr("fill", "#black");
        })

        //mouse leave event ot reset the hoever
        .on("mouseleave", (d, i, n) => {
          d3.select(n[i])
            .transition()
            .duration(100)
            .attr("r", 4)
            .attr("fill", "#ccc");
        });

      //create axes
      const xAxis = d3.axisBottom(x).ticks(4);
      const yAxis = d3.axisLeft(y).ticks(4);

      //call axes
      xAxisGroup.call(xAxis);
      yAxisGroup.call(yAxis);

      // rotate labels on axes text
      xAxisGroup
        .selectAll("text")
        .attr("transform", "rotate(-40)")
        .attr("text-anchor", "end");
    };
    update(data);
  }

  render() {
    return (
      <WidgetWrapper>
        <HeaderWrapper>My Score History </HeaderWrapper>
        <div ref="line">
          <xAxis class="x-axis"></xAxis>
          <yAxis class="y-axis"></yAxis>
        </div>
      </WidgetWrapper>
    );
  }
}

/* 
CSS styling
*/
const WidgetWrapper = styled.section`
  align-self: flex-start;
  margin-right: 5px;
`;

const HeaderWrapper = styled.div`
  font-size: ${props => props.theme.fontSize.medium};
  text-align: center;
  font-weight: normal;
  & .chart-container {
    padding: 25px;
  }
`;

const xAxis = styled.div`
  stroke: "grey";
`;