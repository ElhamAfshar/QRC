import type { Context } from "https://deno.land/x/oak/mod.ts";
import { User, RUser } from "../../Schemas/index.ts";
import { throwError } from "../../Utils/Function/throw_err.ts";
import { myBodies, Reply } from "../../Utils/TypeScript/common_types.ts";
import { SignReq } from "./Funcs/sign_req.ts";

export const UserMaster = async ({ response, request }: Context) => {
  try {
    if (!request.hasBody) throwError("No data provided");

    const body = request.body({ type: "json" });

    const reply: Reply<User> = {
      success: true,
      body: [],
    };

    const { wants, details }: myBodies<RUser, User, {}> = await body.value;
    const token = request.headers.get("token");
    switch (wants) {
      case "create":
        [await SignReq(token, details)];
        break;

      default:
        throwError("must be chose what you want's");
        break;
    }
    response.status = 201;
    response.body = "success";
  } catch (error) {
    response.status = 500;
    response.body = {
      susses: false,
      error: error.message || "something is wrong",
    };
  }
};
