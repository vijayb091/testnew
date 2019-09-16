import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class StateService {
  showPersonalLife = new EventEmitter();
  showPersonalState = false;

  showBusinessLife = new EventEmitter();
  showBusinessState = false;

  updatePersonalLife() {
    this.showPersonalLife.emit(!this.showPersonalState);
    this.showPersonalState = !this.showPersonalState;
  }

  updateBusinessLife() {
    this.showBusinessLife.emit(!this.showBusinessState);
    this.showBusinessState = !this.showBusinessState;
  }
}
