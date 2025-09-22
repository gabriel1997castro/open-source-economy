import "./App.css";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";
import { OpenSourceCost } from "./components/OpenSourceCost";

// Lazy load components that are below the fold
const DoYouRemember = lazy(() =>
  import("./components/DoYouRemember").then((module) => ({
    default: module.DoYouRemember,
  }))
);

const LetUsProtectYou = lazy(() =>
  import("./components/LetUsProtectYou").then((module) => ({
    default: module.LetUsProtectYou,
  }))
);

const GetInTouch = lazy(() =>
  import("./components/GetInTouch").then((module) => ({
    default: module.GetInTouch,
  }))
);

// Loading component for better UX
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-16">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
  </div>
);

function App() {
  return (
    <Layout>
      <div className="bg-background min-h-screen">
        {/* Keep OpenSourceCost as immediate since it's above the fold */}
        <OpenSourceCost />

        {/* Lazy load below-the-fold content */}
        <Suspense fallback={<LoadingSpinner />}>
          <DoYouRemember />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <LetUsProtectYou />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <GetInTouch />
        </Suspense>
      </div>
    </Layout>
  );
}

export default App;
