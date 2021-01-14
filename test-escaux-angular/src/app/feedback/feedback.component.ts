import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, Notation, Feedback } from '@app/_models';
import { FeedbackService, NotationService, AccountService, AlertService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  @Output() 
  newFeedbackEvent = new EventEmitter<Feedback>();
  @Input()
  readonly: boolean = false;
  defaultRate: number = 5;
  @Input()
  currentRate: number = this.defaultRate;
  @Input()
  note: string = "";
  @Input()
  pk: string;
  @Input()
  fk_user: string;
  @Input()
  browse_link: boolean = true;
  user: User;
  feedbackForm: FormGroup;
  totalNotation: number;
  feedback: Feedback;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private feedbackService: FeedbackService,
    private notationService: NotationService,
    private alertService: AlertService
  ) { 
      this.feedbackForm = this.formBuilder.group({
        note: this.note
      });
      this.user = this.accountService.userValue;
      this.fk_user = this.fk_user || this.user.id;      
  }

  ngOnInit(): void {
    if(this.pk)
    {
      this.feedbackService.getById(this.pk)
        .pipe(first())
        .subscribe({
            next: (x) => {
                this.feedback = x;
            },
            error: error => {
                this.alertService.error(error);
            }
        });
    }

    this.getTotalNotation();
  }

  getTotalNotation(){
    if (this.pk)
    {
      this.notationService.getTotalNotationForFeedback(this.pk)
        .pipe(first())
        .subscribe({
            next: (x) => {
              this.totalNotation = x;
            },
            error: error => {
                this.alertService.error(error);
            }
        });
    }
  }

  onSubmit(feedbackData) {
    feedbackData.rating = this.currentRate;
    feedbackData.fk_user = this.fk_user;

    this.feedbackForm.reset();
    this.currentRate =  this.defaultRate;

    this.feedbackService.create(feedbackData)
        .pipe(first())
                .subscribe({
                    next: (x: any) => {
                        this.alertService.success('Feedback added successfully', { keepAfterRouteChange: true });
                        this.newFeedbackEvent.emit(x.feedback as Feedback);
                    },
                    error: error => {
                        this.alertService.error(error);
                    }
                });
  }

  onNotation(note: number) {
    this.notationService.noteFeedback(this.pk,
                                      {
                                        fk_feedback: this.pk,
                                        fk_user: this.fk_user,
                                        notation: note
                                      })
        .pipe(first())
                .subscribe({
                    next: () => {
                        this.alertService.success('Notation saved successfully', { keepAfterRouteChange: true });
                        this.getTotalNotation();
                    },
                    error: error => {
                        this.alertService.error(error);
                    }
                });
  }
}
