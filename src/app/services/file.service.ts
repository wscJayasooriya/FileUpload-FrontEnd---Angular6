import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent} from '@angular/common/http';

export const MAIN_URL = 'http://localhost:8080';
const URL = 'api/v1/products/upload';

@Injectable()
export class FileService {

  uploadedPercentage = 0;

  constructor(private http: HttpClient) {}


  uploadFile(formData: FormData) {
    console.log('product Service');
    this.http.post(MAIN_URL + URL, formData, {reportProgress: true, observe: 'events'}).subscribe(
      (event: HttpEvent<any>) => {
        if (event.type === 1) {
          if (Math.round(this.uploadedPercentage) !== Math.round(event['loaded'] / event['total'] * 100)) {
            this.uploadedPercentage = event['loaded'] / event['total'] * 100;
            console.log(Math.round(this.uploadedPercentage));
          }
        }
      }
    );
  }
}
