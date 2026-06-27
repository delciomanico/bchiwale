// ============================================================
// B-CHIWALE — Site Data
// Single source of truth for all content, sourced from brief
// ============================================================

export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  {
    label: 'Sobre Nós',
    href: '/sobre-nos',
    dropdown: [
      { label: 'História & Marcos', href: '/sobre-nos#historia' },
      { label: 'Missão, Visão e Valores', href: '/sobre-nos#missao' },
      { label: 'Equipa de Liderança', href: '/sobre-nos#equipa' },
      { label: 'Organograma', href: '/sobre-nos#organograma' },
      { label: 'Certificações', href: '/sobre-nos#certificacoes' },
      { label: 'Responsabilidade Social', href: '/sobre-nos#rse' },
    ],
  },
  {
    label: 'Serviços',
    href: '/servicos',
    dropdown: [
      { label: 'Geologia e Prospecção Mineral', href: '/servicos/geologia-prospeccao' },
      { label: 'Geofísica Aplicada', href: '/servicos/geofisica-aplicada' },
      { label: 'Engenharia Geotécnica', href: '/servicos/engenharia-geotecnica' },
      { label: 'Topografia e Geodesia', href: '/servicos/topografia-geodesia' },
      { label: 'Ambiente e Gestão Territorial', href: '/servicos/ambiente-gestao' },
      { label: 'Exploração de Águas Subterrâneas', href: '/servicos/aguas-subterraneas' },
      { label: 'Consultoria, Tramitação e Acompanhamento', href: '/servicos/consultoria-tramitacao' },
    ],
  },
  {
    label: 'Portfolio',
    href: '/portfolio',
    dropdown: [
      { label: 'Todos os Projectos', href: '/portfolio' },
      { label: 'Por Serviço', href: '/portfolio?filter=servico' },
      { label: 'Por Região / Província', href: '/portfolio?filter=provincia' },
      { label: 'Por Período', href: '/portfolio?filter=periodo' },
    ],
  },
  { label: 'Galeria', href: '/galeria' },
  {
    label: 'Blog',
    href: '/blog',
    dropdown: [
      { label: 'Artigos Técnicos', href: '/blog?cat=tecnico' },
      { label: 'Webinars', href: '/blog?cat=webinars' },
      { label: 'Guias e Whitepapers', href: '/blog?cat=guias' },
      { label: 'Notícias do Sector', href: '/blog?cat=noticias' },
    ],
  },
  { label: 'Recursos', href: '/recursos' },
  { label: 'Contacto', href: '/contacto' },
];

export const STATS = [
  { value: 50, suffix: '+', label: 'Projectos Concluídos', detail: 'Em múltiplas províncias' },
  { value: 100, suffix: '+', label: 'Profissionais', detail: 'Equipa multidisciplinar' },
  { value: 8, suffix: '+', label: 'Anos de Experiência', detail: 'Desde 2017' },
  { value: 5, suffix: '', label: 'Certificações', detail: 'ISO 9001 · ISO 45001 · ABNT' },
  { value: 18, suffix: '', label: 'Províncias', detail: 'Cobertura nacional' },
];

