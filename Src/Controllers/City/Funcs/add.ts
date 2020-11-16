import { ObjectId } from "https://deno.land/x/mongo@v0.12.1/mod.ts";
import { creating, findOne } from "../../../Cfns/index.ts";
import {
  cities,
  City,
  RCity,
  Province,
  provinces,
} from "../../../Schemas/index.ts";
import { throwError } from "../../../Utils/Function/index.ts";
import { isAdminFn, isAuthFn } from "../../../Utils/Middlewares/index.ts";
import type { details } from "../../../Utils/TypeScript/index.ts";
import { CityExtraBody } from "../city.ts";

type CityDetails = details<RCity, City, CityExtraBody>;

export const addingCity = async (
  token: string | null,
  details: CityDetails
): Promise<Partial<City>> => {
  const user = token
    ? await isAuthFn(token)
    : throwError("your token is empty");
  const isAdmin = isAdminFn(user);

  const createCity = async (details: CityDetails) => {
    const { name, enName, provinceId, coordinates } = details.body!;
    const foundProvince = await findOne<Province>(
      { _id: ObjectId(provinceId) },
      provinces
    );
    return foundProvince
      ? await creating<City>(
          {
            name,
            enName,
            provinceId: foundProvince._id,
            coordinates,
          },
          cities
        )
      : throwError("we have issue to create the city");
  };

  const genSelected = async (details: CityDetails) => {
    return {
      _id: await createCity(details),
    };
  };

  return isAdmin
    ? await genSelected(details)
    : throwError("you don not have enough permission to do this");
};
