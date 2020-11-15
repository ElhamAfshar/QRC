import type { Router } from "https://deno.land/x/oak/mod.ts";
import { ProvinceMaster } from "../Controllers/Province/province.ts";
import { UserMaster } from "../Controllers/User/user.ts";

const mannageRoutes = (router: Router) => {
  router.post("/province", ProvinceMaster);
  router.post("/user", UserMaster);
};

export default mannageRoutes;
