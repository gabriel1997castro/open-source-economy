import { Suspense } from "react";
import {
  DoYouRemember,
  LoadingSpinner,
  OpenSourceCost,
} from "../../components";
import { LandingSections } from "../../lazyComponents";

export const HomePage = () => {
  return (
    <div className="bg-background min-h-screen">
      <OpenSourceCost />

      <DoYouRemember />

      <Suspense fallback={<LoadingSpinner />}>
        <LandingSections.LetUsProtectYou />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <div id="contact">
          <LandingSections.GetInTouch />
        </div>
      </Suspense>
    </div>
  );
};
