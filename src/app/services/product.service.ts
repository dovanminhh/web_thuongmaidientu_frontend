import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private baseUrl = "http://localhost:8080/rest/admin/";

  constructor(private httpClient: HttpClient) { }

  getCategoryesList(): Observable<Category[]>{
    return this.httpClient.get<Category[]>(`${this.baseUrl}` + 'category');
  }

  getProductList(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.baseUrl}` + 'product');
  }

  createProduct(formData: FormData): Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}` + 'product/' + 'addProduct', formData);
  }

  getProductById(id: number): Observable<Product>{
    return this.httpClient.get<Product>(`${this.baseUrl}product/productById/${id}`);
  }

  updateProduct(id: number, product: Product): Observable<Object>{
    return this.httpClient.put(`${this.baseUrl}product/update/${id}`, product);
  }

  deleteProduct(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl}product/delete/${id}`);
  }
  
  getProductByCategoryId(categoryId: any): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.baseUrl}getProductByCategory/${categoryId}`);
  }

  findProductByName(name: any): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.baseUrl}product/${name}`);
  }

  paginate(pageNo: any, pageSize: any): Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl}product?pageNo=${pageNo}&pageSize=${pageSize}`);
  }
  
  findNewProduct(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.baseUrl}` + 'product' + '/findNewProduct');
  }
  findByPriceBetween(min: number, max: number,): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.baseUrl}product/${min}/${max}`);
  }
  findBestSalePrice(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.baseUrl}` + 'product' + '/sale_price');
  }
  findByHomeProduct(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.baseUrl}` + 'product' + '/new-home');
  }
  
}
