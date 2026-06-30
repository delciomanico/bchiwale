import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Portfolio from '../components/Portfolio';
import Team from '../components/Team';
import Testimonials from '../components/Testimonials';
import Blog from '../components/Blog';
import CTAFinal from '../components/CTAFinal';
import { usePageMeta } from '../hooks/usePageMeta';

export default function HomePage() {
  usePageMeta(
    'Geologia, Geofísica e Engenharia Geotécnica em Angola',
    'Empresa angolana certificada de geociências: Geologia, Geofísica, Engenharia Geotécnica, Topografia e Consultoria Mineira desde 2017. ISO 9001 · ISO 45001 · JORC · 18 províncias.',
    'https://bchiwale.ao/'
  );
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
