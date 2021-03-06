import { Application, Context, Router } from "https://deno.land/x/oak/mod.ts";
import mannageRoutes from "./Src/Routes/route.ts";

const router = new Router();
const app = new Application();
const PORT = 3070;

router.get("/", (ctx: Context) => {
  ctx.response.body = "Hello world";
});

mannageRoutes(router);

app.use(router.routes());
app.use(router.allowedMethods());
Deno.env.set("ENVIROMENT", "production");

await app.listen({ port: PORT }).then(() => {
  console.log(`App running on PORT ${PORT}`);
});
