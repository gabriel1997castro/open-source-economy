import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components";
import { 
  HomePage, 
  AboutPage, 
  SolutionsPage, 
  SignInPage,
  MissionPage,
  TeamPage,
  CareersPage,
  ContactPage,
  DocsPage,
  BlogPage,
  GuidesPage,
  ApiPage,
  SupportPage,
  TermsPage,
  PrivacyPage
} from "./pages";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/signin" element={<SignInPage />} />
          
          {/* Company routes */}
          <Route path="/mission" element={<MissionPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Resource routes */}
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/guides" element={<GuidesPage />} />
          <Route path="/api" element={<ApiPage />} />
          <Route path="/support" element={<SupportPage />} />
          
          {/* Legal routes */}
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
