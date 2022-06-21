import {CourtType} from "./court-type";
import {TypeOfDay} from "./type-of-day";

export interface Price {
  id: number;
  price: number;
  courtType: CourtType;
  typeOfDay: TypeOfDay
}
