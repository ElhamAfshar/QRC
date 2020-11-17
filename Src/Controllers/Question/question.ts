import type { Context } from "https://deno.land/x/oak/mod.ts";
import { Question, RQuestion } from "../../Schemas/index.ts";
import { throwError } from "../../Utils/Function/index.ts";
import { myBodies, Reply } from "../../Utils/TypeScript/index.ts";
import { addingQuestion } from "./Funcs/add.ts";


export interface QuestionExtraBody {
}

export const question = async ({ response, request }: Context) => {
  try {
    if (!request.hasBody) throwError("No data provided");

    const body = request.body({ type: "json" });

    const reply: Reply<Question> = {
      success: true,
      body: [],
    };

    const {
      wants,
      details,
    }: myBodies<RQuestion, Question, QuestionExtraBody> = await body.value;
    const token = request.headers.get("token");
    switch (wants) {
      case "create":
        reply.body = [await addingQuestion(token, details)];
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
