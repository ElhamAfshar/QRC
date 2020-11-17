import {
  RCenter,
  Center,
  centers,
  User,
  users,
} from "../../../Schemas/index.ts";
import { CenterExtraBody } from "../center.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.12.1/mod.ts";
import { creating, findOne } from "../../../Cfns/index.ts";
import { throwError } from "../../../Utils/Function/index.ts";
import { details } from "../../../Utils/TypeScript/index.ts";
import { isAdminFn, isAuthFn } from "../../../Utils/Middlewares/index.ts";
type CenterDetails = details<RCenter, Center, CenterExtraBody>;

export const addingCenter = async (
  token: string | null,
  details: CenterDetails
): Promise<Partial<Center>> => {
  const user = token
    ? await isAuthFn(token)
    : throwError("your token is empty");
  const isAdmin = isAdminFn(user);
  const createCenter = async (details: CenterDetails) => {
    const {
      name,
      telphoneNumber,
      address,
      coordinate,
      isLegal,
      agent,
    } = details.body!;

    const foundUser = await findOne<User>({ _id: ObjectId(agent) }, users);
    return foundUser
      ? await creating<Center>(
          {
            name,
            telphoneNumber,
            address,
            coordinate,
            isLegal,
            agent: foundUser._id,
          },
          centers
        )
      : throwError("we have issue to create the city");
  };

  const genSelected = async (details: CenterDetails) => {
    return {
      _id: await createCenter(details),
    };
  };

  return isAdmin
    ? await genSelected(details)
    : throwError("you don not have enough permission to do this");
};
