import "./App.css";
import { Suspense } from "react";
import { Layout, LoadingSpinner } from "./components";
import { Footer } from "./components/footer";
import { LandingSections } from "./lazyComponents";

function App() {
  return (
    <Layout>
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
          <LandingSections.GetInTouch />
        </Suspense>

        <Footer />
      </div>
    </Layout>
  );
}

export default App;
