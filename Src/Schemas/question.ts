import { ObjectId } from "https://deno.land/x/mongo@v0.12.1/ts/types.ts";
import db from "../Utils/Config/db.ts";

export interface Question {
  _id: ObjectId;
  question: string;
  order: number;
}

export interface RQuestion {
  _id?: 0 | 1;
  question?: 0 | 1;
  order?: 0 | 1;
}

export const questions = db.collection<Question>("Questions");
