import { ObjectId } from "https://deno.land/x/mongo@v0.12.1/ts/types.ts";
import db from "../Utils/Config/db.ts";

//question with multiple answer
export interface Poll {
  _id: ObjectId;
  question: string;
  Order: number;
  multiAnswer: boolean;
  answer: string[];
}

export interface RPoll {
  _id?: 0 | 1;
  question?: 0 | 1;
  order?: 0 | 1;
  multiAnswer?: 0 | 1;
  answer?: 0 | 1;
}

export const polls = db.collection<Poll>("Polls");
