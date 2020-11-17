import { ObjectId } from "https://deno.land/x/mongo@v0.12.1/mod.ts";
import { update, findOne } from "../../../Cfns/index.ts";
import {
  District,
  RDistrict,
  districts,
  City,
  cities,
} from "../../../Schemas/index.ts";
import {
  throwError,
  isAuthFn,
  details,
  isAdminFn,
} from "../../../Utils/index.ts";
import { DistrictExtraBody } from "../district.ts";

type DistrictDetails = details<RDistrict, District, DistrictExtraBody>;

export const updatingDistrict = async (
  token: string | null,
  details: DistrictDetails
): Promise<Partial<City>> => {
  const user = token
    ? await isAuthFn(token)
    : throwError("your token is empty");
  const isAdmin = isAdminFn(user);

  const updateDistrict = async (details: DistrictDetails) => {
    const { _id, name, cityId, enName, coordinates } = details.body!;

    const foundCity = await findOne<City>({ _id: ObjectId(cityId) }, cities);
    return foundCity
      ? await update<District>(
          { _id: ObjectId(_id) },
          {
            _id: ObjectId(_id),
            name,
            enName,
            coordinates,
          },
          districts
        )
      : throwError("we have issue to update the city");
  };

  const genSelected = async (details: DistrictDetails) => {
    return {
      _id: (await updateDistrict(details))._id,
    };
  };

  return isAdmin
    ? await genSelected(details)
    : throwError("you don not have enough permission to do this");
};