export const SERVICES = [
  {
    number: '01',
    title: 'Geologia e Prospecção Mineral',
    href: '/servicos/geologia-prospeccao',
    description: 'Campanhas de prospecção com metodologias rigorosas de amostragem, mapeamento e análise laboratorial.',
    tags: [
      { label: 'Cartografia', type: 'cyan' },
      { label: 'Depósitos Metálicos', type: 'cyan' },
      { label: 'JORC/NI 43-101', type: 'gray' },
    ],
    subtechniques: [
      'Cartografia geológica de detalhe',
      'Prospecção de depósitos metálicos',
      'Amostragem e análise geoquímica',
      'Estimativa de recursos minerais',
    ],
    iconId: 'geology',
  },
  {
    number: '02',
    title: 'Geofísica Aplicada',
    href: '/servicos/geofisica-aplicada',
    description: 'Levantamentos multi-método para detecção de anomalias subsuperficiais, exploração de aquíferos e caracterização do subsolo.',
    tags: [
      { label: 'Magnetometria', type: 'cyan' },
      { label: 'ERT', type: 'cyan' },
      { label: 'Sísmica', type: 'gray' },
    ],
    subtechniques: [
      'Magnetometria aerotransportada',
      'Resistividade eléctrica ERT',
      'Métodos electromagnéticos TEM',
      'Sísmica de refracção e reflexão',
    ],
    iconId: 'geophysics',
  },
  {
    number: '03',
    title: 'Engenharia Geotécnica',
    href: '/servicos/engenharia-geotecnica',
    description: 'Investigação e soluções geotécnicas para construção civil, mineração e infraestrutura — da viabilidade à instrumentação.',
    tags: [
      { label: 'SPT/CPT', type: 'cyan' },
      { label: 'Estabilidade', type: 'cyan' },
      { label: 'Fundações', type: 'gray' },
    ],
    subtechniques: [
      'Sondagens e ensaios SPT/CPT/PMT',
      'Estabilidade de taludes',
      'Fundações especiais (estacas)',
      'Instrumentação e monitoramento',
    ],
    iconId: 'geotechnics',
  },
  {
    number: '04',
    title: 'Topografia e Geodesia',
    href: '/servicos/topografia-geodesia',
    description: 'Levantamentos de alta precisão com GNSS de dupla frequência, estações totais robóticas e fotogrametria por drone UAV.',
    tags: [
      { label: 'GNSS', type: 'cyan' },
      { label: 'UAV/Drone', type: 'cyan' },
      { label: 'Cadastral', type: 'gray' },
    ],
    subtechniques: [
      'Levantamentos planialtimétricos',
      'Fotogrametria por drone UAV',
      'Implantação de obras',
      'Cadastro fundiário',
    ],
    iconId: 'topography',
  },
  {
    number: '05',
    title: 'Ambiente e Gestão Territorial',
    href: '/servicos/ambiente-gestao',
    description: 'Avaliação, monitoramento e recuperação ambiental. EIA conforme legislação angolana e padrões internacionais.',
    tags: [
      { label: 'EIA', type: 'cyan' },
      { label: 'Licenciamento', type: 'cyan' },
      { label: 'Recuperação', type: 'gray' },
    ],
    subtechniques: [
      'Estudos de Impacto Ambiental',
      'Planos de gestão ambiental',
      'Monitoramento ar/água/solo',
      'Mapeamento territorial',
    ],
    iconId: 'environment',
  },
  {
    number: '06',
    title: 'Exploração de Águas Subterrâneas',
    href: '/servicos/aguas-subterraneas',
    description: 'Prospecção, pesquisa e exploração de recursos hídricos subterrâneos para comunidades, indústrias e agricultura.',
    tags: [
      { label: 'Aquíferos', type: 'cyan' },
      { label: 'Furos Tubulares', type: 'cyan' },
      { label: 'Hidrogeologia', type: 'gray' },
    ],
    subtechniques: [
      'Prospecção geofísica de aquíferos',
      'Furos e poços tubulares',
      'Ensaios de caudal',
      'Sistemas de bombeamento',
    ],
    iconId: 'water',
  },
  {
    number: '07',
    title: 'Consultoria, Tramitação e Acompanhamento',
    href: '/servicos/consultoria-tramitacao',
    description: 'Assistência técnica e jurídica completa para aquisição de direitos mineiros em Angola junto do MIREMPET.',
    tags: [
      { label: 'MIREMPET', type: 'cyan' },
      { label: 'Direitos Mineiros', type: 'cyan' },
      { label: 'Regulatório', type: 'gray' },
    ],
    subtechniques: [
      'Licenças de Prospecção Mineira',
      'Licença de Exploração e Lavra',
      'Alvarás e Senhas Mineiras',
      'Acompanhamento MIREMPET',
    ],
    iconId: 'consultancy',
  },
];

