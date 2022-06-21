import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Price} from "./price";
import {Reservation} from "./reservation";

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Price[]>('https://fsa-straka-api.azurewebsites.net/api/prices');
  }

  get(id: number) {
    return this.http.get<Price>(`https://fsa-straka-api.azurewebsites.net/api/prices/${id}`);
  }

  edit(price: Price) {
    return this.http.put<void>(`https://fsa-straka-api.azurewebsites.net/api/prices/${price.id}`, price)
  }
}
