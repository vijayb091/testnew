import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advisor-customer',
  templateUrl: './advisor-customer.component.html',
  styleUrls: ['./advisor-customer.component.css']
})
export class AdvisorCustomerComponent implements OnInit {
  filters: any;

  constructor() {
  this.filters = [
    { name: 'All' },
    { name: 'Personal Group' },
    { name: 'Personal Group2' },
    { name: 'Personal Group3' },
    { name: 'Personal Group4' }
  ]}

  ngOnInit() {
  }

}
