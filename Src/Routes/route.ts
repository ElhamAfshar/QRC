import type { Router } from "https://deno.land/x/oak/mod.ts";
import { ProvinceMaster } from "../Controllers/Province/province.ts";

const mannageRoutes = (router: Router) => {
  router.post("/province", ProvinceMaster);
};

export default mannageRoutes;
