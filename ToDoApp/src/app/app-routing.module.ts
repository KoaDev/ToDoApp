import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TaskComponent } from './components/task/task.component';
import { UserComponent } from './components/user/user.component';
import { IsSignedInGuard } from './is-signed-in.guard';

const routes : Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'task',
    component: TaskComponent,
    canActivate: [IsSignedInGuard]
  },
  {
    path: 'list',
    component: ListComponent,
    canActivate: [IsSignedInGuard]
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [IsSignedInGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
