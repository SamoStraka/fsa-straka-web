import {Court} from "./court";

export interface Reservation {
  id: number;
  timeStart: number;
  length: number;
  date: string;
  mail: string;
  price: number;
  status: number;
  court: Court;
  light: boolean
}
