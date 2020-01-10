import React, { Component } from "react";
import * as d3 from "d3";
import styled from "styled-components";

export default class ProgressArc extends Component {
  constructor() {
    super();
    /* this.state = {
      value: 70
    }; */

    this.ref = React.createRef();
  }

  componentDidMount() {
    const dims = { height: 300, width: 300, radius: 150 };
    const cent = { x: dims.width / 2, y: dims.height / 2 };
    const color = ["#f2503f", "#ea0859", "#404F70"];
    const data = [this.props.Score];
    this.drawArc(dims, cent, data, color);
  }

  drawArc(dims, cent, data, color) {
    const context = this.setContext();
    this.setBackground(context);
    this.setForeground(context);
    this.setText(context);
  }
  setText(context) {
    return context
      .append("text")
      .text(this.props.Score)
      .attr("class", "arc")
      .attr("text-anchor", "middle")
      .attr("dy", 27)
      .attr("dx", 12)
      .attr("fill", "blue")
      .attr("font-size", 40);
  }

  setContext() {
    return d3
      .select(this.refs.arc)
      .append("svg")
      .attr("height", 300)
      .attr("width", 300)
      .attr("id", "d3-arc")
      .append("g")
      .attr("transform", `translate(150,150)`);
  }

  setBackground(context) {
    return context
      .append("path")
      .datum({ endAngle: this.tau })
      .style("fill", "#e6e6e6")
      .attr("d", this.arc());
  }

  tau = Math.PI * 2;
  arc() {
    return d3
      .arc()
      .innerRadius(100)
      .outerRadius(110)
      .startAngle(0);
  }

  setForeground(context) {
    return context
      .append("path")
      .datum({ endAngle: this.tau * (this.props.Score / 1000) })
      .style("fill", "#00ff00")
      .attr("d", this.arc());
  }

  render() {
    return (
      <WidgetWrapper>
        <HeaderWrapper>Credit Score</HeaderWrapper>
        <div ref="arc" className="chart-container"></div>
      </WidgetWrapper>
    );
  }
}

const WidgetWrapper = styled.section`
  margin: 0 auto;
  width: 350px;
`;
const HeaderWrapper = styled.div`
  font-size: ${props => props.theme.fontSize.medium};
  font-weight: normal;
  & .chart-container {
    padding: 25px;
  }
`;