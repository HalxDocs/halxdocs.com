import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import SplashScreen from "./components/SplashScreen";
import Navbar from "./components/Navbar";


// Pages / Sections
import Hero from "./components/Hero";
import ProjectsMarquee from "./components/ProjectsMarquee";
import About from "./components/About";
import Services from "./components/Services";
import SelectedWork from "./components/SelectedWork";
import ContactCTA from "./components/ContactCTA";
import Footer from "./components/Footer";

// Blog pages
import Blog from "./pages/Blog";
import WhyJsonstack from "./pages/blog/WhyICreatedJsonstack";

/* ---------------------------------- */
/* Home Page Wrapper                  */
/* ---------------------------------- */
function Home() {
  return (
    <>
      <Hero />
      <ProjectsMarquee />
      <About />
      <Services />
      <SelectedWork />
      <ContactCTA />
    </>
  );
}

/* ---------------------------------- */
/* App Content (handles splash logic) */
/* ---------------------------------- */
function AppContent() {
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(true);

  const isHome = location.pathname === "/";

  useEffect(() => {
    if (!isHome) {
      setShowSplash(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, [isHome]);

  // Initialize dark mode on app load
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <>
      {/* TEST COMPONENT - Remove after testing */}
      
      
      {/* Splash only on home */}
      {showSplash && isHome && <SplashScreen />}

      {!showSplash && (
        <>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route
              path="/blog/why-i-created-jsonstack"
              element={<WhyJsonstack />}
            />
          </Routes>

          <Footer />
        </>
      )}
    </>
  );
}

/* ---------------------------------- */
/* Root App                           */
/* ---------------------------------- */
export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}