import type { ObjectId } from "https://deno.land/x/mongo@v0.12.1/mod.ts";
import db from "../utils/db";
import {LatLong} from "./lat_long"



export interface Province {
  _id: ObjectId;
  name: string;
  enName: string;
  coordinates: LatLong[];
}

export interface RProvince {
  _id?: 0 | 1;
  name?: 0 | 1;
  enName?: 0 | 1;
  coordinates?: LatLong[];
}

export const provinces = db.collection<Province>("Provinces");
