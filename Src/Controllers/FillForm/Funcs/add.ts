import { ObjectId } from "https://deno.land/x/mongo@v0.12.1/mod.ts";
import { creating, findOne } from "../../../Cfns/index.ts";
import {
  RFillForm,
  FillForm,
  fillForms,
  User,
  users,
  Qr,
  qrs,
  Question,
  questions,
  Poll,
  polls,
  TypeQuestion,
} from "../../../Schemas/index.ts";
import { throwError } from "../../../Utils/Function/index.ts";
import { isAuthFn } from "../../../Utils/Middlewares/index.ts";
import type { details } from "../../../Utils/TypeScript/index.ts";
import { FillFormExtraBody } from "../fill_form.ts";

type FillFormDetails = details<RFillForm, FillForm, FillFormExtraBody>;

export const addingFillForm = async (
  token: string | null,
  details: FillFormDetails
): Promise<Partial<FillForm>> => {
  const user = token
    ? await isAuthFn(token)
    : throwError("your token is empty");

  const createFillForm = async (details: FillFormDetails) => {
    const { askId, qrId, type, option, answer } = details.body!;
    if (type == TypeQuestion.Poll) {
      const foundPoll = await findOne<Poll>({ _id: ObjectId(askId) }, polls);
      if (!foundPoll) {
        throwError("askId not valid");
      }
    } else if (type == TypeQuestion.Question) {
      const foundQuestion = await findOne<Question>(
        { _id: ObjectId(askId) },
        questions
      );
      if (!foundQuestion) {
        throwError("askId not valid");
      }
    } else {
      throwError("type is not valid");
    }
    const foundQr = await findOne<Qr>({ _id: ObjectId(qrId) }, qrs);

    return foundQr
      ? await creating<FillForm>(
          {
            askId: ObjectId(askId),
            option,
            userId: user._id,
            qrId: ObjectId(qrId),
            type:
              type == TypeQuestion.Poll
                ? TypeQuestion.Poll
                : TypeQuestion.Question,
            answer,
          },
          fillForms
        )
      : throwError("we have issue to create the FillForm");
  };

  const genSelected = async (details: FillFormDetails) => {
    return {
      _id: await createFillForm(details),
    };
  };

  return genSelected(details);
};
