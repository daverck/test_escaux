import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { Comment } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class CommentService {
    // private userSubject: BehaviorSubject<User>;
    // public user: Observable<User>;
    public comment: Observable<Comment>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        // this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        // this.user = this.userSubject.asObservable();
    }

    create(comment: Comment) {
      return this.http.post(`${environment.apiUrl}/comments`, comment);
    }

    getAll() {
        return this.http.get<Comment[]>(`${environment.apiUrl}/comments`);
    }

    getAllForFeedback(id: string) {
        return this.http.get<Comment[]>(`${environment.apiUrl}/comments/feedback/${id}`);
    }

    getById(id: string) {
        return this.http.get<Comment>(`${environment.apiUrl}/comments/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/comments/${id}`, params);
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/comments/${id}`);
    }
}