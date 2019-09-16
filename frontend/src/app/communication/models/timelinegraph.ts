import * as d3 from 'd3';
import {Graph} from './graph';

export class TimelineGraph extends Graph {

  public svg?: any;
  public WIDTH?: number;
  public HEIGHT?: number;
  public MARGINS?: { top: 0, right: 0, bottom: 0, left: 0 };
  public xRange?: any;
  public yRange?: any;
  public ticksNumber?: number;
  public shift?: number;
  public index?: number;
  public selector?: string;
  public bar_height: number;

  constructor(selector, margins, height, width, ticksNumber) {
    super();
    this.index = 0;
    this.selector = selector;
    this.MARGINS = margins;
    this.HEIGHT = height;
    this.WIDTH = parseInt(d3.select('.' + this.selector).style('width'), 10);
    this.svg = d3.select('.' + this.selector)
      .append('svg')
      .attr('height', this.HEIGHT - this.MARGINS.bottom)
      .attr('width', this.WIDTH - this.MARGINS.left - this.MARGINS.right);
    this.ticksNumber = ticksNumber;
    this.bar_height = 30;
  }

  getData(datas) {
    let xc = [];
    datas.map(item => {
      if (typeof item.start != 'undefined' && item.start != null && item.start != '' && typeof item.end != 'undefined' && item.end != null && item.end != '') {
        xc.push({
          start: item.start,
          end: item.end,
          yt: item.yt,
          name: item.name,
        });
      }
    });
    return xc;
  }

