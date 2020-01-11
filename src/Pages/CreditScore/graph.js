import React, { Component } from "react";
import * as d3 from "d3";

export default class Section422 extends Component {
  componentDidMount() {
    const dims = { height: 300, width: 300, radius: 150 };
    const cent = { x: dims.width / 2 + 5, y: dims.height / 2 + 5 };

    this.drawArc(dims, cent);
  }
  drawArc(dims, cent) {
    const svg = d3
      .select(this.refs.canvas)
      .append("svg")
      .attr("width", dims.width + 150)
      .attr("height", dims.height + 150);
  }

  render() {
    return <div ref="canvas">hello</div>;
  }
}