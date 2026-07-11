import { Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import { useContentStatus } from './contexts/ContentContext';

import HomePage from './pages/HomePage';
import SobreNosPage from './pages/SobreNosPage';
import ServicosPage from './pages/ServicosPage';
import ServicoDetailPage from './pages/ServicoDetailPage';
import PortfolioPage from './pages/PortfolioPage';
import PortfolioDetailPage from './pages/PortfolioDetailPage';
import GaleriaPage from './pages/GaleriaPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import RecursosPage from './pages/RecursosPage';
import ContactoPage from './pages/ContactoPage';
import CarreirasPage from './pages/CarreirasPage';
import NotFoundPage from './pages/NotFoundPage';

import AdminApp from './admin/AdminApp';

function PublicApp() {
  const { loading, error } = useContentStatus();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#1A1A2E' }}>
        <div className="font-mono text-xs tracking-[0.2em] text-white/60 animate-pulse">A CARREGAR...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 text-center" style={{ background: '#1A1A2E' }}>
        <p className="font-body text-white/70 text-sm max-w-sm">
          Não foi possível carregar o conteúdo do site. Recarregue a página ou tente novamente mais tarde.
        </p>
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="sobre-nos" element={<SobreNosPage />} />
        <Route path="servicos">
          <Route index element={<ServicosPage />} />
          <Route path=":slug" element={<ServicoDetailPage />} />
        </Route>
        <Route path="portfolio">
          <Route index element={<PortfolioPage />} />
          <Route path=":slug" element={<PortfolioDetailPage />} />
        </Route>
        <Route path="galeria" element={<GaleriaPage />} />
        <Route path="blog">
          <Route index element={<BlogPage />} />
          <Route path=":slug" element={<BlogDetailPage />} />
        </Route>
        <Route path="recursos" element={<RecursosPage />} />
        <Route path="contacto" element={<ContactoPage />} />
        <Route path="carreiras" element={<CarreirasPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminApp />} />
      <Route path="/*" element={<PublicApp />} />
    </Routes>
  );
}
