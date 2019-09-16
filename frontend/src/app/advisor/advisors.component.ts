import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advisors',
  templateUrl: './advisors.component.html',
  styleUrls: ['./advisors.component.css']
})
export class AdvisorsComponent implements OnInit {
  customeri: string = 'Customer';
  prospect: string = 'Prospect';
  upload: string = 'Upload & Download';
  grouppi: string = 'Personalizza Gruppi';
  detail: string = 'Dettaglio';
  viewSection: any = 'customeri';

  constructor() { 
  }

  ngOnInit() {
  }

  view(data: string){
    this.viewSection = data;
  }

}
