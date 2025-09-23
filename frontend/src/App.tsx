import "./App.css";
import { useState, useEffect } from "react";
import { Layout } from "./components";
import { HomePage, AboutPage, SolutionsPage, SignInPage } from "./pages";

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Simple hash-based routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the #
      setCurrentPage(hash || 'home');
    };

    // Set initial page
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage />;
      case 'solutions':
        return <SolutionsPage />;
      case 'signin':
        return <SignInPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <Layout>
      {renderPage()}
    </Layout>
  );
}

export default App;
