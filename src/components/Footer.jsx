import { Link } from 'react-router-dom';
import { useLang } from '../contexts/LangContext';
import { useSiteData } from '../contexts/ContentContext';

function PinIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6.53 6.53l.97-.97a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

export default function Footer() {
  const { t, loc } = useLang();
  const { FOOTER_SERVICES, FOOTER_SERVICES_EN, FOOTER_COMPANY, FOOTER_COMPANY_EN, CONTACT, CERT_BADGES } = useSiteData();
  const footerServices = loc(FOOTER_SERVICES, FOOTER_SERVICES_EN);
  const footerCompany  = loc(FOOTER_COMPANY,  FOOTER_COMPANY_EN);

  return (
    <footer
      className="bg-charcoal"
      style={{ borderTop: '3px solid #00AEEF' }}
      role="contentinfo"
    >
      {/* Main footer grid */}
      <div className="container py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Column 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="font-heading font-extrabold text-white text-xl tracking-tight mb-1">
              B-CHIWALE
            </div>
            <div className="font-mono text-xs text-cyan/70 tracking-widest3 mb-4 leading-snug">
              {t('footer.brand_tagline')}
            </div>
            <p className="font-body text-white/50 text-sm leading-relaxed mb-6">
              {t('footer.brand_desc')}
            </p>
            {/* Cert badges */}
            <div className="flex flex-wrap gap-2" aria-label={t('footer.certifications_label')}>
              {CERT_BADGES.map((cert) => (
                <span
                  key={cert}
                  className="font-mono text-[10px] text-white/50 border border-white/20
                             px-2 py-0.5 tracking-widest3"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Column 2 — Services */}
          <div>
            <div className="font-mono text-xs text-white/40 tracking-widest2 uppercase mb-5">
              {t('footer.col_services')}
            </div>
            <ul className="space-y-2.5" role="list">
              {footerServices.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="font-body text-white/60 text-sm hover:text-cyan
                               transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div>
            <div className="font-mono text-xs text-white/40 tracking-widest2 uppercase mb-5">
              {t('footer.col_company')}
            </div>
            <ul className="space-y-2.5" role="list">
              {footerCompany.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="font-body text-white/60 text-sm hover:text-cyan
                               transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <div className="font-mono text-xs text-white/40 tracking-widest2 uppercase mb-5">
              {t('footer.col_contact')}
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-white/60 text-sm font-body">
                <PinIcon />
                <span>{CONTACT.address}</span>
              </div>
              <div className="flex items-center gap-3 text-white/60 text-sm font-body">
                <PhoneIcon />
                <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="hover:text-cyan transition-colors">
                  {CONTACT.phone}
                </a>
              </div>
              <div className="flex items-center gap-3 text-white/60 text-sm font-body">
                <MailIcon />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-cyan transition-colors">
                  {CONTACT.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-white/60 text-sm font-body">
                <GlobeIcon />
                <a href="https://bchiwale.ao" className="hover:text-cyan transition-colors">
                  {CONTACT.website}
                </a>
              </div>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/60 text-sm font-body
                           hover:text-cyan transition-colors mt-1"
                aria-label={t('footer.linkedin_label')}
              >
                <LinkedInIcon />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="font-body text-white/30 text-xs">
              {t('footer.copyright')}
            </span>
            <nav className="flex items-center gap-5" aria-label="Links legais">
              {[t('footer.privacy'), t('footer.terms'), t('footer.sitemap')].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="font-body text-white/30 text-xs hover:text-white/60 transition-colors"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