export const TEAM = [
  {
    initials: 'BC',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=480&fit=crop&q=80',
    name: 'B. Chiwale',
    role: 'Director-Geral',
    bio: 'Fundador da B-CHIWALE, lidera a empresa com mais de 10 anos de experiência em geologia exploratória e mineração em Angola.',
    linkedin: '#',
  },
  {
    initials: 'DG',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=480&fit=crop&q=80',
    name: 'Dir. Técnico de Geologia',
    role: 'Dir. Técnico',
    bio: 'Especialista em prospecção e depósitos minerais, responsável pela qualidade técnica dos relatórios geológicos.',
    linkedin: '#',
  },
  {
    initials: 'GF',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=480&fit=crop&q=80',
    name: 'Dir. Geofísica Aplicada',
    role: 'Dir. Geofísica',
    bio: 'Coordena todos os levantamentos geofísicos, com foco em métodos eléctricos, sísmicos e electromagnéticos.',
    linkedin: '#',
  },
  {
    initials: 'GT',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=480&fit=crop&q=80',
    name: 'Dir. Engenharia Geotécnica',
    role: 'Dir. Geotecnia',
    bio: 'Lidera os estudos de fundações e estabilidade de terrenos para projectos de infraestrutura em todo o país.',
    linkedin: '#',
  },
  {
    initials: 'TA',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=480&fit=crop&q=80',
    name: 'Dir. Topografia e Ambiente',
    role: 'Dir. Topografia',
    bio: 'Responsável pelos levantamentos GNSS de precisão, fotogrametria UAV e estudos de impacto ambiental.',
    linkedin: '#',
  },
  {
    initials: 'AF',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=480&fit=crop&q=80',
    name: 'Dir. Administrativo e Financeiro',
    role: 'Dir. Administrativo',
    bio: 'Garante a solidez financeira e operacional da empresa, supervisionando contratos e gestão de recursos.',
    linkedin: '#',
  },
  {
    initials: 'CM',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=480&fit=crop&q=80',
    name: 'Coord. de Projecto',
    role: 'Coordenação',
    bio: 'Assegura a execução dos projectos dentro do prazo e orçamento, mantendo a comunicação com os clientes.',
    linkedin: '#',
  },
  {
    initials: 'GL',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=480&fit=crop&q=80',
    name: 'Geólogo Sénior',
    role: 'Geologia',
    bio: 'Conduz campanhas de cartografia geológica e amostragem geoquímica nas diversas províncias angolanas.',
    linkedin: '#',
  },
];

export const PORTFOLIO_ITEMS = [
  {
    label: 'Geologia · Luanda',
    service: 'Geologia',
    province: 'Luanda',
    title: 'Prospecção Mineral — Bacia Sedimentar Norte',
    description: 'Campanha de cartografia geológica e amostragem geoquímica em 1.200 km².',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=340&fit=crop&q=80',
    href: '/portfolio',
  },
  {
    label: 'Geofísica · Malanje',
    service: 'Geofísica',
    province: 'Malanje',
    title: 'Levantamento ERT — Aquífero Regional',
    description: 'Identificação e mapeamento de 3 aquíferos principais a 80–180m de profundidade.',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=340&fit=crop&q=80',
    href: '/portfolio',
  },
  {
    label: 'Geotecnia · Benguela',
    service: 'Geotecnia',
    province: 'Benguela',
    title: 'Estudo Geotécnico — Corredor de Infraestrutura',
    description: 'Investigação do subsolo para implantação de 45km de infraestrutura rodoviária.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=340&fit=crop&q=80',
    href: '/portfolio',
  },
  {
    label: 'Topografia · Huambo',
    service: 'Topografia',
    province: 'Huambo',
    title: 'Levantamento Cadastral — Zona Industrial',
    description: 'Levantamento GNSS de precisão e fotogrametria UAV em 320 hectares.',
    image: 'https://images.unsplash.com/photo-1569974507005-6dc61f97fb5d?w=600&h=340&fit=crop&q=80',
    href: '/portfolio',
  },
  {
    label: 'Ambiente · Cabinda',
    service: 'Ambiente',
    province: 'Cabinda',
    title: 'EIA — Projecto de Mineração Aluvionar',
    description: 'Estudo de impacto ambiental e plano de recuperação para operação de mineração aluvionar.',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&h=340&fit=crop&q=80',
    href: '/portfolio',
  },
  {
    label: 'Consultoria · Lunda Norte',
    service: 'Consultoria',
    province: 'Lunda Norte',
    title: 'Tramitação MIREMPET — Licença de Lavra',
    description: 'Acompanhamento completo do processo de licenciamento de exploração diamantífera junto do MIREMPET.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=340&fit=crop&q=80',
    href: '/portfolio',
  },
];

export const TIMELINE = [
  { year: '2017', text: 'Constituição da B-CHIWALE — foco inicial em geologia exploratória e prospecção mineral.', badge: null, type: 'normal' },
  { year: '2018', text: 'Expansão para geofísica aplicada e topografia. Primeiros equipamentos GNSS de alta precisão adquiridos.', badge: null, type: 'normal' },
  { year: '2019', text: 'Certificações ISO 9001:2015 e ISO 45001:2018 obtidas. Primeiros contratos de grande dimensão.', badge: '✦ ISO', type: 'milestone' },
  { year: '2020', text: 'Software de modelagem 3D geológica e análise geotécnica avançada. Expansão significativa da equipa.', badge: null, type: 'normal' },
  { year: '2021', text: 'Projectos de referência em 3 províncias angolanas. Parcerias académicas estabelecidas com universidades.', badge: null, type: 'normal' },
  { year: '2022', text: 'Lançamento do serviço de Exploração de Águas Subterrâneas. Área de Ambiente expandida.', badge: null, type: 'normal' },
  { year: '2023', text: 'Consultoria completa de direitos mineiros junto do MIREMPET. Equipa ultrapassa 50 profissionais.', badge: '✦ 50+', type: 'milestone' },
  { year: '2024', text: 'Consolidação como empresa de referência nacional. Expansão para 18 províncias.', badge: null, type: 'normal' },
  { year: '2025 →', text: 'Expansão para mercados regionais africanos. Novo website lançado. A história continua.', badge: 'ACTIVO', type: 'active' },
];

