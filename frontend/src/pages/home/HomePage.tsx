import { Suspense } from "react";
import { LoadingSpinner } from "../../components";
import { LandingSections } from "../../lazyComponents";

export const HomePage = () => {
  return (
    <div className="bg-background min-h-screen">
      <Suspense fallback={<LoadingSpinner />}>
        <LandingSections.OpenSourceCost />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <LandingSections.DoYouRemember />
      </Suspense>

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
