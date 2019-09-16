import {Component, OnInit, Input, HostListener, AfterContentInit} from '@angular/core';
import * as moment from 'moment';
import Swiper from 'swiper';
import { JqueryService } from '../../helper/jquery.service';
import { YearService } from '../../helper/year.service';
import {DataService} from '../services/data.service';
import * as d3 from "d3";
import { LifeGraph } from '../models/lifegraph';
import { TimelineGraph } from '../models/timelinegraph';
import { StockGraph } from '../models/stockgraph';
import {StateService} from '../services/state.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./user.component.sass']
})
export class MainComponent implements OnInit {
  public firstYearSwiper;
  public firstYearArray = [];
  public isSettingClick = false;
  public isClickOnYear = false;

  public clockSwiper;

  public secondSwiper;
  public secondYearArray = [];

  public companySwiper;
  public year: any = {};
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
  constructor(
    public jqueryService: JqueryService,
    public yearService: YearService,
    public dataService: DataService,
    private state: StateService
  ) {}

  ngOnInit() {
    this.year.maxYear = moment().year();
    this.initFirstSwiper();
    this.initSecondYearSwiper();
    this.initClockSwiper();
    this.initCompanySwiper();

    this.clockMinYear = 2009;
    this.clockMaxYear = 2018;
    this.min = 2001;
    this.max = 2006;

    this.companies = ['Google', 'Apple', 'Facebook', 'Amazon', 'Microsoft', 'Intel'];
    this.activeCompany = 0;
    this.pgraph = new LifeGraph('pgraph-container', {top : 20, right : 0, bottom : 20, left : 0}, 200, 1161, 5);
    this.tgraph = new TimelineGraph('tgraph-container', {top : 20, right : 0, bottom : 20, left : 0}, 250, 1161, 5);
    this.sgraph = new StockGraph('sgraph-container', {top : 20, right : 0, bottom : 20, left : 0}, 220, 1161, 5);

  }

  public clickOnYear() {
    if (this.isClickOnYear) {
      this.isClickOnYear = false;
      this.yearService.clickOnYear(false);
    } else {
      this.yearService.clickOnYear(true);
      this.isClickOnYear = true;
    }
  }


  public initFirstSwiper() {
    this.firstYearSwiper = new Swiper('.firstYearSwiper', {
      init: false,
      loop: false,
      speed: 800,
      slidesPerView: 1,
      loopAdditionalSlides: 100,
      mode: 'horizontal',
      autoplay: false,
      effect: 'cube',
      observer: true,
      observeParents: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
    });
    this.firstYearSwiper.on('init', () => {
      for (let i = 1950; i <= moment().year(); i++) {
        this.firstYearArray.push(i);
        this.secondYearArray.push(i);
      }
    });
    this.firstYearSwiper.init();
    this.firstYearSwiper.on('slideChange', () => {
      this.yearService.firstYear(this.firstYearSwiper.activeIndex);
    });
  }

  public initClockSwiper() {
    this.clockSwiper = new Swiper('.clockSwiper', {
      init: false,
      loop: true,
      speed: 800,
      mode: 'horizontal',
      autoplay: false,
      effect: 'cube',
      observer: true,
      observeParents: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
    });
    this.clockSwiper.on('init', () => {});
    this.clockSwiper.init();
    this.clockSwiper.on('slideNextTransitionStart', () => {
      const duration = this.secondSwiper.activeIndex - this.firstYearSwiper.activeIndex;
      if (duration >= 0) {
        this.firstYearSwiper.slideTo(this.secondSwiper.activeIndex + 1);
        this.secondSwiper.slideTo(this.firstYearSwiper.activeIndex + duration);
      } else {
        // TODO: add notification for plase select true year
      }
    });
    this.clockSwiper.on('slidePrevTransitionStart', () => {
      const duration = this.secondSwiper.activeIndex - this.firstYearSwiper.activeIndex;
      if (duration >= 0) {
        this.secondSwiper.slideTo(this.secondSwiper.activeIndex - duration - 1);
        this.firstYearSwiper.slideTo(this.firstYearSwiper.activeIndex - duration - 1);
      } else {
        // TODO: add notification for plase select true year
      }
    });
  }

  public initSecondYearSwiper() {
    this.secondSwiper = new Swiper('.secondSwiper', {
      init: false,
      loop: false,
      speed: 800,
      mode: 'horizontal',
      autoplay: false,
      effect: 'cube',
      observer: true,
      observeParents: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
    });
    this.secondSwiper.on('init', () => {
      this.secondSwiper.slideTo(this.firstYearSwiper.activeIndex + 4);
    });
    this.secondSwiper.init();
    this.secondSwiper.on('slideChange', () => {
      this.yearService.secondYear(this.secondSwiper.activeIndex);
    });
  }

  public initCompanySwiper() {
    this.companySwiper = new Swiper('.companySwiper', {
      init: false,
      loop: true,
      speed: 800,
      direction: 'vertical',
      autoplay: false,
      effect: 'cube',
      observer: true,
      observeParents: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
    });
    this.companySwiper.on('init', () => {});
    this.companySwiper.on('slideChange', () => {
      this.yearService.changeCompanySwiper();
    });
    this.companySwiper.init();
  }

  onClickFullScreen()
  {

    this.launchIntoFullscreen(document.documentElement); // the whole page
  }
  public showMenu() {
    this.isMenuShow = true;
  }
  public hideMenu() {
    this.isMenuShow = false;
  }

  launchIntoFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }

  updatePersonalState() {
    this.state.updatePersonalLife();
  }

  updateBusinessState() {
    this.state.updateBusinessLife();
  }
}
