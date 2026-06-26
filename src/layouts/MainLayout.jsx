import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useHashScroll } from '../hooks/useHashScroll';

export default function MainLayout() {
  // Re-attach scroll reveal observer on every route change
  useScrollReveal();
  // Handle smooth scroll to #hash anchors
  useHashScroll();

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

      <main id="main-content">
        {/* Page-specific content rendered here */}
        <Outlet />
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
