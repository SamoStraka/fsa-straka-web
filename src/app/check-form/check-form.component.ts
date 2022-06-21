import { Component, OnInit } from '@angular/core';
import {ReservationsService} from "../reservations.service";
import {Reservation} from "../reservation";

@Component({
  selector: 'app-check-form',
  templateUrl: './check-form.component.html',
  styleUrls: ['./check-form.component.scss']
})
export class CheckFormComponent {

  valueMail: string = ""
  reservations: Reservation[] = []
  found:boolean = true

  constructor(private reservationsService: ReservationsService) { }


  submit() {
    if (this.valueMail == "") {
      return
    }
    this.reservationsService.getByMail(this.valueMail)
      .subscribe(value => {
        this.reservations = value
        if (value.length == 0) {
          this.found = false
          setInterval(() => {
            this.found = true;
          }, 3000)
        }

      })
  }
}
