import {Injectable} from '@angular/core';

@Injectable()
export class DataService {
  timelineDatas = [
    {'start': 2002, 'end': 2011, 'name': 'Action 3'},
    {'start': 2002, 'end': 2006, 'name': 'Action 4'},
    {'start': 2008, 'end': 2014, 'name': 'Action 5'},
    {'start': 2007, 'end': 2010, 'name': 'Action 6'},
    {'start': 2012, 'end': 2016, 'name': 'Action 7'},
    {'start': 2013, 'end': 2016, 'name': 'Action 9'},
    {'start': 2013, 'end': 2016, 'name': 'Action 10'},
    {'start': 2013, 'end': 2016, 'name': 'Action 11'},

  ];
  stockDatas = [
    {'x': 2001, 'y': 50, 'title': 'Twin towers', 'color': 'green'},
    {'x': 2002, 'y': 15, 'title': 'World cup', 'color': 'red'},
    {'x': 2003, 'y': 16, 'title': '', 'color': 'red'},
    {'x': 2004, 'y': 50, 'title': 'Bush reelection', 'color': 'red'},
    {'x': 2005, 'y': 10, 'title': 'First Tweet', 'color': 'red'},
    {'x': 2006, 'y': 64, 'title': 'Germany World Cup', 'color': 'red'},
    {'x': 2007, 'y': 23, 'title': '', 'color': 'red'},
    {'x': 2008, 'y': 67, 'title': 'Obama President', 'color': 'red'},
    {'x': 2009, 'y': 50, 'title': '', 'color': 'red'},
    {'x': 2010, 'y': 10, 'title': '', 'color': 'red'},
    {'x': 2011, 'y': 64, 'title': '', 'color': 'red'},
    {'x': 2012, 'y': 23, 'title': 'Obama reelection', 'color': 'red'},
    {'x': 2013, 'y': 67, 'title': '', 'color': 'red'},
    {'x': 2014, 'y': 23, 'title': '', 'color': 'red'},
    {'x': 2015, 'y': 67, 'title': '', 'color': 'red'},
    {'x': 2016, 'y': 50, 'title': 'Trump election', 'color': 'red'},
    {'x': 2017, 'y': 10, 'title': '', 'color': 'red'},
    {'x': 2018, 'y': 64, 'title': 'Russia World Cup', 'color': 'red'}
  ];
  personalLifeDatas = [
    {'x': 2004, 'y': 70, 'src': 'https://pbs.twimg.com/profile_images/36850962/steve4_400x400.jpg'},
    {'x': 2007, 'y': 70, 'src': 'https://pbs.twimg.com/profile_images/1146014416/mark-zuckerberg_400x400.jpg'},
    {'x': 2008, 'y': 70, 'src': 'http://ecrannoir.fr/blog/files/2014/02/jamesfrancobyjamesfranco-instagram.jpg'},

    {
      'x': 2010,
      'y': 70,
      'src': 'https://specials-images.forbesimg.com/imageserve/59de682a4bbe6f37dda0566e/416x416.jpg?background=000000&cropX1=995&cropX2=2729&cropY1=78&cropY2=1813'
    },
    {'x': 2011, 'y': 70, 'src': 'https://cdn.24.co.za/files/Cms/General/d/3647/a9d9228d576448bd9d3c30c9f45557b1.jpg'},

    {
      'x': 2013,
      'y': 70,
      'src': 'https://vignette.wikia.nocookie.net/the-football-database/images/f/f7/Neymar.png/revision/latest?cb=20150616054024'
    },
    {'x': 2014, 'y': 70, 'src': 'https://astrolinked.com/media/avatars/644/resized/500/rn.png'},

    {
      'x': 2016,
      'y': 70,
      'src': 'https://yt3.ggpht.com/UEtsxFEfaQrbiuLwyTffygAo-c8piNIpsoA2KbwFGjbLetiVk97i22QuCmWDdGyfhZAr7dcm2shU6C2L4g=s900-mo-c-c0xffffffff-rj-k-no'
    },

    {
      'x': 2018,
      'y': 70,
      'src': 'https://voi.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fprismamedia_people.2F2017.2F06.2F30.2Fc09cd3a6-950c-40d0-8f9d-306c180bd599.2Ejpeg/380x380/quality/80/keanu-reeves.jpg'
    },
  ];

  constructor() {
  }

  /*
   To get Stock and event you have to download datas from
   start-1 and end+1
  */
  getStockDatas(start, end) {
    let result = [];
    let potentialResult = [];
    let isExisting = false;
    let endIsExisting = false;
    this.stockDatas.map(item => {
      if ((item.x > start - 1 && item.x < end + 1) || item.x == start - 1 || item.x == end + 1) {
        isExisting = (item.x === start);
        endIsExisting = (item.x === end);
        potentialResult.push(item);
      }
    });
    if (isExisting == false) {
      let first = [{'x': start, 'y': 20, 'title': '', 'color': 'green'}];
      potentialResult = first.concat(potentialResult);
    }
    result = potentialResult;
    /*
    if(endIsExisting == false){
        let last = [{"x" : end, "y" : 20 , "title" : "", "color" : "green"}];
        result.push(last);
    }
    */
    console.log('RES');
    console.log(result);
    return result;
  }

  getPersonalLifeDatas(start, end) {
    let result = [];
    this.personalLifeDatas.map(item => {
      if (item.x > start && item.x < end) {
        result.push(item);
      }
    });
    return result;
  }

  getTimeLineDatas(start, end) {
    let colors = [];
    let result = [];
    let startingYears = [];
    let r = 0;
    this.timelineDatas.map((item, i) => {
      if (this.inRange(item.start, start, end) || this.inRange(item.end, start, end)) {
        if (i == 0) {
          startingYears.push({start: item.start, end: item.end});
        }
        else {
          r = 0;
          startingYears.map(elt => {
            if (item.start == elt.end && item.end < elt.start) {

            } else {
              r++;
            }
          });
          startingYears.push({start: item.start, end: item.end});
          console.log('start : ' + item.start + ' end : ' + item.end + ' r : ' + r);
        }

        result.push({
          start: item.start,
          end: item.end,
          yt: r,
          name: item.name,
        });
      }
    });
    return {datas: result, r: result.length};
  }

  inRange(x, min, max) {
    return ((x - min) * (x - max) <= 0);
  }
}
