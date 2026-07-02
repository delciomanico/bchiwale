import { useState } from 'react';
import { Link } from 'react-router-dom';
import { JOBS, JOB_DEPARTMENTS } from '../data/siteData';

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
          {open ? 'Ocultar requisitos' : 'Ver requisitos'}
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
            Candidatar-se <span aria-hidden="true">→</span>
          </button>
          <Link
            to="/contacto"
            className="font-mono text-[11px] text-charcoal/40 hover:text-charcoal transition-colors"
          >
            Mais informações
          </Link>
        </div>
      </div>
    </article>
  );
}

// Application modal
function ApplyModal({ job, onClose }) {
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
      aria-label={`Candidatura: ${job.title}`}
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="bg-charcoal border-b border-white/10 p-6 flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] text-cyan tracking-[0.18em] uppercase mb-1">CANDIDATURA</p>
            <h3 className="font-heading font-semibold text-white text-lg leading-snug">{job.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/35 hover:text-white transition-colors font-mono text-sm"
            aria-label="Fechar"
          >
            ×
          </button>
        </div>
        {/* Modal body */}
        {sent ? (
          <div className="p-10 text-center">
            <div className="font-mono text-3xl text-cyan mb-4" aria-hidden="true">✓</div>
            <h4 className="font-heading font-semibold text-charcoal text-lg mb-2">Candidatura enviada!</h4>
            <p className="font-body text-gray-text text-sm max-w-xs mx-auto leading-relaxed">
              O nosso departamento de RH analisará o seu perfil e entrará em contacto.
            </p>
            <button className="btn-primary mt-6" onClick={onClose}>FECHAR</button>
          </div>
        ) : (
          <form className="p-7 space-y-4" onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="appl-nome" className="font-mono text-[10px] text-charcoal tracking-[0.18em] uppercase">
                Nome completo *
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
                placeholder="O seu nome completo"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="appl-email" className="font-mono text-[10px] text-charcoal tracking-[0.18em] uppercase">
                Email *
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
                placeholder="email@exemplo.ao"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="appl-linkedin" className="font-mono text-[10px] text-charcoal tracking-[0.18em] uppercase">
                LinkedIn / Portfólio
              </label>
              <input
                id="appl-linkedin"
                name="linkedin"
                type="url"
                value={form.linkedin}
                onChange={handleChange}
                className="border border-charcoal/15 px-4 py-3 font-body text-sm text-charcoal
                           focus:outline-none focus:border-cyan transition-colors"
                placeholder="https://linkedin.com/in/..."
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="appl-mensagem" className="font-mono text-[10px] text-charcoal tracking-[0.18em] uppercase">
                Carta de motivação
              </label>
              <textarea
                id="appl-mensagem"
                name="mensagem"
                rows={4}
                value={form.mensagem}
                onChange={handleChange}
                className="border border-charcoal/15 px-4 py-3 font-body text-sm text-charcoal
                           resize-none focus:outline-none focus:border-cyan transition-colors"
                placeholder="Por que razão quer fazer parte da B-CHIWALE?"
              />
            </div>
            <p className="font-body text-xs text-gray-text leading-relaxed">
              Também pode enviar o seu CV para{' '}
              <a href="mailto:rh@bchiwale.ao" className="text-cyan hover:underline">rh@bchiwale.ao</a>
              {' '}com o nome da vaga no assunto.
            </p>
            <button type="submit" className="btn-primary w-full">
              ENVIAR CANDIDATURA <span aria-hidden="true">→</span>
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
  const [activeDept, setActiveDept] = useState('Todos');
  const [applyJob, setApplyJob] = useState(null);

  const filtered = activeDept === 'Todos'
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
          style={{ backgroundImage: 'url(/images/gallery7.jpg)' }}
          aria-hidden="true"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(10,14,22,0.78)' }} aria-hidden="true" />
        <div className="relative z-10 container">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 font-mono text-xs text-white/40">
              <li><Link to="/" className="hover:text-cyan transition-colors">Home</Link></li>
              <li aria-hidden="true" className="text-white/20">/</li>
              <li className="text-white/60" aria-current="page">Carreiras</li>
            </ol>
          </nav>
          <h1 className="font-heading font-semibold text-white text-4xl md:text-5xl tracking-tight">
            Faça parte da <em className="italic" style={{ color: '#00AEEF' }}>B-CHIWALE</em>
          </h1>
          <p className="font-body text-white/55 text-lg mt-4 max-w-xl leading-relaxed">
            Junte-se a uma equipa de mais de 100 profissionais que estão a definir o futuro das geociências em Angola.
          </p>
          <div className="flex gap-10 mt-10">
            {[['6', 'Vagas abertas'], ['100+', 'Profissionais'], ['8+', 'Anos de crescimento']].map(([n, l]) => (
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
            <p className="eyebrow">PORQUÊ TRABALHAR CONNOSCO</p>
            <h2 className="section-title" id="why-title">Uma carreira com <em>impacto real</em></h2>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '⬡', title: 'Projectos de Referência', desc: 'Trabalhe em projectos de impacto nacional em 21 províncias angolanas.' },
              { icon: '↑', title: 'Progressão Acelerada', desc: 'Planos de carreira claros com avaliações semestrais e promoções baseadas em mérito.' },
              { icon: '◎', title: 'Formação Contínua', desc: 'Acesso a webinars, certificações e programas de formação técnica interna.' },
              { icon: '✦', title: 'Equipa Multidisciplinar', desc: 'Colabore com geólogos, geofísicos, engenheiros e especialistas ambientais.' },
            ].map((v, i) => (
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
            <p className="eyebrow">OPORTUNIDADES</p>
            <h2 className="section-title" id="jobs-title">Vagas <em>abertas</em></h2>
          </header>

          {/* Department filters */}
          <div className="flex flex-wrap gap-6 mb-12" role="group" aria-label="Filtrar por departamento">
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
              <p className="font-body text-gray-text">Não há vagas abertas neste departamento de momento.</p>
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
            <p className="eyebrow">CANDIDATURA ESPONTÂNEA</p>
            <h2 className="font-heading font-semibold text-charcoal text-2xl tracking-tight mt-1 mb-3">
              Não encontrou a vaga <em>certa?</em>
            </h2>
            <p className="font-body text-gray-text text-sm leading-relaxed">
              Envie o seu CV e carta de motivação para o nosso email de RH. Guardamos os perfis durante 12 meses
              e contactamo-lo quando surgir uma vaga adequada.
            </p>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <a
              href="mailto:rh@bchiwale.ao?subject=Candidatura Espontânea"
              className="font-body font-medium text-charcoal border-b border-charcoal/25
                         hover:text-cyan hover:border-cyan transition-colors pb-0.5 text-[15px]"
            >
              Enviar CV espontâneo <span aria-hidden="true">→</span>
            </a>
            <p className="font-mono text-[11px] text-charcoal/35">
              <a href="mailto:rh@bchiwale.ao" className="hover:text-cyan transition-colors">rh@bchiwale.ao</a>
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
