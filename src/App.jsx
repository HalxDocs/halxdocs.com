import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";
import LiveStats from "./components/LiveStats";
import Currently from "./components/Currently";
import SelectedWork from "./components/SelectedWork";
import Opportunities from "./components/Opportunities";
import Footer from "./components/Footer";

import Work from "./pages/Work";
import CaseStudy from "./pages/CaseStudy";
import Blog from "./pages/Blog";
import Guestbook from "./pages/Guestbook";
import RaftPost from "./pages/blog/RaftPost";
import WhyIBuiltReqit from "./pages/blog/WhyIBuiltReqit";
import AegisCaseStudy from "./pages/blog/AegisCaseStudy";
import HttpRequestEngine from "./pages/blog/HttpRequestEngine";
import OneEngineManyDoors from "./pages/blog/OneEngineManyDoors";
import SignedRunReceipts from "./pages/blog/SignedRunReceipts";
import DeadLetterQueues from "./pages/blog/DeadLetterQueues";
import Graveyard from "./pages/Graveyard";
import NotFound from "./pages/NotFound";

function Home() {
  return (
    <>
      <Hero />
      <AboutMe />
      <LiveStats />
      <Currently />
      <SelectedWork />
      <Opportunities />
    </>
  );
}

export default function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar dark={dark} onToggleDark={() => setDark((p) => !p)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/guestbook" element={<Guestbook />} />
        <Route path="/blog/learning-raft-in-go" element={<RaftPost />} />
        <Route path="/blog/why-i-built-reqit" element={<WhyIBuiltReqit />} />
        <Route path="/blog/two-implementations-one-truth" element={<AegisCaseStudy />} />
        <Route path="/blog/http-request-engine-in-go" element={<HttpRequestEngine />} />
        <Route path="/blog/one-engine-many-doors" element={<OneEngineManyDoors />} />
        <Route path="/blog/signed-run-receipts" element={<SignedRunReceipts />} />
        <Route path="/blog/dead-letter-queues-safe-recovery" element={<DeadLetterQueues />} />
        <Route path="/api-graveyard" element={<Graveyard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
