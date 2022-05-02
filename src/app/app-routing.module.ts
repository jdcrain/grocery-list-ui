import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroceryListComponent } from './components/grocery-list/grocery-list.component'
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/grocery-list', pathMatch: 'full' },
  { path: 'grocery-list', component: GroceryListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/grocery-list' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
