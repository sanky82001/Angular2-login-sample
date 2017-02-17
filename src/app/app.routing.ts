import { Routes, RouterModule } from '@angular/router';
import { AdminComponent }  from './app.admin';
import { UserComponent }  from './app.user';

const appRoutes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'user', component: UserComponent }
];

export const routing = RouterModule.forRoot(appRoutes);
