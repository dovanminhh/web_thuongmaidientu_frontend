import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetail } from '../models/order-detail';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  private baseUrl = "http://localhost:8080/";
  constructor(private httpClient: HttpClient) { }

  getOrderDetailList(): Observable<OrderDetail[]>{
    return this.httpClient.get<OrderDetail[]>(`${this.baseUrl}` + 'orderDetail');
  }
  createOrderDetail(orderDetail: OrderDetail): Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}` +'orderDetail/' + 'addOrderDetail', orderDetail);
  }
}
