import { Component, OnInit } from '@angular/core';
import {Court} from "../court";
import {ActivatedRoute, Router} from "@angular/router";
import {ReservationsService} from "../reservations.service";
import {CourtsService} from "../courts.service";
import {formatDate} from "@angular/common";
import {PriceService} from "../price.service";
import {Price} from "../price";
import {Discount} from "../discount";
import {DiscountService} from "../discount.service";
import {Reservation} from "../reservation";

@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.scss']
})
export class NewReservationComponent{

  courts: Court[] = []
  prices: Price[] = []
  discounts: Discount[] = []
  times = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
  dates:String[] = []
  lengths = [1, 2, 3]
  valueCourt: string = "1"
  val: string = "1"
  valueDiscount: string = ""

  valueDate: string = ""
  valueTime: string = ""
  valueLength: string = ""
  valueMail: string = ""

  private discountPercentage = 0
  light:boolean = false
  showDiscount = true;
  badInput = false;
  price: number = 0

  constructor(private route: ActivatedRoute,
              private courtsService: CourtsService,
              private priceService: PriceService,
              private discountService: DiscountService,
              private reservationsService: ReservationsService,
              private router: Router) {
    courtsService.getAll()
      .subscribe(value => {
        value.forEach(val => {
          this.courts.push(val)
        })
      })

    priceService.getAll()
      .subscribe(value => {
        value.forEach(val => {
          this.prices.push(val)
        })
      })

    discountService.getAll()
      .subscribe(value => {
        value.forEach(val => {
          this.discounts.push(val)
        })
      })

    let day = new Date()
    this.dates[0] = formatDate(day, "dd/MM", 'en')
    this.dates[1] = formatDate(day.setDate(day.getDate() + 1), "dd/MM", 'en')
    this.dates[2] = formatDate(day.setDate(day.getDate() + 1), "dd/MM", 'en')
    this.dates[3] = formatDate(day.setDate(day.getDate() + 1), "dd/MM", 'en')
    this.dates[4] = formatDate(day.setDate(day.getDate() + 1), "dd/MM", 'en')
  }

  valChange() {
    this.val = (this.valueCourt.substring(0 ,this.valueCourt.indexOf(".")))
    this.calcPrice()
  }

  calcPrice() {
    let court = this.courts[Number(this.valueCourt.substring(0, this.valueCourt.indexOf(" ")))]
    let today = new Date()
    let typeOfDay = 0

    console.log(this.light)

    // vikend
    if ((today.getDay() + Number(this.valueDate.substring(0, 2)) - Number(formatDate(today, "dd", 'en'))) % 7 == 0
    || (today.getDay() + Number(this.valueDate.substring(0, 2)) - Number(formatDate(today, "dd", 'en'))) % 7 == 6){
      typeOfDay = 2
    } else {
      typeOfDay = 1
    }

    this.prices.forEach(value => {
      if (value.typeOfDay.id == typeOfDay && value.courtType.id == court.courtType.id) {
        this.price = value.price
      }
    })

    if (this.valueDate != "") {
      this.price *= Number(this.valueLength.substring(0, this.valueLength.indexOf(" ")))
      if (this.light) {
        this.price += 1
      }
      this.price *= (1 - this.discountPercentage/100.0)
      this.price = Math.round(this.price * 100) / 100
    } else {
      this.price = 0
    }
  }

  submitDiscount(form: any) {
    if(form.invalid){
      return
    }
    this.discounts.forEach(value => {
        if (value.code == this.valueDiscount) {
          this.discountPercentage = value.percentage
          this.showDiscount = false
        }
    })
    this.calcPrice()
  }

  submit(form: any) {
    if(form.invalid){
      return
    }

    let newId = 0
    this.valueTime = this.valueTime.substring(0, this.valueTime.indexOf(":"))

    if (Number(this.valueTime) + Number(this.valueLength.substring(0, this.valueLength.indexOf(" "))) > 22) {
      this.badInput = true
      setInterval(() => {
        this.badInput = false;
      }, 2000)
      return;
    }

    this.reservationsService.getAll()
      .subscribe(value => {
        newId = 0

        value.forEach(val => {
          if (val.date == this.valueDate &&
          val.court.id == Number(this.valueCourt.substring(0, this.valueCourt.indexOf(" "))) &&
            !(val.timeStart >= Number(this.valueTime) + Number(this.valueLength.substring(0, this.valueLength.indexOf(" ")))  || val.timeStart + val.length <=  Number(this.valueTime))){
            this.badInput = true
            setInterval(() => {
              this.badInput = false;
            }, 2000)
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this.router.navigate(['reservations/manage']);
            });
          }
          if (val.id > newId) {
            newId = val.id
          }
        })
        if (!this.badInput) {
          let newReservation: Reservation = {
            id: newId + 1,
            timeStart: Number(this.valueTime),
            length: Number(this.valueLength.substring(0, this.valueLength.indexOf(" "))),
            date: this.valueDate,
            mail: this.valueMail,
            price: Math.round((this.price + Number.EPSILON) * 100) / 100,
            status: 1,
            court: this.courts[Number(this.valueCourt.substring(0, this.valueCourt.indexOf(" "))) - 1],
            light: this.light
          }

          this.reservationsService.add(newReservation)
            .subscribe((response) => {
              alert("Rezervácia bola pridaná")
            })
        }
      })

  }
}
