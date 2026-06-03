import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Hero from "./components/Hero";
import SelectedWork from "./components/SelectedWork";
import Footer from "./components/Footer";

import Blog from "./pages/Blog";
import Guestbook from "./pages/Guestbook";
import SymphonyPost from "./pages/blog/SymphonyPost";
import BiblePlusPost from "./pages/blog/BiblePlusPost";
import ReqitPost from "./pages/blog/ReqitPost";
import ProjectDetail from "./pages/ProjectDetail";
import Estimate from "./pages/Estimate";
import NotFound from "./pages/NotFound";

function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
    </>
  );
}

export default function App() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("light", !dark);
  }, [dark]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar dark={dark} onToggleDark={() => setDark((p) => !p)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/guestbook" element={<Guestbook />} />
        <Route path="/blog/symphony-wedding-app" element={<SymphonyPost />} />
        <Route path="/blog/bibleplus-production-fix" element={<BiblePlusPost />} />
        <Route path="/blog/reqit-postman" element={<ReqitPost />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/estimate" element={<Estimate />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
