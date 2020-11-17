import { ObjectId } from "https://deno.land/x/mongo@v0.12.1/mod.ts";
import { update, findOne } from "../../../Cfns/index.ts";
import {
  provinces,
  Province,
  RCity,
  City,
  cities,
} from "../../../Schemas/index.ts";
import {
  throwError,
  isAuthFn,
  details,
  isAdminFn,
} from "../../../Utils/index.ts";
import { CityExtraBody } from "../city.ts";

type CityDetails = details<RCity, City, CityExtraBody>;

export const updateCity = async (
  token: string | null,
  details: CityDetails
): Promise<Partial<City>> => {
  const user = token
    ? await isAuthFn(token)
    : throwError("your token is empty");
  const isAdmin = isAdminFn(user);

  const updateProvice = async (details: CityDetails) => {
    const { _id, name, provinceId, enName, coordinates } = details.body!;

    const foundProvince = await findOne<Province>(
      { _id: ObjectId(provinceId) },
      provinces
    );
    return foundProvince
      ? await update<Province>(
          { _id: ObjectId(_id) },
          {
            _id: ObjectId(_id),
            name,
            enName,
            coordinates,
          },
          provinces
        )
      : throwError("we have issue to update the city");
  };

  const genSelected = async (details: CityDetails) => {
    return {
      _id: (await updateProvice(details))._id,
    };
  };

  return isAdmin
    ? await genSelected(details)
    : throwError("you don not have enough permission to do this");
};
