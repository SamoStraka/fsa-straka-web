import { Component, OnInit } from '@angular/core';
import {PriceService} from "../price.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Price} from "../price";

@Component({
  selector: 'app-price-edit',
  templateUrl: './price-edit.component.html',
  styleUrls: ['./price-edit.component.scss']
})
export class PriceEditComponent implements OnInit {

  private id: number;
  valuePrice = 0

  price: Price | undefined

  constructor(private route: ActivatedRoute,
              private priceService: PriceService,
              private router: Router) {
    this.id = Number(route.snapshot.paramMap.get('id'));

    console.log(this.id)
    priceService.get(this.id)
      .subscribe(value => {
        this.price =value;
      })
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.price != null) {
      this.price.price = this.valuePrice
      console.log(this.price)
      this.priceService.edit(this.price)
        .subscribe(() => {
          this.router.navigate(['/pricing'])
          alert("Cena zmenená")
        })
    }

  }

}
