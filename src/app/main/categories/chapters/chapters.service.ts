import { Injectable } from '@angular/core';
import { CommonHttpService } from '../../shared/commonHttp.service';

@Injectable()
export class ChaptersService {

  topicId: number;
  constructor(
    private commonHttpService: CommonHttpService
  ) { }

  deleteChapter(id: number): any {
    return this.commonHttpService.delete(`/sa/chapter/${id}`);
  }

  deleteTopic(id: number): any {
    return this.commonHttpService.delete(`/sa/topic/${id}`);
  }

  postChaptersandTopics(data, courseId: number): any {
    return this.commonHttpService.post(`/sa/course/${courseId}/chapter`,data);
  }

  storeTopicId(id: number): any {
    this.topicId = id;
    console.log(id);
  }

  getTopicId(): any {
    return this.topicId;
  }

  postTemplate(topicId: number, data): any {
    return this.commonHttpService.post(`/sa/topic/${topicId}/pages`, data);
  }
}
