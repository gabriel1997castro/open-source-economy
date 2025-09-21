import "./App.css";
import { Layout } from "./components/Layout";
import { OpenSourceCost } from "./components/OpenSourceCost";

function App() {
  return (
    <Layout>
      <div className="bg-background min-h-screen">
        <OpenSourceCost />
      </div>
    </Layout>
  );
}

export default App;
