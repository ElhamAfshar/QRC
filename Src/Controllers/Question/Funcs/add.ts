import { ObjectId } from "https://deno.land/x/mongo@v0.12.1/mod.ts";
import { creating, findOne } from "../../../Cfns/index.ts";
import {
  questions,
  Question,
  RQuestion,

} from "../../../Schemas/index.ts";
import { throwError } from "../../../Utils/Function/index.ts";
import { isAdminFn, isAuthFn } from "../../../Utils/Middlewares/index.ts";
import type { details } from "../../../Utils/TypeScript/index.ts";
import { QuestionExtraBody } from "../question.ts";


type QuestionDetails = details<RQuestion, Question, QuestionExtraBody>;

export const addingQuestion = async (
  token: string | null,
  details: QuestionDetails
): Promise<Partial<Question>> => {
  const user = token
    ? await isAuthFn(token)
    : throwError("your token is empty");
  const isAdmin = isAdminFn(user);

  const createQuestion = async (details: QuestionDetails) => {
    const { question, order } = details.body!;
    return await creating<Question>({ question, order },questions)
  };

  const genSelected = async (details: QuestionDetails) => {
    return {
      _id: await createQuestion(details),
    };
  };

  return isAdmin?
   await genSelected(details)
    : throwError("you don not have enough permission to do this");
};
