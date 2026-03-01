import { Suspense, lazy, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import CookieConsent from './components/CookieConsent'

const Accueil = lazy(() => import('./pages/Accueil'))
const APropos = lazy(() => import('./pages/APropos'))
const Expertises = lazy(() => import('./pages/Expertises'))
const Projets = lazy(() => import('./pages/Projets'))
const FormationAudit = lazy(() => import('./pages/FormationAudit'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Contact = lazy(() => import('./pages/Contact'))
const PolitiqueConfidentialite = lazy(() => import('./pages/PolitiqueConfidentialite'))

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
        <Suspense fallback={<div className="min-h-[40vh] bg-bg" />}>
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
        </Suspense>
      </main>
      <Footer />
      <CookieConsent />
    </>
  )
}

export default App