  draw(values, max, min) {
    let datas = values.datas;
    let rowsNumber = values.r;

    console.log(rowsNumber);

    let interval = max - min + 1;
    if (this.svg != null) {
      this.svg.remove();
    }
    this.svg = d3.select('.' + this.selector)
      .append('svg')
      .attr('height', this.HEIGHT - this.MARGINS.bottom)
      .attr('width', this.WIDTH - this.MARGINS.left - this.MARGINS.right);
    /**
     * xRange
     */
    this.xRange = d3.scaleLinear()
      .range([this.MARGINS.left, this.WIDTH - this.MARGINS.right])
      .domain([min, max + 1]);
    /**
     * yRange
     */
    this.yRange = d3.scaleLinear()
      .range([this.HEIGHT - this.MARGINS.bottom, 0])
      .domain([rowsNumber + 5, 0]);

    /**
     * xAxis
     */
    let xAxis = d3.axisBottom()
      .scale(this.xRange)
      .ticks(interval)
      .tickFormat(d3.format('d'))
      .tickSize(this.MARGINS.bottom + 10);
    this.svg.append('rect')
      .attr('width', this.WIDTH - this.MARGINS.left - this.MARGINS.right)
      .attr('height', this.MARGINS.bottom + 10)
      .style('fill', '#cccccc')
      .attr('x', this.MARGINS.left)
      .attr('y', (this.HEIGHT - this.MARGINS.bottom - this.MARGINS.top - 10));
    let xAxisg = this.svg.append('svg:g')
      .attr('class', 'xaxis')
      .attr('fill', 'blue')
      .attr('transform', 'translate(0,' + (this.HEIGHT - this.MARGINS.bottom - this.MARGINS.top - 10) + ')')
      .call(xAxis);

    xAxisg.selectAll('.tick text')
      .attr('x', (this.xRange(2) - this.xRange(1)) / 2)
      .attr('y', this.MARGINS.bottom / 2)
      .style('font-size', 10)
      .style('text-anchor', 'middle');
    xAxisg.selectAll('path')
      .style('display', 'none');
    xAxisg.selectAll('line')
      .attr('stroke', '#fff');


    let decalage = (this.xRange(2) - this.xRange(1)) / 2;
    let p = this;


    let dropShadowFilter = this.svg.append('svg:filter')
      .attr('id', 'dropshadow')
      .attr('filterUnits', 'userSpaceOnUse')
      .attr('width', '250%')
      .attr('height', '250%');
    dropShadowFilter.append('svg:feGaussianBlur')
      .attr('in', 'SourceGraphic')
      .attr('stdDeviation', 1)
      .attr('result', 'blur-out');
    dropShadowFilter.append('svg:feColorMatrix')
      .attr('in', 'blur-out')
      .attr('type', 'saturate')
      .attr('values', 0)
      .attr('result', 'color-out');
    dropShadowFilter.append('svg:feOffset')
      .attr('in', 'color-out')
      .attr('dx', 1)
      .attr('dy', 3)
      .attr('result', 'the-shadow');
    dropShadowFilter.append('svg:feBlend')
      .attr('in', 'SourceGraphic')
      .attr('in2', 'the-shadow')
      .attr('mode', 'normal');


    datas.forEach(data => {
      if (typeof data.start != 'undefined' && data.start != '') {
        console.log('hello ' + p.xRange(data.start));
      }
    });
    let lineFunction = d3.line()
      .x(function (d) {
        return d.x;
      })
      .y(function (d) {
        return d.y;
      })
      .curve(d3.curveLinear);


    let xc = this.getData(datas);
    let dots = [];
    let lines = [];
    let texts = [];
    if (xc.length > 0) {
      xc.forEach(d => {
        let r = 2;
        let cxC = 0;
        let test = 0;
        /*
        let cyC = (p.bar_height * this.yRange(d.yt + 1));
        let cyCC = (p.bar_height * this.yRange(d.yt));
        */
        let cyC = this.yRange(d.yt + 1);
        let cyCC = this.yRange(d.yt);
        let xy = [
          {x: p.xRange(d.start), y: cyCC}, {x: p.xRange(d.end), y: cyCC},
          {x: p.xRange(d.end) - 10, y: cyC + test}, {x: p.xRange(d.start) + 10, y: cyC + test},
        ];


        if (((d.start > min && d.start < max) && (d.end > min && d.end < max)) || ((d.start == min) && (d.end > min && d.end < max)) || ((d.start == min) && (d.end == max)) || ((d.start > min && d.start < max) && (d.end == max))) {
          cxC = (p.xRange(d.start) + p.xRange(d.end)) / 2;
        } else if (((d.start > min && d.start < max) || (d.start == min)) && (d.end > max)) {
          cxC = (p.xRange(d.start) + p.xRange(max + 1)) / 2;
        } else if ((d.start < min) && ((d.end > min && d.end < max) || (d.end == max))) {
          cxC = (p.xRange(min) + p.xRange(d.end)) / 2;
        } else if ((d.start == max) && (d.end > max)) {
          cxC = (p.xRange(max) + p.xRange(max + 1)) / 2;
        } else if (d.start < min && d.end == min) {
          cxC = p.xRange(-10000);
        }
        dots.push({cx: cxC - (2 * r) - 5, cy: cyC + 5, r: r});
        dots.push({cx: cxC, cy: cyC + 5, r: r});
        dots.push({cx: cxC + (2 * r) + 5, cy: cyC + 5, r: r});
        dots.push({cx: cxC, cy: cyC + 30, r: r * 2});

        p.svg.append('path')
          .attr('d', lineFunction(xy))
          .attr('fill', 'hsl(' + Math.random() * 360 + ',100%,50%)')
          .attr('filter', 'url(#dropshadow)');

        let line = {x2: cxC, y2: cyC + 30, x1: cxC, y1: cyC + 5};
        lines.push(line);
        let text = {name: d.name, x: cxC, y: cyC + 50};
        texts.push(text);

      });
    }

    if (dots.length > 0) {
      p.svg.selectAll('.circle')
        .data(dots)
        .enter()
        .append('circle')
        .attr('r', function (d) {
          return d.r;
        })
        .attr('cx', function (d) {
          return d.cx;
        })
        .attr('cy', function (d) {
          return d.cy;
        })
        .attr('fill', 'black');
    }
    if (lines.length > 0) {
      p.svg.selectAll('.line')
        .data(lines)
        .enter()
        .append('line')
        .attr('x1', function (d) {
          return d.x1;
        })
        .attr('y1', function (d) {
          return d.y1;
        })
        .attr('x2', function (d) {
          return d.x2;
        })
        .attr('y2', function (d) {
          return d.y2;
        })
        .attr('stroke-width', 1)
        .attr('stroke', 'black');
    }
    if (texts.length > 0) {
      p.svg.selectAll('.name')
        .data(texts)
        .enter()
        .append('text')
        .text(function (d) {
          return d.name;
        })
        .attr('x', function (d) {
          return d.x;
        })
        .attr('y', function (d) {
          return d.y;
        })
        .attr('text-anchor', 'middle')
        .style('font-size', '10px')
        .style('fill', '#000000')
        .style('font-weight', 'bold')
        .style('text-transform', 'uppercase');
    }
  }

}
