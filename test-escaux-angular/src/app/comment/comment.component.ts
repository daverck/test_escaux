import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, Comment } from '@app/_models';
import { CommentService, NotationService, AccountService, AlertService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.less']
})
export class CommentComponent implements OnInit {
  @Output() 
  newCommentEvent = new EventEmitter<void>();
  @Input()
  readonly: boolean = true;
  @Input()
  comment: string = "";
  @Input()
  pk: string = null;
  @Input()
  fk_feedback: number;
  @Input()
  fk_user: number;
  user: User;
  commentForm: FormGroup;
  comment_: Comment = null;
  
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private commentService: CommentService,
    private notationService: NotationService,
    private alertService: AlertService
  ) { 
      this.commentForm = this.formBuilder.group({
        comment: this.comment
      });
      this.user = this.accountService.userValue;
  }

  ngOnInit(): void {
    if (this.pk !== null)
    {
      this.commentService.getById(this.pk)
      .pipe(first())
      .subscribe({
          next: (x) => {
              this.comment_ = x;
          },
          error: error => {
              this.alertService.error(error);
          }
      });
    }
  }

  onSubmit(commentData) {
    commentData.fk_user = this.user.id;
    commentData.fk_feedback = this.fk_feedback;
    console.log(commentData);

    this.commentForm.reset();

    if (!this.pk) {
      this.commentService.create(commentData)
      .pipe(first())
              .subscribe({
                  next: () => {
                      this.alertService.success('Comment added successfully', { keepAfterRouteChange: true });
                      this.newCommentEvent.emit();
                  },
                  error: error => {
                      this.alertService.error(error);
                  }
              });
      console.warn('Your comment has been submitted', commentData);
    }
    else {
      this.commentService.update(this.pk, commentData)
      .pipe(first())
      .subscribe({
          next: () => {
              this.alertService.success('Update successful', { keepAfterRouteChange: true });
          },
          error: error => {
              this.alertService.error(error);
          }
      });
    }
  }

}
