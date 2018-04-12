import { Component, OnInit } from '@angular/core';
import { ProgressBarService } from './main/shared/progress-bar.service';
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    public progressBarService: ProgressBarService,
    public ngProgress: NgProgress
  ) { }

  ngOnInit() {
    this.progressBarService.currentLoaderStatus.asObservable()
      .subscribe((res: boolean) => {
        console.log(res);
        if (res === true) {
          this.ngProgress.start();
        } else {
          this.ngProgress.done();
        }
      }, (err: any) => {
        console.log(err);
      });
  }

}
