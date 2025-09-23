import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components";
import { HomePage, AboutPage, SolutionsPage, SignInPage } from "./pages";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/signin" element={<SignInPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
