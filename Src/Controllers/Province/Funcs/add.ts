import { ObjectId } from "https://deno.land/x/mongo@v0.12.1/mod.ts";
import { creating } from "../../../Cfns/create.ts";
import { provinces, Province, RProvince } from "../../../Schemas/province.ts";
import { throwError } from "../../../Utils/Function/throw_err.ts";
import type { details } from "../../../Utils/TypeScript/common_types.ts";

type ProvinceDetails = details<RProvince, Province, {}>;

export const addingProvince = async (
  token: string | null,
  details: ProvinceDetails
): Promise<Partial<Province>> => {
  //     const user = token
  //   ? await isAuthFn(token)
  //   : throwError("your token is empty");
  //     const isAdmin = isAdminFn(user);
  console.log("@@@@@@");

  const createProvice = async (details: ProvinceDetails) => {
    const { name, enName, coordinates } = details.body!;
    return await creating<Province>(
      {
        name,
        enName,
        coordinates,
      },
      provinces
    );
  };

  const genSelected = async (details: ProvinceDetails) => {
    return {
      _id: await createProvice(details),
    };
  };

  return genSelected(details);
  // return isAdmin
  //   ?
  //     genSelected(details);
  //   throwError("you don not have enough permission to do this");
};
