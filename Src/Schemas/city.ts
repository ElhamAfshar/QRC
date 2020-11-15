import type { ObjectId } from "https://deno.land/x/mongo@v0.12.1/mod.ts";
import db from "../Utils/DbConfig/db.ts";
import { LatLong } from "./lat_long.ts";

export interface City {
  _id: ObjectId;
  name: string;
  enName: string;
  coordinates: LatLong[];
  provinceId: ObjectId;
}

export interface RCity {
  _id?: 0 | 1;
  name?: 0 | 1;
  enName?: 0 | 1;
  coordinates?: 0 | 1;
  provinceId?: 0 | 1;
}
export const cities = db.collection<City>("Cities");
