import type { Context } from "https://deno.land/x/oak/mod.ts";
import { Poll, RPoll } from "../../Schemas/index.ts";
import { throwError } from "../../Utils/Function/index.ts";
import { myBodies, Reply } from "../../Utils/TypeScript/index.ts";
import { addingPoll } from "./Funcs/add.ts";

export interface PollExtraBody {
}

export const poll = async ({ response, request }: Context) => {
  try {
    if (!request.hasBody) throwError("No data provided");

    const body = request.body({ type: "json" });

    const reply: Reply<Poll> = {
      success: true,
      body: [],
    };

    const {
      wants,
      details,
    }: myBodies<RPoll, Poll, PollExtraBody> = await body.value;
    const token = request.headers.get("token");
    switch (wants) {
      case "create":
        reply.body = [await addingPoll(token, details)];
        break;

      default:
        throwError("must be choose what you want's");
        break;
    }
    response.status = 201;
  } catch (error) {
    response.status = 500;
    response.body = {
      susses: false,
      error: error.message || "something is wrong",
    };
  }
};
