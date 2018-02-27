import { Injectable } from '@angular/core';
import { CommonHttpService } from '../../../shared/commonHttp.service';

@Injectable()
export class TemplatesService {

  topicId: any;
  constructor(
    
    private commonHttpService: CommonHttpService,
  ) { }

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
