import { RUser, User, users } from "../../../Schemas/user.ts";
import { isAuthFn, throwError } from "../../../Utils/index.ts";
import { redis } from "../../../Utils/Config/redis.ts";
import type { details } from "../../../Utils/TypeScript/common_types.ts";
import { findOne } from "../../../Cfns/index.ts";
import { update } from "../../../Cfns/index.ts";
import {
  makeJwt,
  setExpiration,
  Jose,
  Payload,
} from "https://deno.land/x@v1.9/djwt/mod.ts";

export const key = "your-secret";

export const payload: Payload = {
  exp: setExpiration(60 * 60 * 24 * 30 * 6),
};

export const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

type SignDetails = details<RUser, User, { code: string }>;

export const Signing = async (token: string | null, details: SignDetails) => {
  const user = token
    ? await isAuthFn(token)
    : throwError("your token is empty");
  const { phoneNumber, code } = details.body!;
  const foundUser = await findOne<User>({ phoneNumber }, users);
  if (foundUser) {
    const getCode = await redis.get(`reg-${foundUser.phoneNumber}`);
    if (code == getCode) {
      foundUser.isActive = true;
      await update<User>({ _id: foundUser._id }, foundUser, users);

      payload.usersId = foundUser._id.$oid;
      foundUser.isActive &&
        (await users.updateOne(
          { _id: foundUser._id },
          { $set: { isActive: true } }
        ));
      const jwt = await makeJwt({ header, payload, key });
      return jwt;
      //todo generate jwt and return
    } else {
      throwError("code is not accepted");
    }
  } else {
    throwError("user not exsist");
  }
};
