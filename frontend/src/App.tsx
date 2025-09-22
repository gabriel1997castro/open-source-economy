import "./App.css";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";
import { OpenSourceCost } from "./components/OpenSourceCost";
import { LoadingSpinner } from "./components/LoadingSpinner";

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

function App() {
  return (
    <Layout>
      <div className="bg-background min-h-screen">
        <OpenSourceCost />

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
