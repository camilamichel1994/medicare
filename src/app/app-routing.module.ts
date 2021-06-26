import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ListComponent as DoctorsListComponent } from './doctors/list/list.component';
import { LoginComponent } from './login/login.component';
import { ListComponent as PatientsListComponent } from './patients/list/list.component';
import { ListComponent as ReportsListComponent } from './reports/list/list.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'doctors', pathMatch: 'full' },
  {
    path: 'doctors',
    component: DoctorsListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'patients',
    component: PatientsListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reports',
    component: ReportsListComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
