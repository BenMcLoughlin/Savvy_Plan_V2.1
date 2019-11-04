import * as d3 from "d3"

export const getDivWidth =  (div) =>  {
    var width = d3.select(div)
      // get the width of div element
      .style('width')
      // take of 'px'
      .slice(0, -2)
    // return as an integer
    return Math.round(Number(width))
  }