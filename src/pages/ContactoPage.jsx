import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CONTACT, SERVICES } from '../data/siteData';

function PinIcon() {
  return (
    <svg className="w-5 h-5 shrink-0 text-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-5 h-5 shrink-0 text-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6.53 6.53l.97-.97a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="w-5 h-5 shrink-0 text-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-5 h-5 shrink-0 text-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}

export default function ContactoPage() {
  const [form, setForm] = useState({
    nome: '', email: '', telefone: '', empresa: '', servico: '', mensagem: '',
  });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      if (import.meta.env.DEV) {
        await new Promise((r) => setTimeout(r, 1200));
        console.log('[DEV] Dados do formulário que seriam enviados:', form);
        setStatus('success');
        return;
      }

      const fd = new FormData();
      fd.append('access_key', import.meta.env.VITE_WEB3FORMS_KEY);
      fd.append('subject', form.servico
        ? `[B-CHIWALE] Nova mensagem de ${form.nome} — ${form.servico}`
        : `[B-CHIWALE] Nova mensagem de ${form.nome}`);
      fd.append('from_name', form.nome);
      fd.append('replyto', form.email);
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: fd,
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Erro ao enviar.');
      setStatus('success');
    } catch (err) {
      setErrorMsg(err.message || 'Erro ao enviar. Tente novamente.');
      setStatus('error');
    }
  };

  return (
    <>
      {/* Internal hero */}
      <section
        className="min-h-[calc(36vh+72px)] flex items-end pb-16"
        style={{ background: 'linear-gradient(135deg, #1A1A2E 60%, #0d1829 100%)', borderBottom: '3px solid #00AEEF', paddingTop: '72px' }}
      >
        <div className="container">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 font-mono text-xs text-white/40 tracking-widest3">
              <li><Link to="/" className="hover:text-cyan transition-colors">Home</Link></li>
              <li aria-hidden="true" className="text-white/20">/</li>
              <li className="text-white/60" aria-current="page">Contacto</li>
            </ol>
          </nav>
          <div className="section-rule" aria-hidden="true" />
          <h1 className="font-heading font-extrabold text-white text-4xl md:text-5xl tracking-tight mt-4">
            Fale <em style={{ color: '#00AEEF', fontStyle: 'italic' }}>connosco.</em>
          </h1>
          <p className="font-body text-white/60 text-lg mt-3">
            A nossa equipa responde em 24 horas úteis.
          </p>
        </div>
      </section>

      {/* Contact grid */}
      <section className="section-pad">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-14 lg:gap-20 items-start">

            {/* Left — form (3 cols) */}
            <div className="lg:col-span-3">
              <h2 className="font-heading font-bold text-charcoal text-2xl mb-8 tracking-tight">
                Envie uma mensagem
              </h2>

              {status === 'success' ? (
                <div className="border-l-4 border-cyan bg-[#E8F7FD] p-8">
                  <div className="font-mono text-xs text-cyan tracking-widest2 uppercase mb-2">
                    Mensagem enviada!
                  </div>
                  <p className="font-body text-charcoal text-sm leading-relaxed">
                    Obrigado pelo contacto. A nossa equipa entrará em contacto consigo em breve.
                  </p>
                  <button
                    className="btn-link mt-6"
                    onClick={() => { setStatus('idle'); setForm({ nome: '', email: '', telefone: '', empresa: '', servico: '', mensagem: '' }); }}
                  >
                    Enviar outra mensagem <span aria-hidden="true">→</span>
                  </button>
                </div>
              ) : (
                <form
                  className="flex flex-col gap-5"
                  noValidate
                  onSubmit={handleSubmit}
                  aria-label="Formulário de contacto"
                >
                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="nome" className="font-mono text-xs text-gray-text tracking-widest3 uppercase">
                        Nome completo *
                      </label>
                      <input
                        type="text" id="nome" name="nome" required aria-required="true"
                        value={form.nome} onChange={handleChange}
                        className="border border-gray-mid px-4 py-3 font-body text-sm text-charcoal
                                   placeholder:text-gray-text focus:outline-none focus:border-cyan transition-colors"
                        placeholder="O seu nome"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="font-mono text-xs text-gray-text tracking-widest3 uppercase">
                        Email *
                      </label>
                      <input
                        type="email" id="email" name="email" required aria-required="true"
                        value={form.email} onChange={handleChange}
                        className="border border-gray-mid px-4 py-3 font-body text-sm text-charcoal
                                   placeholder:text-gray-text focus:outline-none focus:border-cyan transition-colors"
                        placeholder="email@empresa.com"
                      />
                    </div>
                  </div>

                  {/* Phone + Company row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="telefone" className="font-mono text-xs text-gray-text tracking-widest3 uppercase">
                        Telefone / WhatsApp
                      </label>
                      <input
                        type="tel" id="telefone" name="telefone"
                        value={form.telefone} onChange={handleChange}
                        className="border border-gray-mid px-4 py-3 font-body text-sm text-charcoal
                                   placeholder:text-gray-text focus:outline-none focus:border-cyan transition-colors"
                        placeholder="+244 9XX XXX XXX"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="empresa" className="font-mono text-xs text-gray-text tracking-widest3 uppercase">
                        Empresa
                      </label>
                      <input
                        type="text" id="empresa" name="empresa"
                        value={form.empresa} onChange={handleChange}
                        className="border border-gray-mid px-4 py-3 font-body text-sm text-charcoal
                                   placeholder:text-gray-text focus:outline-none focus:border-cyan transition-colors"
                        placeholder="Nome da empresa"
                      />
                    </div>
                  </div>

                  {/* Service dropdown */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="servico" className="font-mono text-xs text-gray-text tracking-widest3 uppercase">
                      Serviço de interesse
                    </label>
                    <select
                      id="servico" name="servico"
                      value={form.servico} onChange={handleChange}
                      className="border border-gray-mid px-4 py-3 font-body text-sm text-charcoal
                                 bg-white focus:outline-none focus:border-cyan transition-colors appearance-none"
                    >
                      <option value="">Seleccionar serviço...</option>
                      {SERVICES.map((s) => (
                        <option key={s.number} value={s.title}>{s.title}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="mensagem" className="font-mono text-xs text-gray-text tracking-widest3 uppercase">
                      Mensagem
                    </label>
                    <textarea
                      id="mensagem" name="mensagem" rows={5}
                      value={form.mensagem} onChange={handleChange}
                      className="border border-gray-mid px-4 py-3 font-body text-sm text-charcoal
                                 placeholder:text-gray-text focus:outline-none focus:border-cyan transition-colors resize-none"
                      placeholder="Descreva brevemente o seu projecto..."
                    />
                  </div>

                  {status === 'error' && (
                    <div className="border-l-4 border-red-500 bg-red-50 p-4">
                      <p className="font-body text-red-700 text-sm">{errorMsg}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn-primary self-start mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? 'A ENVIAR...' : 'ENVIAR MENSAGEM'}{status !== 'sending' && <span aria-hidden="true"> →</span>}
                  </button>
                </form>
              )}
            </div>

            {/* Right — info (2 cols) */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <h2 className="font-heading font-bold text-charcoal text-2xl tracking-tight">
                Informações de contacto
              </h2>

              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <PinIcon />
                  <div>
                    <div className="font-mono text-xs text-gray-text tracking-widest3 uppercase mb-1">Morada</div>
                    <p className="font-body text-charcoal text-sm leading-relaxed">{CONTACT.address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <PhoneIcon />
                  <div>
                    <div className="font-mono text-xs text-gray-text tracking-widest3 uppercase mb-1">Telefone</div>
                    <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                       className="font-body text-charcoal text-sm hover:text-cyan transition-colors">
                      {CONTACT.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <MailIcon />
                  <div>
                    <div className="font-mono text-xs text-gray-text tracking-widest3 uppercase mb-1">Email</div>
                    <a href={`mailto:${CONTACT.email}`}
                       className="font-body text-charcoal text-sm hover:text-cyan transition-colors">
                      {CONTACT.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <ClockIcon />
                  <div>
                    <div className="font-mono text-xs text-gray-text tracking-widest3 uppercase mb-1">Horário</div>
                    <p className="font-body text-charcoal text-sm">{CONTACT.hours}</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#25D366] text-white font-body font-semibold
                           text-sm px-6 py-4 transition-all duration-300 hover:bg-[#1DAD57]
                           hover:-translate-y-0.5 self-start mt-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                WhatsApp Directo
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
