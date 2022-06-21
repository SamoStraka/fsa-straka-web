import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { NewReservationComponent } from './new-reservation/new-reservation.component';
import { ContactComponent } from './contact/contact.component';
import { PricingComponent } from './pricing/pricing.component';
import { TimetableComponent } from './timetable/timetable.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ManageReservationsComponent } from './manage-reservations/manage-reservations.component';
import {RouterModule} from "@angular/router";
import { PriceEditComponent } from './price-edit/price-edit.component';
import { CheckFormComponent } from './check-form/check-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    NewReservationComponent,
    ContactComponent,
    PricingComponent,
    TimetableComponent,
    LoginComponent,
    NotFoundComponent,
    ManageReservationsComponent,
    PriceEditComponent,
    CheckFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
