import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../dtos/product';
import {Observable} from 'rxjs';

export const MAIN_URL = 'http://localhost:8080';
const URL = '/api/v1/products';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }

  saveProduct(product: Product): Observable<boolean> {
    console.log('product Service');
    return this.http.post<boolean>(MAIN_URL + URL, product);
  }
}
