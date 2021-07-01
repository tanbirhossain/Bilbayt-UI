import { ProfileComponent } from './Components/profile/profile.component';
import { LoginComponent } from './Components/login/login.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { CustomPreloadingService } from './custom-preloading.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "registration", component: RegistrationComponent },
  { path: "login", component: LoginComponent },
  { path: "", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "**", component: RegistrationComponent },
];

@NgModule({
  // tslint:disable-next-line:max-line-length
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: CustomPreloadingService, scrollPositionRestoration: 'enabled', onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
