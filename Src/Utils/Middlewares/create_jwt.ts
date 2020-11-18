import { create } from "https://deno.land/x/djwt@v1.9/mod.ts";

export const generateJWt = async (userId: string): Promise<string> => {
  console.log("genrateJWT");
  console.log("useIs", userId);
  const jwt = await create(
    { alg: "HS512", typ: "JWT" },
    { userId: userId },
    "secret"
  );
  console.log(jwt);
  return jwt;
};
