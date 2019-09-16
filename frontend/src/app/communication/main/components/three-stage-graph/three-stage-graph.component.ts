import {Component, OnInit, HostListener, AfterContentInit} from '@angular/core';
import * as d3 from 'd3';
import {LifeGraph} from '../../../models/lifegraph';
import {TimelineGraph} from '../../../models/timelinegraph';
import {StockGraph} from '../../../models/stockgraph';
import {DataService} from '../../../services/data.service';
import Swiper from 'swiper';
import {Router} from '@angular/router';
import {StateService} from '../../../services/state.service';

@Component({
  selector: 'app-three-stage-graph',
  templateUrl: './three-stage-graph.component.html',
  styleUrls: ['./three-stage-graph.component.sass']
})
export class ThreeStageGraphComponent implements OnInit, AfterContentInit {
  pgraph: LifeGraph;
  tgraph: TimelineGraph;
  sgraph: StockGraph;
  images: any;
  min: number;
  max: number;
  sgraphData: any;
  pgraphData: any;
  tgraphData: any;
  companies: any;
  activeCompany: number;
  clockMinYear: number;
  clockMaxYear: number;
  public isMenuShow = false;
  fullscreen = true;
  showFiller = false;
  personalSwiper;
  businessSwiper;
  showPersonalLife = false;
  showBusinessLife = false;

  constructor(private dataService: DataService, private state: StateService) {
  }

  ngOnInit() {
    this.clockMinYear = 2009;
    this.clockMaxYear = 2018;
    this.min = 2001;
    this.max = 2006;

    this.companies = ['Google', 'Apple', 'Facebook', 'Amazon', 'Microsoft', 'Intel'];
    this.activeCompany = 0;
    this.pgraph = new LifeGraph('pgraph-container', {top: 20, right: 0, bottom: 20, left: 0}, 200, 1161, 5);
    this.tgraph = new TimelineGraph('tgraph-container', {top: 20, right: 0, bottom: 20, left: 0}, 250, 1161, 5);
    this.sgraph = new StockGraph('sgraph-container', {top: 20, right: 0, bottom: 20, left: 0}, 220, 1161, 5);

    this.initPersonalSwiper();
    this.initBusinessSwiper();

    this.state.showPersonalLife.subscribe(state => {
      this.showPersonalLife = state;
      this.updatePersonalSwiper();
    });

    this.state.showBusinessLife.subscribe(state => {
      this.showBusinessLife = state;
      this.updateBusinessSwiper();
    });
  }

  onClickFullScreen() {
    this.launchIntoFullscreen(document.documentElement); // the whole page
  }

  public showMenu() {
    this.isMenuShow = true;
  }

  public hideMenu() {
    this.isMenuShow = false;
  }

  launchIntoFullscreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }

  ngAfterContentInit() {
    console.log("Called!");
    this.pgraph.draw(this.dataService.getPersonalLifeDatas(this.min, this.max), this.max, this.min);
    this.sgraph.draw(this.dataService.getStockDatas(this.min - 1, this.max + 1), this.max, this.min);
    this.tgraph.draw(this.dataService.getTimeLineDatas(this.min, this.max), this.max, this.min);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log(event.target.innerWidth * 85 / 100);
    this.pgraph.WIDTH = event.target.innerWidth * 85 / 100;
    this.sgraph.WIDTH = event.target.innerWidth * 85 / 100;
    this.tgraph.WIDTH = event.target.innerWidth * 85 / 100;
  }

  setMin(event, value) {
    event.preventDefault();
    event.stopPropagation();
    if (!value && this.min - 1 > 0) { //if false, remove
      this.min--;
      this.ngAfterContentInit();
    } else { //if true Add
      if (this.min + 1 < this.max) {
        this.min++;
        this.ngAfterContentInit();
      }
    }

  }

  setMax(event, value) {
    event.preventDefault();
    event.stopPropagation();
    if (!value && this.max - 1 > 0 && this.max - 1 > this.min) { //if false, remove
      this.max--;
      this.ngAfterContentInit();
    } else { //if true Add
      this.max++;
      this.ngAfterContentInit();
    }
  }

  setCompany(event, value) {
    event.preventDefault();
    event.stopPropagation();
    if (!value) { // Go Up
      if (this.activeCompany > 0) {
        this.activeCompany--;
        this.ngAfterContentInit();
      }
    } else { //Go Down
      if (this.activeCompany + 1 < this.companies.length) {
        this.activeCompany++;
        this.ngAfterContentInit();
      }
    }

  }

  time(event, value) {
    event.preventDefault();
    event.stopPropagation();
    if (value) {
      if (this.clockMaxYear + 10 < 2018) {
        this.clockMaxYear = this.clockMaxYear + 10;
        this.clockMinYear = this.clockMinYear + 10;
      }
    } else {
      if (this.clockMinYear - 10 > 0) {
        this.clockMaxYear = this.clockMaxYear - 10;
        this.clockMinYear = this.clockMinYear - 10;
      }
    }
    this.max = this.clockMaxYear;
    this.min = this.clockMinYear;
    this.ngAfterContentInit();
  }

  initPersonalSwiper() {
    this.personalSwiper = new Swiper('.personalSwiper', {
      init: false,
      speed: 800,
      mode: 'horizontal',
      autoplay: false,
      effect: 'cube',
      observer: true,
      observeParents: true
    });
    this.personalSwiper.init();
  }

  initBusinessSwiper() {
    this.businessSwiper = new Swiper('.businessSwiper', {
      init: false,
      speed: 800,
      mode: 'horizontal',
      autoplay: false,
      effect: 'cube',
      observer: true,
      observeParents: true
    });
    this.businessSwiper.init();
  }

  updatePersonalSwiper() {
    if (this.showPersonalLife) {
      this.personalSwiper.slideTo(1);
    } else {
      this.personalSwiper.slideTo(0);
    }
  }

  updateBusinessSwiper() {
    if (this.showBusinessLife) {
      this.businessSwiper.slideTo(1);
    } else {
      this.businessSwiper.slideTo(0);
    }
  }


}
