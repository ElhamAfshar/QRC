import { RUser, User, users, Level } from "../../../Schemas/user.ts";
import {
  createVerificationCode,
  // isAuthFn,
  throwError,
} from "../../../Utils/index.ts";
import { redis } from "../../../Utils/Config/redis.ts";
import type { details } from "../../../Utils/TypeScript/common_types.ts";
import { findAll } from "../../../Cfns/index.ts";

type SignDetails = details<RUser, User, {}>;

export const Read = async (token: string | null, details: SignDetails) => {
  // const foundUser = await findAll<User>(
  //   { phoneNumber: { $eq: "09188198576" } },
  //   users
  // );

  const foundUser = await findAll<User>(details.body!, users);
  return foundUser ? foundUser : throwError("user not found");
};
