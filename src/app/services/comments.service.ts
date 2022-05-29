import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comments } from '../models/comments';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  
  private baseUrl = "http://localhost:8080/rest/admin/";

  constructor(private htttpClient: HttpClient) { }

  getCommentsList(): Observable<Comments[]>{
    return this.htttpClient.get<Comments[]>(`${this.baseUrl}` + 'comments');
  }

  createComments(comments: Comments): Observable<Object>{
    return this.htttpClient.post(`${this.baseUrl}` + 'comments' + '/addComments', comments);
  }

  getCommentsById(id: number): Observable<Comments>{
    return this.htttpClient.get<Comments>(`${this.baseUrl}comments/commentsById/${id}`);
  }

  updateComments(id: number, comments: Comments): Observable<object>{
    return this.htttpClient.put(`${this.baseUrl}comments/update-comments/${id}`, comments);
  }
  getCommentsByProduct(id: number): Observable<any>{
    return this.htttpClient.get<any>(`${this.baseUrl}comments/commentsByProduct/${id}`);
  }

}
