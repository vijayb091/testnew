import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GridDataResult, GridComponent, PageChangeEvent } from '@progress/kendo-angular-grid';

import { ProductsService } from '../northwind.service';
import { SortDescriptor } from '@progress/kendo-data-query';
@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {

   @Input() public category: any;

  public view: Observable<GridDataResult>;
  public skip = 0;
  public sort: Array<SortDescriptor> = [];
  public pageSize = 10;
  constructor(private service: ProductsService) { }

  public ngOnInit(): void {
      this.view = this.service;
    this.view.subscribe(
      data => console.log(data)
    );
      /*load products for the given category*/
      this.service.query({ skip: this.skip, take: this.pageSize, sort: this.sort });
  }

  public pageChange({ skip, take }: PageChangeEvent): void {
      this.skip = skip;
      // this.service.queryForCategory(this.category, { skip, take });
  }
  public onTabSelect(e) {
    
  }

}



