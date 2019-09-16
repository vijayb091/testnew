import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {
    GridComponent,
    GridDataResult,
    DataStateChangeEvent
} from '@progress/kendo-angular-grid';

import { SortDescriptor } from '@progress/kendo-data-query';

import { CategoriesService } from '../../common/northwind.service';
@Component({
  selector: 'app-personal-plan',
  templateUrl: './personal-plan.component.html',
  styleUrls: ['./personal-plan.component.css']
})
export class PersonalPlanComponent implements OnInit {

  public view: Observable<GridDataResult>;
  public sort: Array<SortDescriptor> = [];
  public pageSize = 10;
  public skip = 0;

  @ViewChild(GridComponent) grid: GridComponent;

  constructor(private service: CategoriesService) { }

  public ngOnInit(): void {
      // Bind directly to the service as it is a Subject
      this.view = this.service;

      // Fetch the data with the initial state
      this.loadData();
  }

  public dataStateChange({ skip, take, sort }: DataStateChangeEvent): void {
      // Save the current state of the Grid component
      this.skip = skip;
      this.pageSize = take;
      this.sort = sort;

      // Reload the data with the new state
      this.loadData();
  }

  public ngAfterViewInit(): void {
      // Expand the first row initially
      this.grid.expandRow(0);
  }

  private loadData(): void {
      this.service.query({ skip: this.skip, take: this.pageSize, sort: this.sort });
  }


}
