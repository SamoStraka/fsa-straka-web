import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Discount} from "./discount";
import {Reservation} from "./reservation";

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Discount[]>('https://fsa-straka-api.azurewebsites.net/api/discounts');
  }

  get(id: number) {
    return this.http.get<Discount>(`https://fsa-straka-api.azurewebsites.net/api/discounts/${id}`);
  }

  add(discount: Discount) {
    return this.http.post<number>('https://fsa-straka-api.azurewebsites.net/api/discounts', discount)
  }
}
