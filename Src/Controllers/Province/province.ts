import type { Context } from "https://deno.land/x/oak/mod.ts";
import { Province, RProvince } from "../../Schemas/index.ts";
import { throwError } from "../../Utils/Function/throw_err.ts";
import { myBodies, Reply } from "../../Utils/TypeScript/common_types.ts";
import { addingProvince, updatingProvince } from "./Funcs/index.ts";

export interface ProvinceExtraBody {
  _id: string;
}

export const ProvinceMaster = async ({ response, request }: Context) => {
  try {
    if (!request.hasBody) throwError("No data provided");

    const body = request.body({ type: "json" });

    const reply: Reply<Province> = {
      success: true,
      body: [],
    };

    const {
      wants,
      details,
    }: myBodies<RProvince, Province, ProvinceExtraBody> = await body.value;
    const token = request.headers.get("token");
    switch (wants) {
      case "create":
        reply.body = [await addingProvince(token, details)];
        break;
      case "update":
        reply.body = [await updatingProvince(token, details)];
        break;

      default:
        throwError("must be chose what you want's");
        break;
    }
    response.status = 201;
    response.body = reply;
  } catch (error) {
    response.status = 500;
    response.body = {
      susses: false,
      error: error.message || "something is wrong",
    };
  }
};
