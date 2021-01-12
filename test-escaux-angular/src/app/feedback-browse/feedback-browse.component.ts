import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User, Feedback, Comment, Notation } from '@app/_models';
import { FeedbackService, AccountService, AlertService } from '@app/_services';


@Component({
  selector: 'app-feedback-browse',
  templateUrl: './feedback-browse.component.html',
  styleUrls: ['./feedback-browse.component.less']
})
export class FeedbackBrowseComponent implements OnInit {
  id: string;
  feedback: Feedback;
  user: User;
  commentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private feedbackService: FeedbackService,
    private accountService: AccountService,
    private alertService: AlertService
) {
  // this.feedbackForm = this.formBuilder.group({
  //   note: this.note
  // });
  this.user = this.accountService.userValue;
}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.feedbackService.getById(this.id)
                .pipe(first())
                .subscribe({
                  next: (x) => {
                      this.feedback = x;
                      // this.alertService.success('Feedback added successfully', { keepAfterRouteChange: true });
                      // this.router.navigate(['../'], { relativeTo: this.route });
                  },
                  error: error => {
                      this.alertService.error(error);
                      // this.loading = false;
                  }
              });
  }

}
