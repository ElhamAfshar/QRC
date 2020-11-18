import { verify, decode } from "https://deno.land/x/djwt@v1.9/mod.ts";
import { Level, User, users } from "../../Schemas/index.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.12.1/mod.ts";
import { throwError } from "../Function/index.ts";

export const isAuthFn = async (token: string) => {
  const usersId = await getTokenDetails(token);
  const foundedUser = await users.findOne({ _id: ObjectId(usersId) });
  return foundedUser ? foundedUser : throwError("can not found any user");
};

export const isAdminFn = (user: User) => {
  return user.level.includes(Level.Admin) ? true : false;
};

export const getTokenDetails = async (jwt: string) => {
  // const payload = await verify(jwt, "your-secret", "HS256");
  const { payload, signature, header } = await decode(jwt);
  return payload.UserId as string;
};
