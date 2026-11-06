import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSiteData } from '../contexts/ContentContext';
import { useLang } from '../contexts/LangContext';
import Rich from '../components/Rich';
import { usePageMeta } from '../hooks/usePageMeta';

// Tag class mapping — plain mono text after global update
const DEPT_TAG = {
  Geologia: 'tag-cyan',
  Geofísica: 'tag-cyan',
  Geotecnia: 'tag-cyan',
  Topografia: 'tag-cyan',
  Ambiente: 'tag-cyan',
  Administração: 'tag-gray',
};

const LEVEL_TAG = {
  'Júnior': 'tag-gray',
  'Júnior a Médio': 'tag-gray',
  'Médio': 'tag-yellow',
  'Médio a Sénior': 'tag-yellow',
  'Sénior': 'tag-cyan',
};

function JobCard({ job, index, onApply }) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  return (
    <article
      className="reveal bg-white transition-all duration-300 hover:shadow-[0_6px_24px_rgba(0,0,0,0.07)]"
      style={{ transitionDelay: `${(index % 6) * 60}ms` }}
      aria-labelledby={`job-title-${job.id}`}
    >
      <div className="p-7">
        {/* Tags + date */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <div className="flex flex-wrap gap-4">
            <span className={DEPT_TAG[job.dept] || 'tag-gray'}>{job.dept}</span>
            <span className={LEVEL_TAG[job.level] || 'tag-gray'}>{job.level}</span>
          </div>
          <time className="font-mono text-[10px] text-charcoal/35 tracking-[0.12em] shrink-0">{job.posted}</time>
        </div>

        <h3
          id={`job-title-${job.id}`}
          className="font-heading font-semibold text-charcoal text-lg leading-snug tracking-tight mb-2"
        >
          {job.title}
        </h3>

        <div className="flex flex-wrap gap-4 mb-3">
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-charcoal/40 tracking-[0.12em]">
            <span aria-hidden="true">◎</span> {job.location}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-charcoal/40 tracking-[0.12em]">
            <span aria-hidden="true">◷</span> {job.type}
          </span>
        </div>

        <p className="font-body text-gray-text text-sm leading-relaxed">{job.description}</p>

        {/* Expandable requirements */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 font-mono text-[10px] text-cyan hover:underline mt-4 transition-colors tracking-[0.12em] uppercase"
          aria-expanded={open}
          aria-controls={`job-req-${job.id}`}
        >
          {open ? t('carreiras.hide_req') : t('carreiras.show_req')}
          <span aria-hidden="true" className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>▾</span>
        </button>

        {open && (
          <ul
            id={`job-req-${job.id}`}
            className="mt-4 space-y-2 border-t border-charcoal/8 pt-4"
          >
            {job.requirements.map((req) => (
              <li key={req} className="flex items-start gap-3 font-body text-xs text-gray-text leading-relaxed">
                <span className="text-charcoal/30 mt-0.5 shrink-0" aria-hidden="true">—</span>
                {req}
              </li>
            ))}
          </ul>
        )}

        <div className="flex gap-4 mt-5 pt-4 border-t border-charcoal/8">
          <button
            onClick={() => onApply(job)}
            className="font-body font-medium text-charcoal border-b border-charcoal/25
                       hover:text-cyan hover:border-cyan transition-colors pb-0.5 text-[14px]"
          >
            {t('carreiras.apply')} <span aria-hidden="true">→</span>
          </button>
          <Link
            to="/contacto"
            className="font-mono text-[11px] text-charcoal/40 hover:text-charcoal transition-colors"
          >
            {t('carreiras.more_info')}
          </Link>
        </div>
      </div>
    </article>
  );
}

// Application modal
function ApplyModal({ job, onClose }) {
  const { t } = useLang();
  const hrEmail = t('carreiras.hr_email');
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nome: '', email: '', linkedin: '', mensagem: '' });

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  if (!job) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(10,10,20,0.90)' }}
      role="dialog"
      aria-modal="true"
      aria-label={`${t('carreiras.application')}: ${job.title}`}
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="bg-charcoal border-b border-white/10 p-6 flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] text-cyan tracking-[0.18em] uppercase mb-1">{t('carreiras.application_caps')}</p>
            <h3 className="font-heading font-semibold text-white text-lg leading-snug">{job.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/35 hover:text-white transition-colors font-mono text-sm"
            aria-label={t('common.close')}
          >
            ×
          </button>
        </div>
        {/* Modal body */}
        {sent ? (
          <div className="p-10 text-center">
            <div className="font-mono text-3xl text-cyan mb-4" aria-hidden="true">✓</div>
            <h4 className="font-heading font-semibold text-charcoal text-lg mb-2">{t('carreiras.sent_title')}</h4>
            <p className="font-body text-gray-text text-sm max-w-xs mx-auto leading-relaxed">
              {t('carreiras.sent_body')}
            </p>
            <button className="btn-primary mt-6" onClick={onClose}>{t('common.close_caps')}</button>
          </div>
        ) : (
          <form className="p-7 space-y-4" onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="appl-nome" className="font-mono text-[10px] text-charcoal tracking-[0.18em] uppercase">
                {t('contacto.name')}
              </label>
              <input
                id="appl-nome"
                name="nome"
                type="text"
                required
                value={form.nome}
                onChange={handleChange}
                className="border border-charcoal/15 px-4 py-3 font-body text-sm text-charcoal
                           focus:outline-none focus:border-cyan transition-colors"
                placeholder={t('carreiras.name_ph')}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="appl-email" className="font-mono text-[10px] text-charcoal tracking-[0.18em] uppercase">
                {t('contacto.email')}
              </label>
              <input
                id="appl-email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="border border-charcoal/15 px-4 py-3 font-body text-sm text-charcoal
                           focus:outline-none focus:border-cyan transition-colors"
                placeholder={t('carreiras.email_ph')}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="appl-linkedin" className="font-mono text-[10px] text-charcoal tracking-[0.18em] uppercase">
                {t('carreiras.linkedin')}
              </label>
              <input
                id="appl-linkedin"
                name="linkedin"
                type="url"
                value={form.linkedin}
                onChange={handleChange}
                className="border border-charcoal/15 px-4 py-3 font-body text-sm text-charcoal
                           focus:outline-none focus:border-cyan transition-colors"
                placeholder={t('carreiras.linkedin_ph')}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="appl-mensagem" className="font-mono text-[10px] text-charcoal tracking-[0.18em] uppercase">
                {t('carreiras.cover')}
              </label>
              <textarea
                id="appl-mensagem"
                name="mensagem"
                rows={4}
                value={form.mensagem}
                onChange={handleChange}
                className="border border-charcoal/15 px-4 py-3 font-body text-sm text-charcoal
                           resize-none focus:outline-none focus:border-cyan transition-colors"
                placeholder={t('carreiras.cover_ph')}
              />
            </div>
            <p className="font-body text-xs text-gray-text leading-relaxed">
              {t('carreiras.cv_hint')}{' '}
              <a href={`mailto:${hrEmail}`} className="text-cyan hover:underline">{hrEmail}</a>
              {' '}{t('carreiras.cv_hint_end')}
            </p>
            <button type="submit" className="btn-primary w-full">
              {t('carreiras.submit')} <span aria-hidden="true">→</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// Underline-style filter button
function FilterBtn({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`font-mono text-[10px] tracking-[0.18em] uppercase pb-1 border-b transition-colors ${
        active
          ? 'border-charcoal text-charcoal'
          : 'border-transparent text-charcoal/40 hover:text-charcoal hover:border-charcoal/30'
      }`}
    >
      {label}
    </button>
  );
}

export default function CarreirasPage() {
  const { JOBS, JOB_DEPARTMENTS, SITE_IMAGES } = useSiteData();
  const { t } = useLang();
  const hrEmail = t('carreiras.hr_email');
  usePageMeta(t('meta.carreiras_title'), t('meta.carreiras_description'), '/carreiras');
  const [activeDept, setActiveDept] = useState(JOB_DEPARTMENTS[0]);
  const [applyJob, setApplyJob] = useState(null);

  const filtered = activeDept === JOB_DEPARTMENTS[0]
    ? JOBS
    : JOBS.filter((j) => j.dept === activeDept);

  return (
    <>
      {/* Page hero */}
      <section
        className="relative min-h-[calc(44vh+72px)] flex items-end pb-16"
        style={{
          borderBottom: '1px solid rgba(0,174,239,0.2)',
          paddingTop: '72px',
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${SITE_IMAGES.hero_carreiras})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(10,14,22,0.78)' }} aria-hidden="true" />
        <div className="relative z-10 container">
          <nav aria-label={t('common.breadcrumb')} className="mb-6">
            <ol className="flex items-center gap-2 font-mono text-xs text-white/40">
              <li><Link to="/" className="hover:text-cyan transition-colors">{t('common.home')}</Link></li>
              <li aria-hidden="true" className="text-white/20">/</li>
              <li className="text-white/60" aria-current="page">{t('carreiras.breadcrumb')}</li>
            </ol>
          </nav>
          <h1 className="font-heading font-semibold text-white text-4xl md:text-5xl tracking-tight">
            <Rich text={t('carreiras.hero_title')} emClassName="italic" emStyle={{ color: '#00AEEF' }} />
          </h1>
          <p className="font-body text-white/55 text-lg mt-4 max-w-xl leading-relaxed">
            {t('carreiras.hero_subtitle')}
          </p>
          <div className="flex gap-10 mt-10">
            {[[String(JOBS.length), t('carreiras.stat_jobs')], [t('carreiras.stat2_value'), t('carreiras.stat2_label')], [t('carreiras.stat3_value'), t('carreiras.stat3_label')]].map(([n, l]) => (
              <div key={l}>
                <div className="font-heading font-light text-white text-2xl leading-none">{n}</div>
                <div className="font-mono text-[10px] text-white/35 tracking-[0.18em] uppercase mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why B-CHIWALE — white, no gray background */}
      <section className="section-pad bg-white border-b border-charcoal/8" aria-labelledby="why-title">
        <div className="container">
          <header className="mb-10">
            <p className="eyebrow">{t('carreiras.why_eyebrow')}</p>
            <h2 className="section-title" id="why-title"><Rich text={t('carreiras.why_title')} /></h2>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((n) => ({ icon: ['⬡', '↑', '◎', '✦'][n - 1], title: t(`carreiras.why${n}_title`), desc: t(`carreiras.why${n}_desc`) })).map((v, i) => (
              <div
                key={v.title}
                className="reveal flex flex-col gap-3"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <span className="text-charcoal/30 text-xl" aria-hidden="true">{v.icon}</span>
                <h3 className="font-heading font-semibold text-charcoal text-sm">{v.title}</h3>
                <p className="font-body text-gray-text text-xs leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job listings */}
      <section className="section-pad bg-white" aria-labelledby="jobs-title">
        <div className="container">
          <header className="mb-8">
            <p className="eyebrow">{t('carreiras.jobs_eyebrow')}</p>
            <h2 className="section-title" id="jobs-title"><Rich text={t('carreiras.jobs_title')} /></h2>
          </header>

          {/* Department filters */}
          <div className="flex flex-wrap gap-6 mb-12" role="group" aria-label={t('carreiras.filter_label')}>
            {JOB_DEPARTMENTS.map((dept) => (
              <FilterBtn
                key={dept}
                label={dept}
                active={activeDept === dept}
                onClick={() => setActiveDept(dept)}
              />
            ))}
          </div>

          {/* Jobs grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-body text-gray-text">{t('carreiras.no_jobs')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filtered.map((job, i) => (
                <JobCard key={job.id} job={job} index={i} onApply={setApplyJob} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Spontaneous application */}
      <section className="py-14 bg-white border-t border-charcoal/8">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="eyebrow">{t('carreiras.spont_eyebrow')}</p>
            <h2 className="font-heading font-semibold text-charcoal text-2xl tracking-tight mt-1 mb-3">
              <Rich text={t('carreiras.spont_title')} />
            </h2>
            <p className="font-body text-gray-text text-sm leading-relaxed">
              {t('carreiras.spont_body')}
            </p>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <a
              href={`mailto:${hrEmail}?subject=${encodeURIComponent(t('carreiras.spont_subject'))}`}
              className="font-body font-medium text-charcoal border-b border-charcoal/25
                         hover:text-cyan hover:border-cyan transition-colors pb-0.5 text-[15px]"
            >
              {t('carreiras.spont_cta')} <span aria-hidden="true">→</span>
            </a>
            <p className="font-mono text-[11px] text-charcoal/35">
              <a href={`mailto:${hrEmail}`} className="hover:text-cyan transition-colors">{hrEmail}</a>
            </p>
          </div>
        </div>
      </section>

      {/* Application modal */}
      {applyJob && (
        <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} />
      )}
    </>
  );
}
