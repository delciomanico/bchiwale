import { useState } from 'react';
import { Link } from 'react-router-dom';

// ── Downloads data ──
const DOWNLOADS = [
  {
    id: 1,
    type: 'PDF',
    cat: 'Técnico',
    title: 'Guia de Prospecção Mineral em Angola',
    desc: 'Metodologias, normas JORC e enquadramento legal.',
    size: '2.4 MB',
    accentColor: '#00AEEF',
  },
  {
    id: 2,
    type: 'PDF',
    cat: 'Legislação',
    title: 'Resumo da Lei Mineira 31/11',
    desc: 'Principais artigos, tipos de títulos mineiros e prazos.',
    size: '1.1 MB',
    accentColor: '#F5C200',
  },
  {
    id: 3,
    type: 'XLSX',
    cat: 'Técnico',
    title: 'Template: Relatório de Recursos JORC',
    desc: 'Estrutura base para relatório de recursos JORC 2012.',
    size: '380 KB',
    accentColor: '#00AEEF',
  },
  {
    id: 4,
    type: 'PDF',
    cat: 'Técnico',
    title: 'Ficha Técnica: Levantamento ERT',
    desc: 'Parâmetros, equipamentos e metodologia dos levantamentos de resistividade.',
    size: '900 KB',
    accentColor: '#00AEEF',
  },
  {
    id: 5,
    type: 'PDF',
    cat: 'Legislação',
    title: 'Decreto 51/04 — EIA em Angola',
    desc: 'Texto integral do decreto regulamentador de estudos de impacto ambiental.',
    size: '1.8 MB',
    accentColor: '#F5C200',
  },
  {
    id: 6,
    type: 'DOCX',
    cat: 'Template',
    title: 'Modelo de Contrato de Serviços Geotécnicos',
    desc: 'Modelo base ajustável para contratos de investigação geotécnica.',
    size: '210 KB',
    accentColor: '#00AEEF',
  },
];

// ── Events data ──
const EVENTS = [
  {
    id: 1,
    date: 'Jul 2025',
    day: '15',
    month: 'JUL',
    title: 'Webinar: Estimativa de Recursos JORC para Técnicos Angolanos',
    type: 'Webinar Online',
    time: '10h00 – 12h00 WAT',
    free: true,
  },
  {
    id: 2,
    date: 'Ago 2025',
    day: '22',
    month: 'AGO',
    title: 'Workshop: Fundamentos de Geofísica Aplicada à Mineração',
    type: 'Presencial · Luanda',
    time: '09h00 – 17h00 WAT',
    free: false,
  },
  {
    id: 3,
    date: 'Set 2025',
    day: '10',
    month: 'SET',
    title: 'Angola Mining & Geosciences Forum 2025',
    type: 'Conferência · Luanda',
    time: 'Dois dias',
    free: false,
  },
  {
    id: 4,
    date: 'Out 2025',
    day: '08',
    month: 'OUT',
    title: 'Webinar: Processo de Licenciamento Mineiro no MIREMPET',
    type: 'Webinar Online',
    time: '14h00 – 15h30 WAT',
    free: true,
  },
];

// ── Technical tools ──
const TOOLS = [
  {
    title: 'Tabela Periódica Geoquímica',
    desc: 'Referência rápida para análise de elementos em amostras de solo e rocha.',
    icon: '⬡',
    href: '#ferramentas',
  },
  {
    title: 'Classificação de Solos (USCS/HRB)',
    desc: 'Classificação visual de solos segundo sistemas USCS e HRB para geotécnicos.',
    icon: '▦',
    href: '#ferramentas',
  },
  {
    title: 'Calculadora de Escala Topográfica',
    desc: 'Converta medidas de campo para escala cartográfica e vice-versa.',
    icon: '⊞',
    href: '#ferramentas',
  },
  {
    title: 'Conversor de Coordenadas UTM ↔ WGS84',
    desc: 'Converta coordenadas geográficas entre sistemas de referência comuns.',
    icon: '⊕',
    href: '#ferramentas',
  },
];

