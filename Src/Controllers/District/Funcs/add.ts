import { ObjectId } from "https://deno.land/x/mongo@v0.12.1/mod.ts";
import { creating, findOne } from "../../../Cfns/index.ts";
import {
  districts,
  District,
  RDistrict,
  City,
  cities,
} from "../../../Schemas/index.ts";
import { throwError } from "../../../Utils/Function/index.ts";
import { isAdminFn, isAuthFn } from "../../../Utils/Middlewares/index.ts";
import type { details } from "../../../Utils/TypeScript/index.ts";
import { DistrictExtraBody } from "../district.ts";

type DistrictDetails = details<RDistrict, District, DistrictExtraBody>;

export const addingDistrict = async (
  token: string | null,
  details: DistrictDetails
): Promise<Partial<District>> => {
  const user = token
    ? await isAuthFn(token)
    : throwError("your token is empty");
  const isAdmin = isAdminFn(user);

  const createCity = async (details: DistrictDetails) => {
    const { name, enName, cityId, coordinates } = details.body!;
    const foundCity = await findOne<City>({ _id: ObjectId(cityId) }, cities);
    return foundCity
      ? await creating<District>(
          {
            name,
            enName,
            cityId: foundCity._id,
            coordinates,
          },
          districts
        )
      : throwError("we have issue to create the city");
  };

  const genSelected = async (details: DistrictDetails) => {
    return {
      _id: await createCity(details),
    };
  };

  return isAdmin
    ? await genSelected(details)
    : throwError("you don not have enough permission to do this");
};
