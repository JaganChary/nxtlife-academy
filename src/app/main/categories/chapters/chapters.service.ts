import { Injectable } from '@angular/core';
import { CommonHttpService } from '../../shared/commonHttp.service';

@Injectable()
export class ChaptersService {

  topicId: number;
  topic: any;
  constructor(
    private commonHttpService: CommonHttpService
  ) { }

  deleteChapter(id: number): any {
    return this.commonHttpService.delete(`/sa/chapter/${id}`);
  }

  editChapter(id: number, data: any) {
    return this.commonHttpService.put(`/sa/chapter/${id}`, data);
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

  storeTopic(topic: any): any {
    this.topic = topic;
    console.log(this.topic);
  }

  getTopic(): any {
    return this.topic;
  }

  getTopicId(): any {
    return this.topicId;
  }

  postTemplate(topicId: number, data): any {
    return this.commonHttpService.post(`/sa/topic/${topicId}/pages`, data);
  }

  addTopic(data, chapterId: number): any {
    return this.commonHttpService.post(`/sa/chapter/${chapterId}/topic`, data);
  }

  updateTopic(topicId: number, data): any {
    return this.commonHttpService.put(`/sa/topic/${topicId}`, data);
  }

  getRecord(topicId: Number, template: any, recordId: Number): any {
    return this.commonHttpService.get(`/sa/topic/${topicId}/template/${template}/record/${recordId}`);
  }

  createFormData(object: Object, form?: FormData, namespace?: string): FormData {
    const formData = form || new FormData();
    for (let property in object) {
      if (!object.hasOwnProperty(property) || !object[property]) {
        continue;
      }
      let formKey;
      if (Array.isArray(object)) {
        formKey = namespace ? `${namespace}[${property}]` : property;
      } else {

        formKey = namespace ? `${namespace}.${property}` : property;
      }

      if (object[property] instanceof Date) {
        formData.append(formKey, object[property].toISOString());
      } else if (typeof object[property] === 'object' && !(object[property] instanceof File)) {
        this.createFormData(object[property], formData, formKey);
      } else {
        formData.append(formKey, object[property]);
      }
    }
    return formData;
  }
}
