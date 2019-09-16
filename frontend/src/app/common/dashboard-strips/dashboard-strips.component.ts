import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-strips',
  templateUrl: './dashboard-strips.component.html',
  styleUrls: ['./dashboard-strips.component.css']
})
export class DashboardStripsComponent implements OnInit {
  items: Number[] = [1,2,3,4];
  constructor() { }

  ngOnInit() {
  }

}
