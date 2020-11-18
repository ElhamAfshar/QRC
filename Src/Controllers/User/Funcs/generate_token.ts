import { creating } from "../../../Cfns/index.ts";

import { generateJWt } from "../../../Utils/index.ts";
import { Level, User, users } from "../../../Schemas/index.ts";
export const generateGuestToken = async () => {
  const user = await creating<User>(
    {
      isActive: true,
      level: [Level.Ghuest],
    },
    users
  );
  return await generateJWt(user.$oid.toString());
};
