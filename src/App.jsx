import { Routes, Route } from 'react-router-dom';

// Layout shell (Navbar + Outlet + Footer + WhatsApp)
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import SobreNosPage from './pages/SobreNosPage';
import ServicosPage from './pages/ServicosPage';
import ServicoDetailPage from './pages/ServicoDetailPage';
import PortfolioPage from './pages/PortfolioPage';
import GaleriaPage from './pages/GaleriaPage';
import BlogPage from './pages/BlogPage';
import RecursosPage from './pages/RecursosPage';
import ContactoPage from './pages/ContactoPage';
import CarreirasPage from './pages/CarreirasPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      {/* All routes share the MainLayout (Navbar + Footer + WhatsApp) */}
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="sobre-nos" element={<SobreNosPage />} />
        <Route path="servicos">
          <Route index element={<ServicosPage />} />
          <Route path=":slug" element={<ServicoDetailPage />} />
        </Route>
        <Route path="portfolio" element={<PortfolioPage />} />
        <Route path="galeria" element={<GaleriaPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="recursos" element={<RecursosPage />} />
        <Route path="contacto" element={<ContactoPage />} />
        <Route path="carreiras" element={<CarreirasPage />} />
        {/* 404 catch-all */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
