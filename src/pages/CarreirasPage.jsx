import { useState } from 'react';
import { Link } from 'react-router-dom';

// ── Job listings ──
const JOBS = [
  {
    id: 1,
    title: 'Geólogo de Campo Sénior',
    dept: 'Geologia',
    location: 'Luanda / Campo (Angola)',
    type: 'Tempo Inteiro',
    level: 'Sénior',
    posted: 'Jun 2025',
    description: 'Liderança de campanhas de prospecção mineral e mapeamento geológico em diversas províncias angolanas. Elaboração de relatórios técnicos segundo padrões JORC.',
    requirements: [
      'Licenciatura em Geologia ou área afim (Mestrado preferencial)',
      'Mínimo 5 anos de experiência em prospecção mineral',
      'Experiência em amostragem geoquímica e mapeamento estrutural',
      'Capacidade de trabalho em condições de campo remoto',
      'Inglês técnico (nível profissional)',
    ],
  },
  {
    id: 2,
    title: 'Técnico de Geofísica Aplicada',
    dept: 'Geofísica',
    location: 'Luanda / Campo (Angola)',
    type: 'Tempo Inteiro',
    level: 'Júnior a Médio',
    posted: 'Jun 2025',
    description: 'Aquisição e processamento de dados geofísicos (ERT, magnetometria, sísmica) em projectos de exploração mineral e de recursos hídricos.',
    requirements: [
      'Licenciatura em Geofísica, Geologia ou Engenharia Geológica',
      '2+ anos de experiência em levantamentos geofísicos de campo',
      'Conhecimento de software de inversão (Res2DInv, Geosoft)',
      'Carta de condução válida',
    ],
  },
  {
    id: 3,
    title: 'Engenheiro Geotécnico',
    dept: 'Geotecnia',
    location: 'Luanda',
    type: 'Tempo Inteiro',
    level: 'Médio a Sénior',
    posted: 'Mai 2025',
    description: 'Planeamento e execução de campanhas de investigação geotécnica, análise de resultados de ensaios de laboratório e campo, elaboração de relatórios geotécnicos.',
    requirements: [
      'Licenciatura em Engenharia Civil (especialização Geotecnia)',
      '3+ anos de experiência em geotecnia de campo',
      'Conhecimento de ensaios SPT, CPT, PMT e triaxial',
      'Experiência com software de modelagem (Plaxis ou semelhante)',
      'Membro de ordem profissional (preferencial)',
    ],
  },
  {
    id: 4,
    title: 'Topógrafo / Técnico de GNSS e UAV',
    dept: 'Topografia',
    location: 'Luanda / Campo (Angola)',
    type: 'Tempo Inteiro',
    level: 'Médio',
    posted: 'Mai 2025',
    description: 'Execução de levantamentos topográficos com GNSS de dupla frequência e estações totais. Operação de drones para fotogrametria UAV. Processamento de dados cartográficos.',
    requirements: [
      'Curso técnico ou licenciatura em Topografia / Geodesia / Geomática',
      'Experiência com GNSS RTK (Leica, Trimble ou similar)',
      'Competências em fotogrametria UAV (certificado de piloto preferencial)',
      'Domínio de AutoCAD Civil 3D ou ArcGIS',
    ],
  },
  {
    id: 5,
    title: 'Especialista em Ambiente e EIA',
    dept: 'Ambiente',
    location: 'Luanda',
    type: 'Tempo Inteiro',
    level: 'Sénior',
    posted: 'Abr 2025',
    description: 'Coordenação e redacção de Estudos de Impacto Ambiental (EIA/RIMA) para projectos de mineração, infraestrutura e energia segundo legislação angolana e padrões IFC.',
    requirements: [
      'Licenciatura em Engenharia do Ambiente, Biologia ou afim (Mestrado preferencial)',
      'Mínimo 4 anos de experiência em elaboração de EIA em Angola',
      'Conhecimento aprofundado da legislação ambiental angolana (Lei 5/98, Decreto 51/04)',
      'Capacidade de articulação com o MINAMB',
      'Inglês técnico fluente',
    ],
  },
  {
    id: 6,
    title: 'Assistente Administrativo e de Projecto',
    dept: 'Administração',
    location: 'Luanda',
    type: 'Tempo Inteiro',
    level: 'Júnior',
    posted: 'Jun 2025',
    description: 'Apoio administrativo aos directores de projecto. Gestão de agenda, documentação técnica e contractual, controlo de despesas de campo e comunicação institucional.',
    requirements: [
      'Licenciatura em Gestão, Administração ou área afim',
      'Excelente domínio do Microsoft Office (Word, Excel, PowerPoint)',
      'Organização rigorosa e capacidade de trabalho sob pressão',
      'Bom nível de inglês escrito',
    ],
  },
];

