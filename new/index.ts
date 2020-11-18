/////////////////////////
import { create, verify } from "https://deno.land/x/djwt@v1.9/mod.ts";

import type { PayloadObject } from "https://deno.land/x/djwt@v1.9/mod.ts";
const jwt = await create(
  { alg: "HS512", typ: "JWT" },
  { userId: "bar" },
  "secret"
);
// eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIifQ.WePl7achkd0oGNB8XRF_LJwxlyiPZqpdNgdKpDboAjSTsWq-aOGNynTp8TOv8KjonFym8vwFwppXOLoLXbkIaQ
console.log("jjjjjwwwwwttttt");
console.log(jwt);

const payload = await verify(jwt, "secret", "HS512");
console.log("----");
console.log(payload);
console.log(payload.userId);

const payload2 = await verify(
  "93898duhdjbhjdbhsnknxjhidy8e38",
  "secret",
  "HS512"
);
console.log("----");
console.log(payload2);
console.log(payload2.userId);
///////////////////////////
// const router = new Router();
// const app = new Application();
// const PORT = 3070;

// router.get("/", (ctx: Context) => {
//   ctx.response.body = "Hello world";
// });

// mannageRoutes(router);

// app.use(router.routes());
// app.use(router.allowedMethods());
// Deno.env.set("ENVIROMENT", "production");

// await app.listen({ port: PORT }).then(() => {
//   console.log(`App running on PORT ${PORT}`);
// });
