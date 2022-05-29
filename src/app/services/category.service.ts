import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = "http://localhost:8080/rest/admin/";

  constructor(private httpClient: HttpClient) { }

  getCategoryesList(): Observable<Category[]>{
    return this.httpClient.get<Category[]>(`${this.baseUrl}` + 'category');
  }

  createCategory(category: Category): Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}` + 'addCategory', category);
  }

  getCategoryById(id: number): Observable<Category>{
    return this.httpClient.get<Category>(`${this.baseUrl}categoryById/${id}`);
  }

  updateCategory(id: number, category: Category): Observable<object>{
    return this.httpClient.put(`${this.baseUrl}update/${id}`, category);
  }

  deleteCategory(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl}delete/${id}`);
  }

  findCategoryByName(name: any): Observable<Category[]>{
    return this.httpClient.get<Category[]>(`${this.baseUrl}category/${name}`);
  }
  
}
