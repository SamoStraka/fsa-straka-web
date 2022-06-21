import { Component, OnInit } from '@angular/core';
import {Reservation} from "../reservation";
import {ReservationsService} from "../reservations.service";
import {HttpHeaders} from "@angular/common/http";
import {count} from "rxjs";
import {Router} from "@angular/router";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-manage-reservations',
  templateUrl: './manage-reservations.component.html',
  styleUrls: ['./manage-reservations.component.scss']
})
export class ManageReservationsComponent implements OnInit {

  reservations:Reservation[] = []

  constructor(private reservationsService: ReservationsService,
              private router: Router) {
    reservationsService.getAll()
      .subscribe(value => {

        this.reservations = value
      })
  }

  ngOnInit(): void {
  }

  confirmReservation(id: number) {
    let reservation = this.reservations.find((val) =>{
      return val.id == id
    })
    if (reservation != null) {
      reservation.status = 0
      this.reservationsService.edit(reservation)
        .subscribe(value => {
          console.log(value)
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['reservations/manage']);
          });
        })
    }
  }

  declineReservation(id: number) {
    let reservation = this.reservations.find((val) =>{
      return val.id == id
    })
    if (reservation != null) {
      reservation.status = 0
      this.reservationsService.delete(reservation)
        .subscribe(value => {
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['reservations/manage']);
          });
        })
    }
  }

  deleteOldReservations() {
    let today = new Date()
    this.reservations.forEach(reservation => {
      if (reservation.date < formatDate(today, "dd/MM", 'en')) {
        this.reservationsService.delete(reservation)
          .subscribe(value => {
            console.log("deleted")
          })
      }
    })
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['reservations/manage']);
    });
    alert("Staré rezervácie boli odstránené")
  }

}