const DEPARTMENTS = ['Todos', 'Geologia', 'Geofísica', 'Geotecnia', 'Topografia', 'Ambiente', 'Administração'];

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
      className="reveal bg-white border border-gray-mid transition-all duration-300 hover:shadow-card-hover"
      style={{ transitionDelay: `${(index % 6) * 60}ms` }}
      aria-labelledby={`job-title-${job.id}`}
    >
      <div className="p-7">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <div className="flex flex-wrap gap-2">
            <span className={DEPT_TAG[job.dept] || 'tag-gray'}>{job.dept}</span>
            <span className={LEVEL_TAG[job.level] || 'tag-gray'}>{job.level}</span>
          </div>
          <time className="font-mono text-xs text-gray-text shrink-0">{job.posted}</time>
        </div>
        <h3
          id={`job-title-${job.id}`}
          className="font-heading font-bold text-charcoal text-lg leading-snug tracking-tight mb-2"
        >
          {job.title}
        </h3>
        <div className="flex flex-wrap gap-4 mb-3">
          <span className="flex items-center gap-1.5 font-mono text-xs text-gray-text">
            <span aria-hidden="true">◎</span> {job.location}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-xs text-gray-text">
            <span aria-hidden="true">◷</span> {job.type}
          </span>
        </div>
        <p className="font-body text-gray-text text-sm leading-relaxed">{job.description}</p>

        {/* Expandable requirements */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 font-mono text-xs text-cyan hover:underline mt-4 transition-colors"
          aria-expanded={open}
          aria-controls={`job-req-${job.id}`}
        >
          {open ? 'OCULTAR REQUISITOS' : 'VER REQUISITOS'}
          <span aria-hidden="true" className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>▾</span>
        </button>
        {open && (
          <ul
            id={`job-req-${job.id}`}
            className="mt-4 space-y-2 border-t border-gray-mid pt-4"
          >
            {job.requirements.map((req) => (
              <li key={req} className="flex items-start gap-3 font-body text-xs text-gray-text leading-relaxed">
                <span className="text-cyan mt-0.5 shrink-0" aria-hidden="true">—</span>
                {req}
              </li>
            ))}
          </ul>
        )}

        <div className="flex gap-3 mt-5 pt-4 border-t border-gray-mid">
          <button
            onClick={() => onApply(job)}
            className="btn-primary text-xs py-2.5 px-6"
          >
            CANDIDATAR-SE <span aria-hidden="true">→</span>
          </button>
          <Link to="/contacto" className="btn-ghost text-xs py-2.5 px-6">
            MAIS INFORMAÇÕES
          </Link>
        </div>
      </div>
    </article>
  );
}

