import { RUser, User, users, Level } from "../../../Schemas/user.ts";
import {
  createVerificationCode,
  isAuthFn,
  throwError,
} from "../../../Utils/index.ts";
import { redis } from "../../../Utils/Config/redis.ts";
import type { details } from "../../../Utils/TypeScript/common_types.ts";
import { findOne, creating } from "../../../Cfns/index.ts";
import { update } from "../../../Cfns/index.ts";

type SignDetails = details<RUser, User, {}>;

export const SignReq = async (token: string | null, details: SignDetails) => {
  const user = token
    ? await isAuthFn(token)
    : throwError("your token is empty");

  console.log("token");
  console.log(user);
  const { phoneNumber } = details.body!;
  const foundUser = await findOne<User>({ phoneNumber }, users);
  if (!foundUser) {
    await creating<User>(
      {
        phoneNumber,
        isActive: false,
        level: [Level.Normal, Level.Ghuest],
        GuestUserId: [user._id],
      },
      users
    );
  } else {
    console.log("---1");
    console.log(foundUser);
    foundUser.GuestUserId.push(user._id);
    await update<User>({ _id: foundUser._id }, foundUser, users);
  }
  const code = createVerificationCode();
  console.log(code);
  await redis.set(`reg-${phoneNumber}`, code, { ex: 100 });
  //todo send sms
};
