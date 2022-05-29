import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = "http://localhost:8080/";

  constructor(private httpClient: HttpClient) { }

  getOrderList(): Observable<Order[]>{
    return this.httpClient.get<Order[]>(`${this.baseUrl}` + 'order');
  }

  createOrder(order: Order): Observable<Order>{
    return this.httpClient.post<Order>(`${this.baseUrl}` +'order/' + 'addOrder', order);
  }
  getOrderById(id: number): Observable<Order>{
    return this.httpClient.get<Order>(`${this.baseUrl}order/orderById/${id}`)
  }
  getOrderByCustomerId(customer_id: any): Observable<Order[]>{
    return this.httpClient.get<Order[]>(`${this.baseUrl}order/orderByCustomer/${customer_id}`);
  }
}
