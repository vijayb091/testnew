import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'app-dettaglio',
  templateUrl: './dettaglio.component.html',
  styleUrls: ['./dettaglio.component.css']
})
export class DettaglioComponent implements OnInit {

  barData: any[] = [30, 86, 168, 281, 303, 365];
  pieData: any[] =  [
                        {"platform": "Android", "percentage": 40.11}, 
                        {"platform": "Windows", "percentage": 36.69},
                        {"platform": "iOS", "percentage": 13.06}
                    ];
  svgWidth: number;
  svgHeight: number;
  radius: any;
  svg: any;
  g: any;
  color: any;
  pie: any;
  path: any;
  arc: any;

  constructor() { }

  ngOnInit() {

    d3.select(".chart")
      .selectAll("div")
      .data(this.barData)
        .enter()
        .append("div")
        .style("width", function(d) { return d + "px"; })
        .text(function(d) { return d; });

        this.svgWidth = 500;
        this.svgHeight = 300;
        this.radius =  Math.min(this.svgWidth, this.svgHeight) / 2;
        var svg = d3.select('svg')
            .attr("width", this.svgWidth)
            .attr("height", this.svgHeight);
        
        //Create group element to hold pie chart    
        var g = svg.append("g")
            .attr("transform", "translate(" + this.radius + "," + this.radius + ")") ;
        
        var color = d3.scaleOrdinal(d3.schemeCategory10);
        
        var pie = d3.pie().value(function(d) { 
            return d.percentage; 
        });
        
        var path = d3.arc()
            .outerRadius(this.radius)
            .innerRadius(0);
        
        var arc = g.selectAll("arc")
            .data(pie(this.pieData))
            .enter()
            .append("g");
        
        arc.append("path")
            .attr("d", path)
            .attr("fill", function(d) { return color(d.data.percentage); });
                
        var label = d3.arc()
            .outerRadius(this.radius)
            .innerRadius(0);
                    
        arc.append("text")
            .attr("transform", function(d) { 
                return "translate(" + label.centroid(d) + ")"; 
            })
            .attr("text-anchor", "middle")
            .text(function(d) { return d.data.platform+":"+d.data.percentage+"%"; });

    }

}
