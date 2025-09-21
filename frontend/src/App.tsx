import "./App.css";
import { DoYouRemember } from "./components/DoYouRemember";
import { Layout } from "./components/Layout";
import { OpenSourceCost } from "./components/OpenSourceCost";

function App() {
  return (
    <Layout>
      <div className="bg-background min-h-screen">
        <OpenSourceCost />
        <DoYouRemember />
      </div>
    </Layout>
  );
}

export default App;
