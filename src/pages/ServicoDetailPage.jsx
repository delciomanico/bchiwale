import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { SERVICES } from '../data/siteData';
import { ServiceIcon } from '../components/ServiceIcons';

// ── Per-service extended data (methodology, norms, FAQ) ─────────
const SERVICE_DETAIL = {
  'geologia-prospeccao': {
    methodology: [
      { step: '01', title: 'Diagnóstico', desc: 'Análise bibliográfica, revisão de dados existentes e definição do programa de trabalho com base nos objectivos da campanha.' },
      { step: '02', title: 'Campo', desc: 'Mapeamento geológico, amostragem de solo/rocha, levantamento estrutural e colheita de dados geoquímicos em pontos GPS.' },
      { step: '03', title: 'Análise', desc: 'Processamento de amostras em laboratório, modelagem de dados geoquímicos e integração com interpretação cartográfica.' },
      { step: '04', title: 'Relatório', desc: 'Elaboração de relatório técnico conforme padrões JORC / NI 43-101, com mapas, secções e estimativa de recursos.' },
    ],
    norms: ['Código JORC 2012', 'NI 43-101 (CSA Canada)', 'ABNT NBR 6502', 'ISO 9001:2015'],
    faqs: [
      { q: 'Quanto tempo demora uma campanha de prospecção?', a: 'Depende da área e dos métodos. Uma campanha básica de reconhecimento pode durar 2–4 semanas. Campanhas detalhadas com análise laboratorial podem levar 3–6 meses.' },
      { q: 'Que documentos são necessários para iniciar?', a: 'Licença de prospecção ou alvará emitido pelo MIREMPET, coordenadas da área de interesse e objectivos técnicos definidos pelo cliente.' },
      { q: 'Os resultados são confidenciais?', a: 'Sim. Todos os dados e relatórios são tratados com total confidencialidade e protegidos por acordo de não-divulgação (NDA).' },
      { q: 'A B-CHIWALE faz estimativa de recursos JORC?', a: 'Sim. Possuímos técnicos certificados para elaboração e assinatura de relatórios de recursos segundo o código JORC 2012.' },
    ],
  },
  'geofisica-aplicada': {
    methodology: [
      { step: '01', title: 'Diagnóstico', desc: 'Definição dos métodos geofísicos adequados ao objectivo — aquíferos, mineralização, fundações — com base em geologia prévia.' },
      { step: '02', title: 'Campo', desc: 'Aquisição de dados com equipamentos ERT, magnetómetros, sismógrafos ou electromagnetismo conforme o método seleccionado.' },
      { step: '03', title: 'Análise', desc: 'Inversão e interpretação dos dados com software especializado (Res2DInv, Geosoft, Seisee). Secções 2D/3D.' },
      { step: '04', title: 'Relatório', desc: 'Relatório técnico com perfis, mapas de anomalias, secções geofísicas e recomendações para furos ou investigação complementar.' },
    ],
    norms: ['ISO 9001:2015', 'ASTM D7400', 'IEEE Std 81', 'ABNT NBR 13653'],
    faqs: [
      { q: 'Qual o método mais adequado para localizar água subterrânea?', a: 'A tomografia eléctrica de resistividade (ERT) é o método mais eficaz para localização de aquíferos, complementada por métodos EM quando necessário.' },
      { q: 'A geofísica pode substituir as sondagens?', a: 'Não substitui, mas optimiza significativamente — reduindo o número de furos necessários ao identificar previamente as zonas com maior potencial.' },
      { q: 'Qual a profundidade máxima de investigação?', a: 'Depende do método e da resistividade do terreno. Com ERT alcançamos tipicamente 50–200m. Sísmica de reflexão pode atingir várias centenas de metros.' },
    ],
  },
  'engenharia-geotecnica': {
    methodology: [
      { step: '01', title: 'Diagnóstico', desc: 'Revisão de documentação, visita ao local e definição do programa de investigação baseado no tipo de obra e requisitos normativos.' },
      { step: '02', title: 'Campo', desc: 'Execução de sondagens, ensaios SPT/CPT/PMT, colheita de amostras indeformadas e ensaios in situ (ensaio de placa, permeabilidade).' },
      { step: '03', title: 'Análise', desc: 'Ensaios laboratoriais (granulometria, limites de Atterberg, compressão simples, triaxial). Modelagem de estabilidade e capacidade de carga.' },
      { step: '04', title: 'Relatório', desc: 'Relatório geotécnico com perfis de sondagem, parâmetros do solo, análise de capacidade de carga, assentamentos e recomendações de fundação.' },
    ],
    norms: ['ABNT NBR 6484', 'ABNT NBR 6122', 'Eurocode 7', 'ISO 22476', 'ISO 45001:2018'],
    faqs: [
      { q: 'Quantas sondagens são necessárias para um projecto?', a: 'Depende da dimensão e tipo de obra. Para edifícios de médio porte, geralmente 4–8 sondagens. Para infraestruturas lineares, 1 sondagem por 25–50m.' },
      { q: 'O que é o SPT e para que serve?', a: 'Standard Penetration Test — ensaio que mede a resistência do solo à penetração. Fundamental para dimensionamento de fundações e análise de liquidefacção.' },
      { q: 'A B-CHIWALE faz acompanhamento da construção?', a: 'Sim. Prestamos serviços de direcção técnica geotécnica, instrumentação e monitoramento durante todas as fases da obra.' },
    ],
  },
  'topografia-geodesia': {
    methodology: [
      { step: '01', title: 'Diagnóstico', desc: 'Análise dos requisitos de precisão, escala e finalidade do levantamento. Definição do sistema de coordenadas e datum de referência.' },
      { step: '02', title: 'Campo', desc: 'Implantação de rede de apoio geodésico, levantamento planialtimétrico com GNSS RTK ou estação total robótica, e/ou voo UAV.' },
      { step: '03', title: 'Análise', desc: 'Processamento dos dados GNSS, restituição fotogramétrica, geração de nuvens de pontos LiDAR e ortofotomapas de alta resolução.' },
      { step: '04', title: 'Relatório', desc: 'Entrega de cartografia digital (DWG, SHP, PDF), modelo digital de terreno (MDT/MDS), plantas e relatório técnico com precisão declarada.' },
    ],
    norms: ['ABNT NBR 13133', 'SIRGAS 2000', 'OGC Standards', 'ISO 19157 (Qualidade de dados geográficos)'],
    faqs: [
      { q: 'Que precisão é possível com GNSS RTK?', a: 'Com equipamento de dupla frequência em condições normais, alcançamos 1–3cm em planimétria e 2–5cm em altimetria.' },
      { q: 'O drone (UAV) pode substituir o levantamento terrestre?', a: 'Depende do objectivo. Para ortofotomapas e MDT em áreas extensas, o UAV é muito mais eficiente. Para cadastro urbano detalhado, é complementado por levantamento terrestre.' },
      { q: 'Quanto tempo demora um levantamento cadastral de 100ha?', a: 'Com UAV e processamento, geralmente 2–4 dias de campo mais 3–5 dias de processamento. Depende do terreno e da resolução exigida.' },
    ],
  },
  'ambiente-gestao': {
    methodology: [
      { step: '01', title: 'Diagnóstico', desc: 'Caracterização da área de estudo — meio físico, biótico e socioeconómico. Identificação das actividades com potencial impacto.' },
      { step: '02', title: 'Campo', desc: 'Colheita de amostras de ar, água e solo. Inventário de fauna e flora. Entrevistas com populações locais. Monitoramento de parâmetros ambientais.' },
      { step: '03', title: 'Análise', desc: 'Identificação, avaliação e hierarquização de impactos (magnitude, probabilidade, reversibilidade). Definição de medidas de mitigação.' },
      { step: '04', title: 'Relatório', desc: 'Estudo de Impacto Ambiental (EIA/RIMA) conforme legislação angolana. Plano de Gestão Ambiental (PGA). Submetido ao MINAMB para aprovação.' },
    ],
    norms: ['Lei do Ambiente (Lei 5/98, Angola)', 'Decreto 51/04 (EIA Angola)', 'ISO 14001', 'IFC Performance Standards'],
    faqs: [
      { q: 'O EIA é obrigatório para todos os projectos?', a: 'Em Angola, sim para projectos de mineração, construção de infraestrutura, exploração de recursos naturais e outros com potencial impacto significativo.' },
      { q: 'Quanto tempo demora a aprovação do EIA pelo MINAMB?', a: 'Tipicamente 60–120 dias úteis após submissão completa. A B-CHIWALE gere todo o processo de submissão e acompanhamento.' },
      { q: 'A B-CHIWALE faz monitoramento pós-aprovação?', a: 'Sim. Prestamos serviços de monitoramento ambiental contínuo (ar, água, solo, ruído) durante a fase de operação dos projectos.' },
    ],
  },
  'aguas-subterraneas': {
    methodology: [
      { step: '01', title: 'Diagnóstico', desc: 'Análise hidrogeológica regional — tipo de aquífero, profundidade esperada, condutividade hidráulica. Revisão de furos existentes na área.' },
      { step: '02', title: 'Campo', desc: 'Levantamento geofísico ERT/EM para localização de zonas saturadas. Selecção de ponto de furo. Execução de furo tubular com sonda rotativa.' },
      { step: '03', title: 'Análise', desc: 'Ensaio de caudal (step-test, bombeamento prolongado). Análise físico-química e bacteriológica da água. Avaliação de viabilidade do aquífero.' },
      { step: '04', title: 'Relatório', desc: 'Relatório hidrogeológico com perfil construtivo do furo, parâmetros hidráulicos, qualidade da água e recomendações de sistema de aproveitamento.' },
    ],
    norms: ['ABNT NBR 12212', 'OMS Directrizes para qualidade da água', 'ISO 5667 (Amostragem de água)', 'ISO 9001:2015'],
    faqs: [
      { q: 'Qual a profundidade típica dos furos em Angola?', a: 'Varia muito por região e tipo de aquífero. Na bacia do Congo podem ser 30–80m; em formações cristalinas podem atingir 100–200m.' },
      { q: 'A água do furo é sempre potável?', a: 'Nem sempre. É obrigatória análise físico-química e bacteriológica antes do consumo humano. A B-CHIWALE faz estas análises e recomenda tratamento quando necessário.' },
      { q: 'Quantos furos são precisos para uma comunidade de 500 pessoas?', a: 'Depende do caudal do aquífero. Geralmente 1–2 furos com caudal de 3–8 m³/h são suficientes para comunidades desta dimensão.' },
    ],
  },
  'consultoria-tramitacao': {
    methodology: [
      { step: '01', title: 'Diagnóstico', desc: 'Análise dos objectivos do cliente, tipo de direito mineiro pretendido e verificação da disponibilidade da área junto do MIREMPET.' },
      { step: '02', title: 'Preparação', desc: 'Elaboração de toda a documentação técnica e jurídica exigida. Preparação do Plano de Trabalho Mínimo (PTM) e demais anexos.' },
      { step: '03', title: 'Submissão', desc: 'Entrega formal do processo no MIREMPET. Acompanhamento activo junto dos serviços competentes. Resposta a pedidos de informação adicional.' },
      { step: '04', title: 'Acompanhamento', desc: 'Monitoramento do processo até à emissão do título. Assessoria pós-emissão para cumprimento de obrigações regulatórias.' },
    ],
    norms: ['Lei Mineira de Angola (Lei 31/11)', 'Decreto 26/12 (Regulamento Geral)', 'Decreto 3/12 (Taxas Mineiras)', 'Regulamento do MIREMPET'],
    faqs: [
      { q: 'Quanto tempo demora a emissão de uma Licença de Prospecção?', a: 'O prazo legal é 60 dias úteis, mas na prática pode ser 3–6 meses dependendo da complexidade e volume de processos no MIREMPET.' },
      { q: 'A B-CHIWALE pode representar empresas estrangeiras?', a: 'Sim. Auxiliamos empresas estrangeiras a constituir-se em Angola e a obter todos os direitos mineiros necessários.' },
      { q: 'Qual a diferença entre Licença de Prospecção e de Exploração?', a: 'A Licença de Prospecção autoriza estudos e pesquisa. A Licença de Exploração autoriza extracção comercial. São fases distintas do processo mineiro angolano.' },
      { q: 'É possível tramitar múltiplas áreas simultaneamente?', a: 'Sim, e é nossa especialidade. Gerimos múltiplos processos em paralelo para optimizar o tempo total de licenciamento.' },
    ],
  },
};