// ── Budget calculator fields ──
const SERVICES_OPTIONS = [
  'Geologia e Prospecção Mineral',
  'Geofísica Aplicada',
  'Engenharia Geotécnica',
  'Topografia e Geodesia',
  'Ambiente e Gestão Territorial',
  'Exploração de Águas Subterrâneas',
  'Consultoria, Tramitação e Acompanhamento',
];

export default function RecursosPage() {
  const [form, setForm] = useState({ nome: '', email: '', servico: '', area: '', descricao: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <>
      {/* Page hero */}
      <section
        className="min-h-[calc(40vh+72px)] flex items-end pb-16"
        style={{
          background: 'linear-gradient(135deg, #1A1A2E 60%, #0d1829 100%)',
          borderBottom: '1px solid rgba(0,174,239,0.2)',
          paddingTop: '72px',
        }}
      >
        <div className="container">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 font-mono text-xs text-white/40">
              <li><Link to="/" className="hover:text-cyan transition-colors">Home</Link></li>
              <li aria-hidden="true" className="text-white/20">/</li>
              <li className="text-white/60" aria-current="page">Recursos</li>
            </ol>
          </nav>
          <h1 className="font-heading font-semibold text-white text-4xl md:text-5xl tracking-tight">
            Centro de <em className="italic" style={{ color: '#00AEEF' }}>Recursos</em>
          </h1>
          <p className="font-body text-white/55 text-lg mt-4 max-w-xl leading-relaxed">
            Ferramentas, downloads, eventos e calculadora de orçamentos para projectos de geociências.
          </p>
        </div>
      </section>

      {/* Quick links nav — white, hairline border */}
      <nav className="bg-white border-b border-charcoal/8 py-4" aria-label="Secções desta página">
        <div className="container">
          <div className="flex flex-wrap gap-6">
            {[
              ['#calculadora', 'Calculadora de Orçamentos'],
              ['#downloads', 'Centro de Downloads'],
              ['#eventos', 'Calendário de Eventos'],
              ['#ferramentas', 'Ferramentas Técnicas'],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="font-mono text-[10px] text-charcoal/45 tracking-[0.18em] uppercase
                           hover:text-charcoal transition-colors pb-0.5 border-b border-transparent
                           hover:border-charcoal/30"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── 1. Calculator ── */}
      <section id="calculadora" className="section-pad bg-white" aria-labelledby="calc-title">
        <div className="container">
          <header className="mb-10">
            <p className="eyebrow">FERRAMENTA</p>
            <h2 className="section-title" id="calc-title">Calculadora de <em>Orçamentos</em></h2>
            <p className="section-subtitle mt-2">
              Descreva o seu projecto e receba uma estimativa de custo em 24–48 horas.
            </p>
          </header>
          <div className="max-w-2xl">
            {submitted ? (
              <div className="bg-white border-l-2 border-l-cyan/40 p-10 text-center">
                <div className="font-mono text-3xl text-cyan mb-4" aria-hidden="true">✓</div>
                <h3 className="font-heading font-semibold text-charcoal text-xl mb-2">Pedido enviado com sucesso</h3>
                <p className="font-body text-gray-text text-sm max-w-sm mx-auto leading-relaxed">
                  A nossa equipa técnica analisará as suas necessidades e entrará em contacto em 24–48 horas
                  com uma proposta detalhada.
                </p>
                <button
                  className="btn-ghost mt-6"
                  onClick={() => { setSubmitted(false); setForm({ nome: '', email: '', servico: '', area: '', descricao: '' }); }}
                >
                  NOVO PEDIDO
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="rc-nome" className="font-mono text-[10px] text-charcoal tracking-[0.18em] uppercase">
                      Nome *
                    </label>
                    <input
                      id="rc-nome"
                      name="nome"
                      type="text"
                      required
                      value={form.nome}
                      onChange={handleChange}
                      className="border border-charcoal/15 px-4 py-3 font-body text-sm text-charcoal
                                 focus:outline-none focus:border-cyan transition-colors"
                      placeholder="O seu nome"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="rc-email" className="font-mono text-[10px] text-charcoal tracking-[0.18em] uppercase">
                      Email *
                    </label>
                    <input
                      id="rc-email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="border border-charcoal/15 px-4 py-3 font-body text-sm text-charcoal
                                 focus:outline-none focus:border-cyan transition-colors"
                      placeholder="email@empresa.ao"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="rc-servico" className="font-mono text-[10px] text-charcoal tracking-[0.18em] uppercase">
                    Serviço pretendido *
                  </label>
                  <select
                    id="rc-servico"
                    name="servico"
                    required
                    value={form.servico}
                    onChange={handleChange}
                    className="border border-charcoal/15 px-4 py-3 font-body text-sm text-charcoal
                               focus:outline-none focus:border-cyan transition-colors bg-white"
                  >
                    <option value="">Seleccione o serviço</option>
                    {SERVICES_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="rc-area" className="font-mono text-[10px] text-charcoal tracking-[0.18em] uppercase">
                    Área / extensão do projecto
                  </label>
                  <input
                    id="rc-area"
                    name="area"
                    type="text"
                    value={form.area}
                    onChange={handleChange}
                    className="border border-charcoal/15 px-4 py-3 font-body text-sm text-charcoal
                               focus:outline-none focus:border-cyan transition-colors"
                    placeholder="Ex: 500 ha, 20 km de corredor, 10 sondagens..."
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="rc-descricao" className="font-mono text-[10px] text-charcoal tracking-[0.18em] uppercase">
                    Descrição do projecto *
                  </label>
                  <textarea
                    id="rc-descricao"
                    name="descricao"
                    rows={4}
                    required
                    value={form.descricao}
                    onChange={handleChange}
                    className="border border-charcoal/15 px-4 py-3 font-body text-sm text-charcoal
                               resize-none focus:outline-none focus:border-cyan transition-colors"
                    placeholder="Descreva os objectivos, localização e especificações técnicas do projecto..."
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  SOLICITAR ESTIMATIVA <span aria-hidden="true">→</span>
                </button>
                <p className="font-body text-xs text-gray-text text-center">
                  Resposta em 24–48 horas úteis. Proposta sem compromisso.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── 2. Downloads ── */}
      <section id="downloads" className="section-pad bg-white border-t border-charcoal/8" aria-labelledby="dl-title">
        <div className="container">
          <header className="mb-10">
            <p className="eyebrow">CENTRO DE DOWNLOADS</p>
            <h2 className="section-title" id="dl-title">Documentos <em>técnicos</em></h2>
            <p className="section-subtitle mt-2">
              Guias, templates e documentação regulatória de utilidade para projectos de geociências.
            </p>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DOWNLOADS.map((doc, i) => (
              <div
                key={doc.id}
                className="reveal bg-white flex flex-col gap-4
                           hover:shadow-[0_6px_24px_rgba(0,0,0,0.07)] transition-all duration-300"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="flex items-start justify-between gap-3">
                  {/* File type — plain mono, accent color */}
                  <span
                    className="font-mono font-medium text-[10px] tracking-[0.18em] uppercase"
                    style={{ color: doc.accentColor }}
                  >
                    {doc.type}
                  </span>
                  <span className="tag-gray">{doc.cat}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-charcoal text-sm leading-snug mb-1">{doc.title}</h3>
                  <p className="font-body text-gray-text text-xs leading-relaxed">{doc.desc}</p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-charcoal/8">
                  <span className="font-mono text-[10px] text-charcoal/30 tracking-[0.12em]">{doc.size}</span>
                  <Link
                    to="/contacto"
                    className="font-mono text-[10px] text-cyan hover:underline tracking-[0.12em]"
                    aria-label={`Solicitar ${doc.title}`}
                  >
                    Solicitar <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <p className="font-body text-gray-text text-xs mt-8 text-center leading-relaxed">
            Para aceder aos documentos, contacte a nossa equipa. Alguns ficheiros requerem autenticação.
          </p>
        </div>
      </section>

      {/* ── 3. Events ── */}
      <section id="eventos" className="section-pad bg-white border-t border-charcoal/8" aria-labelledby="ev-title">
        <div className="container">
          <header className="mb-10">
            <p className="eyebrow">CALENDÁRIO</p>
            <h2 className="section-title" id="ev-title">Eventos e <em>Formações</em></h2>
            <p className="section-subtitle mt-2">
              Webinars, workshops e conferências organizados ou apoiados pela B-CHIWALE.
            </p>
          </header>
          <div className="space-y-4 max-w-3xl">
            {EVENTS.map((ev, i) => (
              <article
                key={ev.id}
                className="reveal bg-white flex items-stretch
                           hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow duration-300 group"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                {/* Date block */}
                <div
                  className="flex flex-col items-center justify-center w-20 shrink-0 bg-charcoal text-white p-4 text-center"
                  aria-label={ev.date}
                >
                  <span className="font-heading font-light text-white text-2xl leading-none">{ev.day}</span>
                  <span className="font-mono text-[9px] text-white/35 tracking-[0.18em] mt-1">{ev.month}</span>
                </div>
                {/* Content */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between flex-1 gap-3 p-5">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-heading font-semibold text-charcoal text-sm leading-snug tracking-tight">
                      {ev.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 mt-1">
                      <span className="font-mono text-[10px] text-charcoal/40 tracking-[0.12em]">{ev.type}</span>
                      <span className="font-mono text-[10px] text-charcoal/20">·</span>
                      <span className="font-mono text-[10px] text-charcoal/40 tracking-[0.12em]">{ev.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    {ev.free && (
                      <span className="tag-cyan">GRATUITO</span>
                    )}
                    <Link
                      to="/contacto"
                      className="font-mono text-[10px] text-cyan hover:underline tracking-[0.12em] uppercase whitespace-nowrap"
                    >
                      Inscrever <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Technical tools ── */}
      <section id="ferramentas" className="section-pad bg-white border-t border-charcoal/8" aria-labelledby="tools-title">
        <div className="container">
          <header className="mb-10">
            <p className="eyebrow">FERRAMENTAS TÉCNICAS</p>
            <h2 className="section-title" id="tools-title">Referências de <em>campo</em></h2>
            <p className="section-subtitle mt-2">
              Recursos de referência rápida para técnicos e geólogos no terreno.
            </p>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
            {TOOLS.map((tool, i) => (
              <div
                key={tool.title}
                className="reveal bg-white flex gap-4 items-start p-7
                           hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow duration-300"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span className="text-charcoal/25 text-xl shrink-0 mt-0.5" aria-hidden="true">{tool.icon}</span>
                <div>
                  <h3 className="font-heading font-semibold text-charcoal text-sm mb-1">{tool.title}</h3>
                  <p className="font-body text-gray-text text-xs leading-relaxed">{tool.desc}</p>
                  <Link
                    to="/contacto"
                    className="font-mono text-[10px] text-cyan hover:underline mt-3 inline-block tracking-[0.12em]"
                  >
                    Solicitar acesso <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <p className="font-body text-gray-text text-xs mt-8 max-w-lg leading-relaxed">
            As ferramentas interactivas estão em desenvolvimento. Para acesso antecipado, contacte-nos.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center bg-charcoal border-t border-white/5">
        <div className="container">
          <h2 className="font-heading font-semibold text-white text-2xl md:text-3xl tracking-tight mb-6">
            Não encontrou o que <em style={{ color: '#00AEEF', fontStyle: 'italic' }}>procurava?</em>
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              to="/contacto"
              className="font-body font-medium text-white border-b border-white
                         hover:text-cyan hover:border-cyan transition-colors pb-0.5 text-[15px]"
            >
              Contactar a equipa <span aria-hidden="true">↗</span>
            </Link>
            <Link
              to="/blog"
              className="font-mono text-[13px] text-white/40 hover:text-white transition-colors tracking-wide"
            >
              Ver artigos técnicos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
