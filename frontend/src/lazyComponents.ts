import { lazy } from "react";

// Group related components for better bundle optimization
export const LandingSections = {
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
