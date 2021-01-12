import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { FeedbackComponent } from '../feedback/feedback.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeedbackService } from '../_services/feedback.service';
import { Feedback } from '../_models/feedback';
import { User } from '@app/_models';
import { AccountService } from '@app/_services';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.scss']
})
export class FeedbackListComponent implements OnInit {
  user: User;
  list_feedback: Observable<Feedback[]> = null;

  constructor(public FeedbackService: FeedbackService, 
              private accountService: AccountService) { 
      this.user = this.accountService.userValue;
  }

  ngOnInit(): void {
    this.list_feedback = this.FeedbackService.getAll()
    // this.FeedbackService.getAll()
    //   .pipe(first())
    //   .subscribe(list_feedback => this.list_feedback = list_feedback);
  }

}
