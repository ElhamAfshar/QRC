import type { ObjectId } from "https://deno.land/x/mongo@v0.12.1/mod.ts";

export interface LatLong {
  lat: string;
  long: string;
}

export interface City {
  _id: ObjectId;
  name: string;
  enName: string;
}
