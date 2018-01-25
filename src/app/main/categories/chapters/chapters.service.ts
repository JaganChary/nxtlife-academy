import { Injectable } from '@angular/core';
import { CommonHttpService } from '../../shared/commonHttp.service';

@Injectable()
export class ChaptersService {

  constructor(
    private commonHttpService: CommonHttpService
  ) { }

  postChaptersandTopics(data, courseId: number): any {
    return this.commonHttpService.post(`/sa/course/${courseId}/chapter`,data);
  }

}
