import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { FeedbackBrowseComponent } from './feedback-browse/feedback-browse.component';
import { AuthGuard } from './_helpers';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'feedback-list', component: FeedbackListComponent, canActivate: [AuthGuard] },
    { path: 'feedback-browse/:id', component: FeedbackBrowseComponent, canActivate: [AuthGuard] },
    // { path: 'feedback-browse', component: FeedbackBrowseComponent, canActivate: [AuthGuard] },
    { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }