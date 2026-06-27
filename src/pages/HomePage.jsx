import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Portfolio from '../components/Portfolio';
import Team from '../components/Team';
import Testimonials from '../components/Testimonials';
import Blog from '../components/Blog';
import CTAFinal from '../components/CTAFinal';

// Timeline and Newsletter are intentionally omitted from the homepage.
// Timeline lives in full on /sobre-nos.
// Newsletter is accessible via /recursos and the Blog page.

export default function HomePage() {
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
