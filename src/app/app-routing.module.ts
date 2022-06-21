import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AboutComponent} from "./about/about.component";
import {NewReservationComponent} from "./new-reservation/new-reservation.component";
import {PricingComponent} from "./pricing/pricing.component";
import {ContactComponent} from "./contact/contact.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {LoginComponent} from "./login/login.component";
import {UserGuard} from "./user.guard";
import {ManageReservationsComponent} from "./manage-reservations/manage-reservations.component";
import {PriceEditComponent} from "./price-edit/price-edit.component";
import {CheckFormComponent} from "./check-form/check-form.component";

const routes: Routes = [
  {path:'about', component: AboutComponent},
  {path:'reservations/new', component: NewReservationComponent},
  {path:'reservations/manage', component: ManageReservationsComponent, canActivate: [UserGuard]},
  {path:'reservations/check', component: CheckFormComponent},
  {path:'pricing', component: PricingComponent},
  {path:'pricing/:id/edit', component: PriceEditComponent, canActivate: [UserGuard]},
  {path:'contact', component: ContactComponent},
  {path:'login', component: LoginComponent},
  {path:'', redirectTo: 'about', pathMatch: 'full'},
  {path:'**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
