import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Court} from "./court";

@Injectable({
  providedIn: 'root'
})
export class CourtsService {

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Court[]>('https://fsa-straka-api.azurewebsites.net//api/courts');
  }

  get(id: number) {
    return this.http.get<Court>(`https://fsa-straka-api.azurewebsites.net//api/courts/${id}`);
  }
}
