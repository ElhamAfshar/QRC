import type { RouterContext } from "https://deno.land/x/oak/mod.ts";
import { RUser, User, users, Level } from "../../../Schemas/user.ts";
import { createVerificationCode } from "../../../Utils/index.ts";
import { redis } from "../../../Utils/Config/redis.ts";
import type { ObjectId } from "https://deno.land/x/mongo@v0.12.1/mod.ts";
import type { details } from "../../../Utils/TypeScript/common_types.ts";
import {
  makeJwt,
  setExpiration,
  Jose,
  Payload,
} from "https://deno.land/x/djwt/create.ts";

export const key = "your-secret";

export const payload: Payload = {
  exp: setExpiration(60 * 60 * 24 * 30 * 6),
};

export const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

type SignDetails = details<RUser, User, {}>;

export const SignReq = async (
  token: string | null,
  details: SignDetails
): Promise<Partial<User>> => {};
