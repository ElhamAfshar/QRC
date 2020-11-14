import { validateJwt } from "https://deno.land/x/djwt/validate.ts";
import type { PayloadObject } from "https://deno.land/x/djwt/create.ts";
import { Level, User, users } from "../../Schema/User.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.12.1/mod.ts";
import { throwError } from "../functions/throwErr.ts";

export const isAuthFn = async (token: string) => {
  const usersId = await getTokenDetails(token);
  const foundedUser = await users.findOne({ _id: ObjectId(usersId) });
  return foundedUser ? foundedUser : throwError("can not found any user");
};

export const isAdminFn = (user: User) => {
  return user.level.includes(Level.Ghost) || user.level.includes(Level.Admin)
    ? true
    : false;
};

export const getTokenDetails = async (jwt: string) => {
  const decoded = await validateJwt({
    jwt,
    key: "your-secret",
    algorithm: "HS256",
  });
  return decoded.isValid &&
    decoded.payload &&
    (decoded.payload as PayloadObject).usersId
    ? (decoded.payload as PayloadObject).usersId!.toLocaleString()
    : throwError("your token is not valid");
};
