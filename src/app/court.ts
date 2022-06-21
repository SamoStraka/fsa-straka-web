import {CourtType} from "./court-type";

export interface Court {
  id: number;
  order: number;
  courtType: CourtType
}
