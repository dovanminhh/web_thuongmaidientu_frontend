import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Comments } from 'src/app/models/comments';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  commentes: Comments [] = [];
  
  constructor(private commentsService: CommentsService ,private router: Router,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getCommentsList();
  }

  public getCommentsList(){
    this.commentsService.getCommentsList().subscribe(
      (response: Comments[]) => {
        this.commentes = response;
      }
    )
  }
  updateStatusComments(id: number){
    this.commentsService.getCommentsById(id).subscribe(
      data =>{
        if(data.status == 0){
          data.status = 1
          this.commentsService.updateComments(id,data).subscribe(
            res => {
              this.ngOnInit();
            }
          )
        }else{
          data.status = 0
          this.commentsService.updateComments(id,data).subscribe(
            res => {
              this.ngOnInit();
            }
          )
        }

      }
    )
  }

  updateComments(id: number){}

  deleteComments(id: number){}

  pageChangeEvent(event: number){}
}
