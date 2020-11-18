import { RUser, User, users } from "../../../Schemas/user.ts";
import { throwError } from "../../../Utils/index.ts";
import { redis } from "../../../Utils/Config/redis.ts";
import type { details } from "../../../Utils/index.ts";
import { generateJWt } from "../../../Utils/Middlewares/create_jwt.ts";
import { findOne, update } from "../../../Cfns/index.ts";
import { isAuthFn } from "../../../Utils/Middlewares/is_auth_fn.ts";
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

      return await generateJWt(foundUser._id.$oid);
      //todo generate jwt and return
    } else {
      throwError("code is not accepted");
    }
  } else {
    throwError("user not exsist");
  }
};
