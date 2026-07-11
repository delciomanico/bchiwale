import { Link } from 'react-router-dom';
import { useLang } from '../contexts/LangContext';
import { useSiteData } from '../contexts/ContentContext';

export default function CTAFinal() {
  const { t } = useLang();
  const { CONTACT } = useSiteData();
  return (
    <section className="section-tall bg-charcoal" aria-labelledby="cta-title">
      <div className="container">
        <div className="max-w-[580px]">

          <p className="eyebrow mb-6 md:mb-8">{t('cta.eyebrow')}</p>

          <h2
            id="cta-title"
            className="font-heading font-semibold text-white leading-[0.95] tracking-[-0.04em] mb-8 md:mb-10"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          >
            {t('cta.title')}{' '}
            <em className="italic" style={{ color: '#00AEEF' }}>{t('cta.title_em')}</em>
          </h2>

          <div className="w-full h-px bg-white/10 mb-8 md:mb-10" aria-hidden="true" />

          <p className="font-body text-white/45 text-base leading-[1.8] mb-8 md:mb-10">
            {t('cta.body')}
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-5 sm:gap-8">
            <Link
              to="/contacto"
              className="font-body font-medium text-white border-b border-white
                         hover:text-cyan hover:border-cyan transition-colors pb-0.5 text-[15px]"
            >
              {t('cta.contact_link')} <span aria-hidden="true">↗</span>
            </Link>
            <a
              href={`mailto:${CONTACT.email}`}
              className="font-mono text-[14px] text-white/40 hover:text-cyan transition-colors tracking-wide"
            >
              {CONTACT.email}
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
