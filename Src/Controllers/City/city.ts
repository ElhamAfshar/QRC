import type { Context } from "https://deno.land/x/oak/mod.ts";
import { City, RCity } from "../../Schemas/index.ts";
import { throwError } from "../../Utils/Function/index.ts";
import { myBodies, Reply } from "../../Utils/TypeScript/index.ts";
import { addingCity, updateCity } from "./Funcs/index.ts";

export interface CityExtraBody {
  provinceId: string;
  _id: string;
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
      case "update":
        reply.body = [await updateCity(token, details)];
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
