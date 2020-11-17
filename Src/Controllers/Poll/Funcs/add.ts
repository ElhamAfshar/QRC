import { ObjectId } from "https://deno.land/x/mongo@v0.12.1/mod.ts";
import { creating, findOne } from "../../../Cfns/index.ts";
import {
  polls,
  Poll,
  RPoll,
 
} from "../../../Schemas/index.ts";
import { throwError } from "../../../Utils/Function/index.ts";
import { isAdminFn, isAuthFn } from "../../../Utils/Middlewares/index.ts";
import type { details } from "../../../Utils/TypeScript/index.ts";
import { PollExtraBody } from "../poll.ts";

type PollDetails = details<RPoll, Poll, PollExtraBody>;

export const addingPoll = async (
  token: string | null,
  details: PollDetails
): Promise<Partial<Poll>> => {
  const user = token
    ? await isAuthFn(token)
    : throwError("your token is empty");
  const isAdmin = isAdminFn(user);

  const createPoll = async (details: PollDetails) => {
  const { question, order, multiAnswer, answer } = details.body!;
  return await creating<Poll>({ question, order, multiAnswer, answer },polls )
  }
  const genSelected = async (details: PollDetails) => {
    return {
      _id: await createPoll(details),
    };
  };

  return isAdmin ? await genSelected(details)
  : throwError("you don not have enough permission to do this");
};
