import { Injectable } from '@angular/core';
import { CommonHttpService } from '../../../shared/commonHttp.service';

@Injectable()
export class TemplatesService {

  constructor(
    private commonHttpService: CommonHttpService

  ) { }

  postTemplateOne(topicId, data): any {
    this.commonHttpService.post('/sa/topic/{topicId}/pages', data);
  }

}
