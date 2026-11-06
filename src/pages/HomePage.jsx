import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Portfolio from '../components/Portfolio';
import Team from '../components/Team';
import Testimonials from '../components/Testimonials';
import Blog from '../components/Blog';
import CTAFinal from '../components/CTAFinal';
import { usePageMeta } from '../hooks/usePageMeta';
import { useLang } from '../contexts/LangContext';

export default function HomePage() {
  const { t } = useLang();
  usePageMeta(t('meta.default_title'), t('meta.home_description'), '/');
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Team />
      <Testimonials />
      <Blog />
      <CTAFinal />
    </>
  );
}
