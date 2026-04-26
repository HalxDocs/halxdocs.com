import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import SplashScreen from "./components/SplashScreen";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";

// Sections
import Hero from "./components/Hero";
import Services from "./components/Services";
import SelectedWork from "./components/SelectedWork";
import About from "./components/About";
import TechStack from "./components/TechStack";
import BlogPreview from "./components/BlogPreview";
import ContactCTA from "./components/ContactCTA";
import Footer from "./components/Footer";

// Pages
import Blog from "./pages/Blog";
import SymphonyPost from "./pages/blog/SymphonyPost";
import BiblePlusPost from "./pages/blog/BiblePlusPost";
import ProjectDetail from "./pages/ProjectDetail";

function Home() {
  return (
    <>
      <Hero />
      <Services />
      <SelectedWork />
      <About />
      <TechStack />
      <BlogPreview />
      <ContactCTA />
    </>
  );
}

function AppContent() {
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(true);

  const isHome = location.pathname === "/";

  useEffect(() => {
    if (!isHome) {
      setShowSplash(false);
      return;
    }
    const timer = setTimeout(() => setShowSplash(false), 2800);
    return () => clearTimeout(timer);
  }, [isHome]);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <>
      {showSplash && isHome && <SplashScreen />}

      {!showSplash && (
        <>
          <ScrollToTop />
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/symphony-wedding-app" element={<SymphonyPost />} />
            <Route path="/blog/bibleplus-production-fix" element={<BiblePlusPost />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
          </Routes>

          <Footer />
        </>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
