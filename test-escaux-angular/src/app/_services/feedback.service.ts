import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { Feedback } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class FeedbackService {
    // private userSubject: BehaviorSubject<User>;
    // public user: Observable<User>;
    public feedback: Observable<Feedback>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        // this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        // this.user = this.userSubject.asObservable();
    }

    create(feedback: Feedback) {
      return this.http.post(`${environment.apiUrl}/feedbacks`, feedback);
    }

    getAll() {
        return this.http.get<Feedback[]>(`${environment.apiUrl}/feedbacks`);
    }

    getById(id: string) {
        return this.http.get<Feedback>(`${environment.apiUrl}/feedbacks/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/feedbacks/${id}`, params);
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/feedbacks/${id}`);
    }
}