import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';


@Injectable()
export class ProgressBarService {

  currentLoaderStatus: ReplaySubject<boolean> = new ReplaySubject<boolean>();

  constructor() { }

  public startProgressBar(): any {
    console.log('start');
    this.currentLoaderStatus.next(true);
  }

  public endProgressBar(): any {
    console.log('stop');
    this.currentLoaderStatus.next(false);
  }
}

