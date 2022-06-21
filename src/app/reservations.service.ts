import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Reservation} from "./reservation";

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Reservation[]>('https://fsa-straka-api.azurewebsites.net/api/reservations');
  }

  get(id: number) {
    return this.http.get<Reservation>(`https://fsa-straka-api.azurewebsites.net/api/reservations/${id}`);
  }

  getByMail(mail: string) {
    return this.http.get<Reservation[]>(`https://fsa-straka-api.azurewebsites.net/api/reservations/?email=${mail}`);
  }

  add(reservation: Reservation) {
    return this.http.post<number>('https://fsa-straka-api.azurewebsites.net/api/reservations', reservation)
  }

  delete(reservation: Reservation) {
    return this.http.delete<void>(`https://fsa-straka-api.azurewebsites.net/api/reservations/${reservation.id}`);
  }

  edit(reservation: Reservation) {
    return this.http.put<void>(`https://fsa-straka-api.azurewebsites.net/api/reservations/${reservation.id}`, reservation)
  }
}
