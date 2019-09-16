import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advisor-prospect',
  templateUrl: './advisor-prospect.component.html',
  styleUrls: ['./advisor-prospect.component.css']
})
export class AdvisorProspectComponent implements OnInit {
  filters: any;

  constructor() {
    this.filters = [
      { name: 'All' },
      { name: 'Personal Group' },
      { name: 'Personal Group2' },
      { name: 'Personal Group3' },
      { name: 'Personal Group4' }
    ]
  }
  ngOnInit() {
  }

}
