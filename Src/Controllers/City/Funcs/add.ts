import { ObjectId } from "https://deno.land/x/mongo@v0.12.1/mod.ts";
import { creating } from "../../../Cfns/create.ts";
import { cities, City, provinces, Province, RCity } from "../../../Schemas/index.ts";
import { throwError } from "../../../Utils/Function/throw_err.ts";
//import { isAdminFn, isAuthFn } from "../../../Utils/middlewares/isAuthFn.ts";
import type { details } from "../../../Utils/TypeScript/common_types.ts";
import { CityExtraBody } from "../city.ts";


type CityDetails = details<RCity, City, CityExtraBody>;

export const addingCity = async (
  token: string | null,
  details: CityDetails
): Promise<Partial<City>> => {
  // const user = token
  //   ? await isAuthFn(token)
  //   : throwError("your token is empty");
  // const isAdmin = isAdminFn(user);

  const createCity = async (details: CityDetails) => {
    const { name, enName, state } = details.body!;
    const foundedState = await states.findOne({
      _id: ObjectId(state),
    });
    return foundedState
      ? await creating<City>(
          {
            name,
            enName,
            state: foundedState._id,
            country: foundedState.country,
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

  // return isAdmin
   await genSelected(details)
    // : throwError("you don not have enough permission to do this");
};
