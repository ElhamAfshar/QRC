import type { ObjectId } from "https://deno.land/x/mongo@v0.12.1/mod.ts";
import db from "../Utils/Config/db.ts";
import { LatLong } from "./lat_long.ts";

export interface District {
  _id: ObjectId;
  name: string;
  enName: string;
  coordinates: LatLong[];
  cityId: ObjectId;
}

export interface RDistrict {
  _id?: 0 | 1;
  name?: 0 | 1;
  enName?: 0 | 1;
  coordinates?: 0 | 1;
  cityId?: 0 | 1;
}

export const districts = db.collection<District>("Districts");
