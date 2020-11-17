import { ObjectId } from "https://deno.land/x/mongo@v0.12.1/ts/types.ts";
import db from "../Utils/Config/db.ts";

export enum TypeQuestion {
  Poll = "Poll",
  Question = "Question",
}

export interface FillForm {
  _id: ObjectId;
  askId: ObjectId;
  userId: ObjectId;
  qrId: ObjectId;
  type: TypeQuestion;
  option: string[];
  answer: string;
}

export interface RFillForm {
  _id: 0 | 1;
  askId?: 0 | 1;
  userId?: 0 | 1;
  qrId?: 0 | 1;
  type?: 0 | 1;
  option?: 0 | 1;
  answer?: 0 | 1;
}

export const fillForms = db.collection<FillForm>("FillForms");