const SLUG_MAP = {
  'geologia-prospeccao': 0,
  'geofisica-aplicada': 1,
  'engenharia-geotecnica': 2,
  'topografia-geodesia': 3,
  'ambiente-gestao': 4,
  'aguas-subterraneas': 5,
  'consultoria-tramitacao': 6,
};

export default function ServicoDetailPage() {
  const { slug } = useParams();
  const serviceIndex = SLUG_MAP[slug];
  const service = serviceIndex !== undefined ? SERVICES[serviceIndex] : null;
  const detail = SERVICE_DETAIL[slug];

  // Fallback for unknown slug
  if (!service) {
    return (
      <div className="section-pad text-center container">
        <h1 className="section-title mb-4">Serviço não encontrado.</h1>
        <Link to="/servicos" className="btn-primary">VER TODOS OS SERVIÇOS</Link>
      </div>
    );
  }

  const TAG_CLASSES = { cyan: 'tag-cyan', yellow: 'tag-yellow', gray: 'tag-gray' };

  return (
    <>
      {/* Hero */}
      <section
        className="min-h-[44vh] flex items-end pb-16"
        style={{ background: 'linear-gradient(135deg, #1A1A2E 60%, #0d1829 100%)', borderBottom: '3px solid #00AEEF' }}
      >
        <div className="container">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 font-mono text-xs text-white/40 tracking-widest3">
              <li><Link to="/" className="hover:text-cyan transition-colors">Home</Link></li>
              <li aria-hidden="true" className="text-white/20">/</li>
              <li><Link to="/servicos" className="hover:text-cyan transition-colors">Serviços</Link></li>
              <li aria-hidden="true" className="text-white/20">/</li>
              <li className="text-white/60" aria-current="page">{service.title}</li>
            </ol>
          </nav>
          <div className="text-cyan text-4xl mb-4" aria-hidden="true">
            <ServiceIcon id={service.iconId} className="w-14 h-14" />
          </div>
          <div className="section-rule" aria-hidden="true" />
          <h1 className="font-heading font-extrabold text-white text-4xl md:text-5xl tracking-tight mt-4 max-w-2xl">
            {service.title}
          </h1>
          <p className="font-body text-white/60 text-lg mt-3 max-w-xl">{service.description}</p>
          <div className="flex flex-wrap gap-2 mt-5">
            {service.tags.map((tag) => (
              <span key={tag.label} className={TAG_CLASSES[tag.type]}>{tag.label}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Subtechniques */}
      <section className="section-pad" aria-labelledby="subtec-title">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="section-rule" aria-hidden="true" />
              <p className="eyebrow">ÂMBITO DO SERVIÇO</p>
              <h2 className="section-title mt-1 mb-8" id="subtec-title">
                O que <em>abrangemos</em>
              </h2>
              <ul className="space-y-4">
                {service.subtechniques.map((tech) => (
                  <li key={tech} className="flex items-start gap-4">
                    <span className="w-6 h-6 rounded-full bg-cyan/10 border border-cyan flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                      <span className="text-cyan text-xs font-mono">✓</span>
                    </span>
                    <span className="font-body text-charcoal text-sm leading-relaxed">{tech}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Norms */}
            {detail?.norms && (
              <div className="bg-gray-light border border-gray-mid p-8">
                <div className="section-rule" aria-hidden="true" />
                <p className="eyebrow">NORMAS E PADRÕES</p>
                <h3 className="font-heading font-bold text-charcoal text-xl mt-1 mb-6">Conformidade técnica</h3>
                <ul className="space-y-3">
                  {detail.norms.map((norm) => (
                    <li key={norm} className="flex items-center gap-3 font-body text-sm text-charcoal">
                      <span className="w-1.5 h-1.5 bg-cyan rounded-full shrink-0" aria-hidden="true" />
                      {norm}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Methodology */}
      {detail?.methodology && (
        <section className="section-pad bg-gray-light" aria-labelledby="method-title">
          <div className="container">
            <header className="text-center mb-14">
              <div className="section-rule mx-auto" aria-hidden="true" />
              <p className="eyebrow">COMO TRABALHAMOS</p>
              <h2 className="section-title" id="method-title">Metodologia de <em>trabalho</em></h2>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {detail.methodology.map((step, i) => (
                <div
                  key={step.step}
                  className="reveal bg-white border border-gray-mid border-t-4 border-t-cyan p-7"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="font-mono font-semibold text-cyan text-2xl tracking-tight mb-4">{step.step}</div>
                  <h3 className="font-heading font-bold text-charcoal text-lg mb-3">{step.title}</h3>
                  <p className="font-body text-gray-text text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {detail?.faqs && (
        <section className="section-pad" aria-labelledby="faq-title">
          <div className="container max-w-3xl">
            <header className="text-center mb-12">
              <div className="section-rule mx-auto" aria-hidden="true" />
              <p className="eyebrow">PERGUNTAS FREQUENTES</p>
              <h2 className="section-title" id="faq-title">Dúvidas <em>comuns</em></h2>
            </header>
            <div className="space-y-4">
              {detail.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="reveal group bg-white border border-gray-mid"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <summary className="flex items-start justify-between gap-4 px-7 py-5 cursor-pointer
                                      list-none font-body font-semibold text-charcoal text-sm leading-snug
                                      hover:text-cyan transition-colors">
                    {faq.q}
                    <span className="text-cyan font-mono text-lg shrink-0 mt-0.5 group-open:rotate-45 transition-transform duration-200">+</span>
                  </summary>
                  <div className="px-7 pb-5">
                    <p className="font-body text-gray-text text-sm leading-relaxed border-t border-gray-mid pt-4">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related portfolio link */}
      <section className="section-pad bg-gray-light">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-mid border-l-4 border-l-cyan p-8">
              <p className="eyebrow">VER NA PRÁTICA</p>
              <h3 className="font-heading font-bold text-charcoal text-xl mt-1 mb-3">Casos de estudo relacionados</h3>
              <p className="font-body text-gray-text text-sm leading-relaxed mb-5">
                Consulte projectos reais onde aplicámos este serviço — com resultados quantificados.
              </p>
              <Link to="/portfolio" className="btn-link">
                VER PORTFOLIO <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="bg-charcoal border-t-4 border-cyan p-8">
              <p className="eyebrow text-cyan">SOLICITAR ESTE SERVIÇO</p>
              <h3 className="font-heading font-bold text-white text-xl mt-1 mb-3">Fale com a nossa equipa</h3>
              <p className="font-body text-white/60 text-sm leading-relaxed mb-5">
                Descreva o seu projecto e receba uma proposta técnica e financeira em 24–48 horas.
              </p>
              <Link to="/contacto" className="btn-primary">
                SOLICITAR PROPOSTA <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
