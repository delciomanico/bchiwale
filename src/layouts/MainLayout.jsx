import { Outlet, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useHashScroll } from '../hooks/useHashScroll';

export default function MainLayout() {
  useScrollReveal();
  useHashScroll();

  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <>
      {/* Skip-to-main — keyboard accessibility */}
      <Link
        to="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4
                   focus:z-[100] focus:bg-cyan focus:text-white focus:px-4 focus:py-2
                   focus:font-body focus:text-sm focus:font-semibold"
      >
        Saltar para o conteúdo principal
      </Link>

      <Navbar />

      {/*
        Inner pages: pt-[72px] clears the fixed navbar.
        backgroundColor matches the dark banner so the gap is invisible.
        Sections below the banner have their own bg-white/bg-gray-light that override it.
      */}
      <main
        id="main-content"
        style={isHome ? undefined : { paddingTop: '72px' }}
      >
        <Outlet />
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
