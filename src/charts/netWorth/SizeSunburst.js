let flatData = [
    {
      "name": "TOPICS",
      "parent": null
    },
    {
      "name": "Topic A",
      "size": null,
      "parent": "TOPICS"
    },
    {
      "name": "Sub A1", 
      "size": 15,
      "parent": "Topic A"
    },
    {
      "name": "Sub A2", 
      "size": 14,
      "parent": "Topic A"
    }, 
    {
      "name": "Sub A3", 
      "size": 13,
      "parent": "Topic A"
    },
    {
      "name": "Sub A4", 
      "size": 11,
      "parent": "Topic A"
    },
    {
      "name": "Topic B",
      "size": null,
      "parent": "TOPICS"
    },
    {
      "name": "Sub B1", 
      "size": 8,
      "parent": "Topic B"
    }, 
    {
      "name": "Sub B2", 
      "size": 7,
      "parent": "Topic B"
    }, 
    {
      "name": "Sub B3", 
      "size": 6,
      "parent": "Topic B"
    },
    {
      "name": "Topic C",
      "size": null,
      "parent": "TOPICS"
    },
    {
      "name": "Sub C1", 
      "size": 2,
      "parent": "Topic C"
    }, 
    {
      "name": "Sub C2", 
      "size": 9,
      "parent": "Topic C"
    }
  ]
  
  // Variables
  var width = 500;
  var height = 500;
  var radius = Math.min(width, height) / 2;
  var colorScale = d3.scaleOrdinal(d3.schemeCategory10);
  
  var chartDiv = d3.select('.chartDiv')
  var svgObj = chartDiv.append('svg')
      .attr('width', width)
      .attr('height', height)
  var gObj = svgObj.append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
      .attr('class', 'gWrapper');
  
  // Data strucure
  var pt = d3.partition();
  
  var arcFn = d3.arc()
    .startAngle(d => {
      d.x0s = d.x0; 
      return d.x0
    })
    .endAngle(d => {
      d.x1s = d.x1; 
      return d.x1; 
    })
    .innerRadius(d => d.y0)
    .outerRadius(d => d.y1);
  
  var rootedData = null, sliceEnterData = null;
  
  function makeRoot(data){
    
    // Find data root
    var root = d3.hierarchy(data)
        .sum(d => +d.value || 0)
        .sort((a,b) => b.value - a.value);
  
    // Size arcs
    return pt(root);
  }
  
  function arcTweenPath(a, i) {  
  
    function tween(t) { 
      var b = interp(t);  
      a.x0s = b.x0;  
      a.x1s = b.x1;  
      return arcFn(b);
    }  
  
      var interp = d3.interpolate({ 
        x0: a.x0s, 
        x1: a.x1s 
      }, a);
      
      return tween;
  }
  
  function toggleOrder() {
      // Determine how to size the slices
      if (this.value === "size") {
        rootedData.sum(d => d.value);
      } else {
        rootedData.count();
      }
      rootedData.sort(function(a, b) { return b[this.value] - b[this.value]; }); 
  
      pt(rootedData);
  
      sliceEnterData.selectAll("path")
        .transition()
        .duration(1350)
        .ease(d3.easeElastic)
        //attrTween docs
      //https://github.com/d3/d3-transition#transition_attrTween
        .attrTween("d", arcTweenPath);
      sliceEnterData.selectAll("text")
        .transition()
        .duration(1350)
        .ease(d3.easeElastic)
        .attrTween("transform", arcTweenText);
  
  }
  
  
  function buildChart(data){
      //stratify data
      let stratData = d3.stratify()
  
          //set the 'id' of each 'node'
          .id(d => d.name)
  
          //set the parentID accesor of each 'node'
          .parentId(d => d.parent)
          
          //apply the data to the stratify
          (data)
  
          //calcs sum of 'parent' nodes
          .sum(d => +d.size || 0)
        
      pt.size([Math.PI * 2, radius]);
      
      rootedData = makeRoot(stratData);
      
       // Add a <g> element for each node in thd data, then append <path> elements and draw lines based on the arc
      // variable calculations. Last, color the lines and the slices.
      let sliceDataJoin = gObj.selectAll('g')
        .data(rootedData.descendants());
      
      sliceEnterData = sliceDataJoin.enter()
        .append('g')
        .attr("class", "sliceGWrapper")
      
      let singlePath = sliceEnterData.append('path')
        .attrs({
          "display": d => d.depth ? null : "none",
          "d": arcFn,
          'class':'singlePath'
        })
        .style('stroke', '#fff')
        .style("fill", function (d) { 
          let dOrParent = d.children ? d : d.parent;
          
          return colorScale((d.children ? d : d.parent).data.id); 
        });
  
      d3.selectAll(".sizeSelect").on("click", toggleOrder);
  }
  
  buildChart(flatData)