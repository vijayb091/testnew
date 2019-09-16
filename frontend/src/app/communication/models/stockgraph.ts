import { Graph } from "./graph";
import * as d3 from 'd3';
import { LinearGradient } from "@progress/kendo-drawing";
export class StockGraph extends Graph{
    public svg? : any;
    public WIDTH? : number;
    public HEIGHT? : number;
    public MARGINS? : { top : 0, right : 0, bottom : 0, left : 0 };
    public xRange? : any;
    public yRange? : any;
    public ticksNumber? : number;
    public shift? : number;
    public index? : number;
    public selector? : string;
    constructor(selector,margins,height,width,ticksNumber){
        super();
        this.index = 0;
        this.selector = selector;
        this.MARGINS = margins;
        this.HEIGHT = height;
        this.WIDTH = parseInt(d3.select('.'+this.selector).style('width'), 10);
        this.svg = d3.select("."+this.selector)
            .append("svg")
            .attr("height",this.HEIGHT - this.MARGINS.bottom - this.MARGINS.top)
            .attr("width",this.WIDTH - this.MARGINS.left - this.MARGINS.right);
        this.ticksNumber = ticksNumber;
    }

    draw(datas, max,min){
        if(this.svg != null){
            this.svg.remove();
        }
        
        this.svg = d3.select("."+this.selector)
            .append("svg")
            .attr("height",this.HEIGHT)
            .attr("width",this.WIDTH - this.MARGINS.left - this.MARGINS.right);
            this.xRange = d3.scaleLinear()
            .range([this.MARGINS.left, this.WIDTH - this.MARGINS.right])
              .domain([min,max + 1]);
             
        this.yRange = d3.scaleLinear()
            .range([this.HEIGHT - this.MARGINS.bottom - this.MARGINS.top, this.MARGINS.bottom + this.MARGINS.top])
            .domain([d3.min(datas, function (d) {
                return d.y;
            }),
            d3.max(datas, function (d) {
                return d.y;
            }) - 1
            ]);
        let p = this;
        let decalage = (this.xRange(2) - this.xRange(1)) / 2;
        let lineFunc = d3.line()
        .x(function (d) {
          return p.xRange(d.x) + decalage;
        })
        .y(function (d) {
          return p.yRange(d.y)
        })
        .curve(d3.curveMonotoneX);

        let area = d3.area()
        .x(function (d) {
          return p.xRange(d.x)+ decalage;
        })
        .y0(p.HEIGHT + p.MARGINS.bottom + p.MARGINS.top)
        .y1(function (d) {
          return p.yRange(d.y)
        })
        .curve(d3.curveMonotoneX);

        this.svg.append("svg:path")
          .attr("d", area(datas))
          .attr("class", "area")
          .attr("fill","#ccc");

        this.svg.append("svg:path")
        .attr("d", lineFunc(datas))
        .attr("class", "line")
        .attr("stroke","#666")
        .attr("stroke-width","2")
        .attr("fill","none");
        
        this.svg.selectAll(".titles")
        .data(datas)
        .enter()
          .append("text")
          .attr("class","titles")
          .attr("x",function(d,i){ return p.xRange(d.x) + ( p.xRange(d.x + 1) -  p.xRange(d.x)) / 2; })
          .attr("y",function(d){ return p.yRange(d.y) - 10; })
          .text(function(d){ return d.title })
          .attr("text-anchor","middle")
          .style("font-size","10px")
          .style("fill","#000000")
          .style("font-weight","bold")
          .style("text-transform","uppercase");

        this.svg.selectAll(".curve-dots")
        .data(datas)
        .enter()
            .append("circle")
            .attr("class","curve-dots")
            .attr("cx",function(d){ return p.xRange(d.x) + decalage;  })
            .attr("cy",function(d){ return p.yRange(d.y); })
            .attr("r",5)
            .style("fill","#666")
            .style("stroke","#fff")

    }
}