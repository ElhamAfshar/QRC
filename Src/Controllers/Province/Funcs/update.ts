import { ObjectId } from "https://deno.land/x/mongo@v0.12.1/mod.ts";
import { update } from "../../../Cfns/index.ts";
import { provinces, Province, RProvince } from "../../../Schemas/index.ts";
import {
  throwError,
  isAuthFn,
  details,
  isAdminFn,
} from "../../../Utils/index.ts";
import { ProvinceExtraBody } from "../province.ts";

type ProvinceDetails = details<RProvince, Province, ProvinceExtraBody>;

export const updatingProvince = async (
  token: string | null,
  details: ProvinceDetails
): Promise<Partial<Province>> => {
  const user = token
    ? await isAuthFn(token)
    : throwError("your token is empty");
  const isAdmin = isAdminFn(user);

  const updateProvice = async (details: ProvinceDetails) => {
    const { _id, name, enName, coordinates } = details.body!;
    return await update<Province>(
      { _id: ObjectId(_id) },
      {
        _id: ObjectId(_id),
        name,
        enName,
        coordinates,
      },
      provinces
    );
  };

  const genSelected = async (details: ProvinceDetails) => {
    return {
      _id: (await updateProvice(details))._id,
    };
  };

  return isAdmin
    ? await genSelected(details)
    : throwError("you don not have enough permission to do this");
};
