import * as d3 from "d3";
import { Graph } from "./graph";

export class LifeGraph extends Graph{
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
        this.WIDTH = parseInt(d3.select('.pgraph-container').style('width'), 10);
        this.svg = d3.select(".pgraph-container")
            .append("svg")
            .attr("height",this.HEIGHT - this.MARGINS.bottom)
            .attr("width",this.WIDTH - this.MARGINS.left - this.MARGINS.right);
        
        this.ticksNumber = ticksNumber;
    }

    draw(datas,max,min){
        if(this.svg != null){
            this.svg.remove();
        }
        this.svg = d3.select(".pgraph-container")
            .append("svg")
            .attr("height",this.HEIGHT - this.MARGINS.bottom)
            .attr("width",this.WIDTH - this.MARGINS.left - this.MARGINS.right);
        
        this.xRange = d3.scaleLinear()
        .range([this.MARGINS.left, this.WIDTH - this.MARGINS.right])
          .domain([min,max + 1]);
          this.yRange = d3.scaleLinear()
          .range([this.HEIGHT - this.MARGINS.top + 250, this.MARGINS.bottom])
          .domain([70 + 1,
            70
          ]);
        let xAxis = d3.axisBottom()
            .scale(this.xRange)
            .ticks((max - min + 1))
            .tickFormat(d3.format("d"))
            .tickSize(this.MARGINS.bottom + 10);
        this.svg.append("rect")
            .attr("width",this.WIDTH - this.MARGINS.left - this.MARGINS.right)
            .attr("height",this.MARGINS.bottom + 10)
            .style("fill","#cccccc")
            .attr("x", this.MARGINS.left)
            .attr("y", (this.HEIGHT - this.MARGINS.bottom - this.MARGINS.top - 10));
        let xAxisg = this.svg.append("svg:g")
            .attr("class", "xaxis")
            .attr("transform", "translate(0," + (this.HEIGHT - this.MARGINS.bottom - this.MARGINS.top - 10) + ")")
            .call(xAxis);

            xAxisg.selectAll(".tick text")
            .attr("x",(this.xRange(2) - this.xRange(1)) / 2)
            .attr("y", this.MARGINS.bottom / 2)
            .style("font-size",10)
            .style("text-anchor", "middle");
            xAxisg.selectAll("path")
            .style("display","none");
            xAxisg.selectAll("line")
            .attr("stroke","#fff");

            let decalage = (this.xRange(2) - this.xRange(1)) / 2;
            var defs = this.svg.append("svg:defs");
            var p = this;
            datas.slice(this.index,this.index+5).forEach(function(d,i){
    
              let length = 120;
                let v = 20;
              let circleStroke = p.svg.append("circle")
              .attr("cx",p.xRange(d.x) + decalage)
              .attr("cy", p.yRange(d.y) + p.MARGINS.top + v)
              .attr("r",v + 5)
              .attr("stroke","#cccccc")
              .attr("fill","none")
              .attr("stroke-width",2);
              let indicator = p.svg.append("svg:g");
              indicator.append("circle")
              .attr("r","3")
              .attr("cx",p.xRange(d.x) + decalage)
              .attr("cy", p.yRange(d.y) + v + v + 40 )
              .attr("fill","#333");
              indicator.append("line")
              .attr("stroke","#333")
              .attr("x1",p.xRange(d.x) + decalage)
              .attr("x2",p.xRange(d.x) + decalage)
              .attr("y1",p.yRange(d.y) + v + v + 40)
              .attr("y2",p.yRange(d.y) + length);          
              indicator.append("circle")
                .attr("r","2")
                .attr("cx",p.xRange(d.x) + decalage)
                .attr("cy", p.yRange(d.y) + length )
                .attr("fill","#333");
              indicator.append("circle")
                .attr("r","2")
                .attr("cx",p.xRange(d.x) + decalage - 10)
                .attr("cy", p.yRange(d.y) + length)
                .attr("fill","#333");
              indicator.append("circle")
                .attr("r","2")
                .attr("cx",p.xRange(d.x) + decalage + 10)
                .attr("cy", p.yRange(d.y) + length)
                .attr("fill","#333");
    
              defs.append("svg:pattern")
                .attr("id","img"+i)
                .attr("width",1)
                .attr("height",1)
                .append("svg:image")
                .attr("xlink:href",d.src)
                .attr("width",v*2)
                .attr("height",v*2);
    
                let content = p.svg.append("circle")
                .attr("cx",p.xRange(d.x) + decalage)
                .attr("cy", p.yRange(d.y) + p.MARGINS.top + v)
                .attr("r",v)
                .style("fill","url(#img"+ i +")");
            });
    
         
    }
}