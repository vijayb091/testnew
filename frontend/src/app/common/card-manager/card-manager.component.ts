import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-manager',
  templateUrl: './card-manager.component.html',
  styleUrls: ['./card-manager.component.css']
})
export class CardManagerComponent implements OnInit {
  managersData: any[]=["Candidate", "Advisor", "Upload & Download", "Dettaglio"]
 
  @Input() name: string;

  constructor() { }

  ngOnInit() {
  }

}
