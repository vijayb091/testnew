import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css']
})
export class ManagersComponent implements OnInit {
  items: Number[] = [1,2,3,4,5,6];
  constructor() { }

  ngOnInit() {
  }

}
