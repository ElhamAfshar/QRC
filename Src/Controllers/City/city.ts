import type { Context } from "https://deno.land/x/oak/mod.ts";
import { City, RCity } from "../../Schema/index.ts";
import { throwError } from "../../utils/functions/throwErr.ts";
import { myBodies, Reply } from "../../utils/typescript/commonTypes.ts";
import { addingCity } from "./Funcs/add.ts";

export interface CityExtraBody {
  provinceId: string;
}

export const city = async ({ response, request }: Context) => {
  try {
    if (!request.hasBody) throwError("No data provided");

    const body = request.body({ type: "json" });

    const reply: Reply<City> = {
      success: true,
      body: [],
    };

    const {
      wants,
      details,
    }: myBodies<RCity, City, CityExtraBody> = await body.value;
    const token = request.headers.get("token");
    switch (wants) {
      case "create":
        reply.body = [await addingCity(token, details)];
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
