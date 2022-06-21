import { Component, OnInit } from '@angular/core';
import {PriceService} from "../price.service";
import {Price} from "../price";
import {Observable} from "rxjs";
import {User} from "../user";
import {UserService} from "../user.service";

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  prices: Price[] = []
  user$: Observable<User | undefined>;
  constructor(private priceService: PriceService,
              private userService: UserService) {
    priceService.getAll()
      .subscribe(value => {
        value.forEach(val => {
          this.prices.push(val)
        })
      })
    this.user$ = userService.onUserChange();
  }

  ngOnInit(): void {
  }

}
