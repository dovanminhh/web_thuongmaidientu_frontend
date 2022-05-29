import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = "http://localhost:8080/";
  
  constructor(private httpClient: HttpClient) { }

  loginCustomer(customer: Customer):Observable<object>{
    console.log(customer);
    return this.httpClient.post(`${this.baseUrl}login`,customer);
  }
  
  getCustomerList(): Observable<Customer[]>{
    return this.httpClient.get<Customer[]>(`${this.baseUrl}` + 'customer');
  }

  createCustomer(customer: Customer): Observable<object>{
    return this.httpClient.post(`${this.baseUrl}` + 'addRegister', customer);
  }

  getCustomerById(id: number): Observable<Customer>{
    return this.httpClient.get<Customer>(`${this.baseUrl}customer/getCustomerById/${id}`)
  }

  deleteCustomer(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl}customer/delete/${id}`);
  }
  
  
}
