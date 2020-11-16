import { ObjectId } from "https://deno.land/x/mongo@v0.12.1/ts/types.ts";
import db from "../Utils/Config/db.ts";
import { LatLong, Poll, Question } from "./index.ts";
export interface Qr {
  _id: ObjectId;
  districtId: ObjectId;
  centerId: Object;
  coordinate?: LatLong;
  subject: string;
  discription: string;
  image?: string;
  file?: string;
  ritchText?: string;
  polls?: Poll[];
  questions?: Question[];
  latLong?: LatLong; //????
}

export interface RQr {
  _id?: 0 | 1;
  districtId?: 0 | 1;
  cenetrId?: 0 | 1;
  coordinate?: 0 | 1;
  subject?: 0 | 1;
  discription?: 0 | 1;
  image?: 0 | 1;
  file?: 0 | 1;
  ritchText?: 0 | 1;
  polls?: 0 | 1;
  question?: 0 | 1;
  latLong?: 0 | 1;
}

export const qrs = db.collection<Qr>("Qrs");
