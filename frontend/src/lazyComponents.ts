import { lazy } from "react";

// Group related components for better bundle optimization
export const LandingSections = {
  OpenSourceCost: lazy(() =>
    import("./components/sections/OpenSourceCost").then((module) => ({
      default: module.OpenSourceCost,
    }))
  ),
  DoYouRemember: lazy(() =>
    import("./components/sections/DoYouRemember").then((module) => ({
      default: module.DoYouRemember,
    }))
  ),
  LetUsProtectYou: lazy(() =>
    import("./components/sections/LetUsProtectYou").then((module) => ({
      default: module.LetUsProtectYou,
    }))
  ),
  GetInTouch: lazy(() =>
    import("./components/sections/GetInTouch").then((module) => ({
      default: module.GetInTouch,
    }))
  ),
};
