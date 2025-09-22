import "./App.css";
import { DoYouRemember } from "./components/DoYouRemember";
import { Layout } from "./components/Layout";
import { LetUsProtectYou } from "./components/LetUsProtectYou";
import { OpenSourceCost } from "./components/OpenSourceCost";

function App() {
  return (
    <Layout>
      <div className="bg-background min-h-screen">
        <OpenSourceCost />
        <DoYouRemember />
        <LetUsProtectYou />
      </div>
    </Layout>
  );
}

export default App;
