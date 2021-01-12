import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { Notation } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class NotationService {
    // private userSubject: BehaviorSubject<User>;
    // public user: Observable<User>;
    public notation: Observable<Notation>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        // this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        // this.user = this.userSubject.asObservable();
    }

    create(notation: Notation) {
      return this.http.post(`${environment.apiUrl}/notations`, notation);
    }

    noteFeedback(id, params) {
      return this.http.post(`${environment.apiUrl}/notations/feedback/${id}`, params);
    }

    getAll() {
        return this.http.get<Notation[]>(`${environment.apiUrl}/notations`);
    }

    getAllForFeedback(id: string) {
        return this.http.get<Notation[]>(`${environment.apiUrl}/notations/feedback/${id}`);
    }

    getTotalNotationForFeedback(id: string) {
        return this.http.get<number>(`${environment.apiUrl}/notations/feedback/${id}/total`);
    }

    getById(id: string) {
        return this.http.get<Notation>(`${environment.apiUrl}/notations/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/notations/${id}`, params);
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/notations/${id}`);
    }
}