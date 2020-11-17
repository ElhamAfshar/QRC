import type { ObjectId } from "https://deno.land/x/mongo@v0.12.1/mod.ts";
import db from "../Utils/Config/db.ts";
import { LatLong } from "./lat_long.ts";

export interface Center {
  _id: ObjectId;
  name: string;
  telphoneNumber: string;
  address: string;
  coordinate: LatLong;
  isLegal: boolean;
  agent?: ObjectId | null;
  image?: string;
}

export interface RCenter {
  _id?: 0 | 1;
  name?: 0 | 1;
  telphoneNumber?: 0 | 1;
  addrress?: 0 | 1;
  coordinate?: 0 | 1;
  isLegal?: 0 | 1;
  agent?: 0 | 1;
  Image?: 0 | 1;
}

export const centers = db.collection<Center>("Centers");
