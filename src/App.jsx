import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Import placeholders for pages
import Accueil from './pages/Accueil'
import APropos from './pages/APropos'
import Expertises from './pages/Expertises'
import Projets from './pages/Projets'
import FormationAudit from './pages/FormationAudit'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import PolitiqueConfidentialite from './pages/PolitiqueConfidentialite'
import CookieConsent from './components/CookieConsent'

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/a-propos" element={<APropos />} />
          <Route path="/expertises" element={<Expertises />} />
          <Route path="/projets" element={<Projets />} />
          <Route path="/bureau-etudes" element={<FormationAudit />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
        </Routes>
      </main>
      <Footer />
      <CookieConsent />
    </>
  )
}

export default App
