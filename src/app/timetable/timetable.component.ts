import {Component, Inject, Input, OnInit, SimpleChanges} from '@angular/core';
import {DOCUMENT, formatDate} from "@angular/common";
import {ReservationsService} from "../reservations.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Reservation} from "../reservation";

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent{

  nextDays = [["", ""], ["", ""], ["", ""], ["", ""], ["",""]]
  private days = ["Ned", "Pon", "Uto", "Str", "Štv", "Pia", "Sob"]
  times = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
  private reservations:Reservation[] = []
  events = ["9-18/06", "10-18/06"]

  @Input()
  courtId :string = "";

  constructor(private route: ActivatedRoute,
              private reservationsService: ReservationsService) {
      reservationsService.getAll()
        .subscribe(value => {
            this.reservations = value
            value.forEach(val => {
              if (Number(this.courtId) == val.court.id) {
                for (let i = 0; i < val.length; i++){
                  this.events.push((Number(val.timeStart) + i) + "-" + val.date)
                }
              }
            })
        })

    let day = new Date()
    this.nextDays[0] = [this.days[day.getDay()], formatDate(day, "dd/MM", 'en')]
    this.nextDays[1] = [this.days[(day.getDay() + 1) % 7], formatDate(day.setDate(day.getDate() + 1), "dd/MM", 'en')]
    this.nextDays[2] = [this.days[(day.getDay() + 1) % 7], formatDate(day.setDate(day.getDate() + 1), "dd/MM", 'en')]
    this.nextDays[3] = [this.days[(day.getDay() + 1) % 7], formatDate(day.setDate(day.getDate() + 1), "dd/MM", 'en')]
    this.nextDays[4] = [this.days[(day.getDay() + 1) % 7], formatDate(day.setDate(day.getDate() + 1), "dd/MM", 'en')]

  }

  ngOnChanges(changes: any) {
    this.courtId = changes.courtId.currentValue
    this.events = []
    this.reservations.forEach(val => {
      if (Number(this.courtId) == val.court.id) {
        for (let i = 0; i < val.length; i++){
          this.events.push((Number(val.timeStart) + i) + "-" + val.date)
        }
      }
    })
  }

}
