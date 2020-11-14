import type { Router } from "https://deno.land/x/oak/mod.ts";

const mannageRoutes = (router: Router) => {
  router.post("/province");
};

export default mannageRoutes;