export const TESTIMONIALS = [
  {
    text: '"A B-CHIWALE entregou o estudo geotécnico dentro do prazo e com qualidade técnica que não esperávamos encontrar em Angola. Profissionalismo de nível internacional."',
    initials: 'DO',
    name: 'Director de Operações',
    meta: 'Empresa de Construção Civil · Luanda',
  },
  {
    text: '"O levantamento geofísico realizado pela equipa foi determinante para identificarmos a localização exacta do aquífero. Resultado preciso e relatório impecável."',
    initials: 'GP',
    name: 'Gestor de Projecto',
    meta: 'Empresa Agroindustrial · Malanje',
  },
  {
    text: '"Acompanharam todo o processo de tramitação mineira junto do MIREMPET. Sem eles, o processo teria demorado o dobro do tempo."',
    initials: 'SG',
    name: 'Sócio-Gerente',
    meta: 'Empresa de Mineração · Huambo',
  },
];

export const BLOG_POSTS = [
  {
    category: 'Geologia',
    date: 'Junho 2025',
    dateTime: '2025-06',
    title: 'Como funciona a estimativa de recursos minerais segundo o padrão JORC',
    excerpt: 'Uma análise das etapas técnicas e documentais para classificação de recursos segundo o código JORC.',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=360&fit=crop&q=80',
    href: '/blog',
  },
  {
    category: 'Legislação',
    date: 'Maio 2025',
    dateTime: '2025-05',
    title: 'Guia prático: como obter uma Licença de Prospecção Mineira em Angola',
    excerpt: 'O processo junto do MIREMPET passo a passo, com os documentos necessários e prazos esperados.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=360&fit=crop&q=80',
    href: '/blog',
  },
  {
    category: 'Geofísica',
    date: 'Abril 2025',
    dateTime: '2025-04',
    title: 'Tomografia Eléctrica (ERT): aplicações na exploração de aquíferos subterrâneos',
    excerpt: 'A resistividade eléctrica como método principal na localização de recursos hídricos subterrâneos.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=360&fit=crop&q=80',
    href: '/blog',
  },
];

export const FOOTER_SERVICES = [
  { label: 'Geologia e Prospecção', href: '/servicos/geologia-prospeccao' },
  { label: 'Geofísica Aplicada', href: '/servicos/geofisica-aplicada' },
  { label: 'Engenharia Geotécnica', href: '/servicos/engenharia-geotecnica' },
  { label: 'Topografia e Geodesia', href: '/servicos/topografia-geodesia' },
  { label: 'Ambiente e Gestão', href: '/servicos/ambiente-gestao' },
  { label: 'Exploração de Águas', href: '/servicos/aguas-subterraneas' },
  { label: 'Consultoria Mineira', href: '/servicos/consultoria-tramitacao' },
];

export const FOOTER_COMPANY = [
  { label: 'Home', href: '/' },
  { label: 'Sobre Nós', href: '/sobre-nos' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Galeria', href: '/galeria' },
  { label: 'Blog & Conhecimento', href: '/blog' },
  { label: 'Recursos', href: '/recursos' },
  { label: 'Carreiras', href: '/carreiras' },
  { label: 'Contacto', href: '/contacto' },
];

export const CONTACT = {
  phone: '+244 924 073 147',
  email: 'geral@bchiwale.ao',
  whatsapp: 'https://wa.me/244924073147',
  address: 'Centralidade do Kilamba, Quarteirão Z, Prédio Z28, 4.º Andar, Luanda, Angola',
  addressShort: 'Kilamba, Quarteirão Z, Luanda',
  website: 'bchiwale.ao',
  hours: 'Segunda–Sexta, 08h00–17h00',
};

export const HERO_SLIDES = [
  'https://bchiwale.ao/wp-content/uploads/2025/04/bannerchiwale1.webp',
  'https://bchiwale.ao/wp-content/uploads/2025/04/bannerchiwale2.webp',
  'https://bchiwale.ao/wp-content/uploads/2025/04/bannerchiwale3.webp',
  'https://bchiwale.ao/wp-content/uploads/2025/04/bannerchiwale1.webp',
];
