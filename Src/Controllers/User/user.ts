import type { Context } from "https://deno.land/x/oak/mod.ts";
import { User, RUser } from "../../Schemas/index.ts";
import { throwError } from "../../Utils/Function/throw_err.ts";
import { myBodies, Reply } from "../../Utils/TypeScript/common_types.ts";
import { SignReq, Read, Signing } from "./Funcs/index.ts";

export const UserMaster = async ({ response, request }: Context) => {
  try {
    if (!request.hasBody) throwError("No data provided");

    const body = request.body({ type: "json" });

    const reply: Reply<User> = {
      success: true,
      body: [],
    };

    const {
      wants,
      details,
    }: myBodies<RUser, User, { code: string }> = await body.value;
    const token = request.headers.get("token");
    switch (wants) {
      case "create":
        response.body = "success";
        break;
      case "get":
        response.body = await Read(token, details);
        break;
      case "singning":
        response.body = await Signing(token, details);
        break;
      default:
        throwError("must be chose what you want's");
        break;
    }

    // response.body = reply.body;
    response.status = 201;
  } catch (error) {
    response.status = 500;
    response.body = {
      susses: false,
      error: error.message || "something is wrong",
    };
  }
};
