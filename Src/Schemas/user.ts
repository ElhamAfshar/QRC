import type { ObjectId } from "https://deno.land/x/mongo@v0.12.1/mod.ts";

import db from "../Utils/DbConfig/db.ts";

export enum Gender {
  Male = "Male",
  Female = "Female",
}

export enum Level {
  Normal = "Normal",
  Admin = "Admin",
  Ghuest = "Ghuest",
}

export interface User {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  nationalCode?: string;
  phoneNumber: string;
  email?: string;
  image?: string;
  gender: Gender;
  level: Level[];
  isActive: boolean;
}
export interface RUser {
  _id: 0 | 1;
  firtsName?: 0 | 1;
  lastName?: 0 | 1;
  phoneNumber?: 0 | 1;
  gender?: 0 | 1;
  nationalCode?: 0 | 1;
  level?: 0 | 1;
  email?: 0 | 1;
  isActive?: 0 | 1;
}

export const users = db.collection<User>("Users");