// Application modal (inline — no external modal lib)
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
        className="bg-white border border-gray-mid w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="bg-charcoal border-b-4 border-cyan p-6 flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-cyan tracking-widest mb-1">CANDIDATURA</p>
            <h3 className="font-heading font-bold text-white text-lg leading-snug">{job.title}</h3>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors font-mono text-sm" aria-label="Fechar">×</button>
        </div>
        {/* Modal body */}
        {sent ? (
          <div className="p-10 text-center">
            <div className="font-mono text-4xl text-cyan mb-4" aria-hidden="true">✓</div>
            <h4 className="font-heading font-bold text-charcoal text-lg mb-2">Candidatura enviada!</h4>
            <p className="font-body text-gray-text text-sm max-w-xs mx-auto">
              O nosso departamento de RH analisará o seu perfil e entrará em contacto.
            </p>
            <button className="btn-primary mt-6" onClick={onClose}>FECHAR</button>
          </div>
        ) : (
          <form className="p-7 space-y-4" onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="appl-nome" className="font-mono text-xs text-charcoal tracking-widest">NOME COMPLETO *</label>
              <input
                id="appl-nome"
                name="nome"
                type="text"
                required
                value={form.nome}
                onChange={handleChange}
                className="border border-gray-mid px-4 py-3 font-body text-sm text-charcoal focus:outline-none focus:border-cyan transition-colors"
                placeholder="O seu nome completo"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="appl-email" className="font-mono text-xs text-charcoal tracking-widest">EMAIL *</label>
              <input
                id="appl-email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="border border-gray-mid px-4 py-3 font-body text-sm text-charcoal focus:outline-none focus:border-cyan transition-colors"
                placeholder="email@exemplo.ao"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="appl-linkedin" className="font-mono text-xs text-charcoal tracking-widest">LINKEDIN / PORTFÓLIO</label>
              <input
                id="appl-linkedin"
                name="linkedin"
                type="url"
                value={form.linkedin}
                onChange={handleChange}
                className="border border-gray-mid px-4 py-3 font-body text-sm text-charcoal focus:outline-none focus:border-cyan transition-colors"
                placeholder="https://linkedin.com/in/..."
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="appl-mensagem" className="font-mono text-xs text-charcoal tracking-widest">CARTA DE MOTIVAÇÃO</label>
              <textarea
                id="appl-mensagem"
                name="mensagem"
                rows={4}
                value={form.mensagem}
                onChange={handleChange}
                className="border border-gray-mid px-4 py-3 font-body text-sm text-charcoal resize-none focus:outline-none focus:border-cyan transition-colors"
                placeholder="Por que razão quer fazer parte da B-CHIWALE?"
              />
            </div>
            <p className="font-body text-xs text-gray-text">
              Também pode enviar o seu CV directamente para{' '}
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

export default function CarreirasPage() {
  const [activeDept, setActiveDept] = useState('Todos');
  const [applyJob, setApplyJob] = useState(null);

  const filtered = activeDept === 'Todos'
    ? JOBS
    : JOBS.filter((j) => j.dept === activeDept);

  return (
    <>
      {/* Hero */}
      <section
        className="min-h-[44vh] flex items-end pb-16"
        style={{ background: 'linear-gradient(135deg, #1A1A2E 60%, #0d1829 100%)', borderBottom: '3px solid #00AEEF' }}
      >
        <div className="container">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 font-mono text-xs text-white/40">
              <li><Link to="/" className="hover:text-cyan transition-colors">Home</Link></li>
              <li aria-hidden="true" className="text-white/20">/</li>
              <li className="text-white/60" aria-current="page">Carreiras</li>
            </ol>
          </nav>
          <div className="section-rule" aria-hidden="true" />
          <h1 className="font-heading font-extrabold text-white text-4xl md:text-5xl tracking-tight mt-4">
            Faça parte da <em className="italic" style={{ color: '#00AEEF' }}>B-CHIWALE</em>
          </h1>
          <p className="font-body text-white/60 text-lg mt-3 max-w-xl">
            Junte-se a uma equipa de mais de 100 profissionais que estão a definir o futuro das geociências em Angola.
          </p>
          <div className="flex gap-8 mt-8">
            {[['6', 'Vagas abertas'], ['100+', 'Profissionais'], ['8+', 'Anos de crescimento']].map(([n, l]) => (
              <div key={l}>
                <div className="font-mono font-bold text-cyan text-2xl">{n}</div>
                <div className="font-body text-white/40 text-xs">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why B-CHIWALE */}
      <section className="section-pad bg-gray-light" aria-labelledby="why-title">
        <div className="container">
          <header className="mb-10">
            <div className="section-rule" aria-hidden="true" />
            <p className="eyebrow">PORQUÊ TRABALHAR CONNOSCO</p>
            <h2 className="section-title" id="why-title">Uma carreira com <em>impacto real</em></h2>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: '⬡', title: 'Projectos de Referência', desc: 'Trabalhe em projectos de impacto nacional em 18 províncias angolanas.' },
              { icon: '↑', title: 'Progressão Acelerada', desc: 'Planos de carreira claros com avaliações semestrais e promoções baseadas em mérito.' },
              { icon: '◎', title: 'Formação Contínua', desc: 'Acesso a webinars, certificações e programas de formação técnica interna.' },
              { icon: '✦', title: 'Equipa Multidisciplinar', desc: 'Colabore com geólogos, geofísicos, engenheiros e especialistas ambientais.' },
            ].map((v, i) => (
              <div
                key={v.title}
                className="reveal bg-white border border-gray-mid border-t-4 border-t-cyan p-6 flex flex-col gap-3"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <span className="text-cyan text-2xl" aria-hidden="true">{v.icon}</span>
                <h3 className="font-heading font-bold text-charcoal text-sm">{v.title}</h3>
                <p className="font-body text-gray-text text-xs leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job listings */}
      <section className="section-pad" aria-labelledby="jobs-title">
        <div className="container">
          <header className="mb-8">
            <div className="section-rule" aria-hidden="true" />
            <p className="eyebrow">OPORTUNIDADES</p>
            <h2 className="section-title" id="jobs-title">Vagas <em>abertas</em></h2>
          </header>

          {/* Department filters */}
          <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filtrar por departamento">
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveDept(dept)}
                className={`font-mono text-xs tracking-widest px-4 py-2 border transition-colors ${
                  activeDept === dept
                    ? 'bg-cyan text-white border-cyan'
                    : 'bg-white text-charcoal border-gray-mid hover:border-cyan hover:text-cyan'
                }`}
              >
                {dept.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Jobs grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-body text-gray-text">Não há vagas abertas neste departamento de momento.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filtered.map((job, i) => (
                <JobCard key={job.id} job={job} index={i} onApply={setApplyJob} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Spontaneous application strip */}
      <section className="py-14 bg-gray-light border-t border-gray-mid">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="section-rule" aria-hidden="true" />
            <p className="eyebrow">CANDIDATURA ESPONTÂNEA</p>
            <h2 className="font-heading font-bold text-charcoal text-2xl tracking-tight mt-1 mb-3">
              Não encontrou a vaga <em>certa?</em>
            </h2>
            <p className="font-body text-gray-text text-sm leading-relaxed">
              Envie o seu CV e carta de motivação para o nosso email de RH. Guardamos os perfis durante 12 meses e contactamo-lo quando surgir uma vaga adequada.
            </p>
          </div>
          <div className="flex flex-col gap-4 md:items-end">
            <a
              href="mailto:rh@bchiwale.ao?subject=Candidatura Espontânea"
              className="btn-primary"
            >
              ENVIAR CV ESPONTÂNEO <span aria-hidden="true">→</span>
            </a>
            <p className="font-mono text-xs text-gray-text">
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
