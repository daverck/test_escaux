import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '@app/_models';
import { User } from '@app/_models';
import { CommentService } from '../_services/comment.service';
import { AccountService } from '@app/_services';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.less']
})
export class CommentListComponent implements OnInit {
  user: User;
  list_comment = null;
  @Input()
  feedback_pk: string;

  constructor(public CommentService: CommentService, 
              private accountService: AccountService) { 
    this.user = this.accountService.userValue;
  }

  ngOnInit(): void {
    this.list_comment = this.CommentService.getAllForFeedback(this.feedback_pk);
  }

  commentAdded(x) {
    console.log("called");
    
    this.list_comment = this.CommentService.getAllForFeedback(this.feedback_pk);
  }
}
