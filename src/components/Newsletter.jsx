import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      // Placeholder — integrate with HubSpot/Mailchimp on production
      setSubmitted(true);
    }
  };

  return (
    <section
      className="bg-charcoal py-16 md:py-20"
      aria-labelledby="newsletter-title"
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left — copy */}
          <div>
            <div className="font-mono text-xs text-cyan tracking-widest2 uppercase mb-4">
              NEWSLETTER
            </div>
            <h2
              id="newsletter-title"
              className="font-heading font-extrabold text-white text-3xl md:text-4xl
                         leading-tight tracking-tight mb-4"
            >
              Insights técnicos directos<br />no seu email.
            </h2>
            <p className="font-body text-white/60 text-sm leading-relaxed">
              Receba insights técnicos sobre geologia e mineração em Angola.<br />
              Artigos, legislação e novidades do sector — directamente no seu email.
            </p>
          </div>

          {/* Right — form */}
          <div>
            {submitted ? (
              <div className="border border-cyan/30 bg-cyan/10 p-6 text-center">
                <div className="font-mono text-cyan text-xs tracking-widest2 uppercase mb-2">
                  Subscrito!
                </div>
                <p className="font-body text-white/80 text-sm">
                  Obrigado. Receberá os próximos insights directamente no seu email.
                </p>
              </div>
            ) : (
              <form
                className="flex flex-col gap-3"
                noValidate
                aria-label="Formulário de newsletter"
                onSubmit={handleSubmit}
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  O seu endereço de email
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    id="newsletter-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-white/10 border border-white/20 text-white
                               font-body text-sm px-5 py-3.5 placeholder:text-white/40
                               focus:outline-none focus:border-cyan transition-colors"
                    placeholder="O seu melhor email..."
                    autoComplete="email"
                    required
                    aria-required="true"
                  />
                  <button type="submit" className="btn-yellow whitespace-nowrap">
                    SUBSCREVER
                  </button>
                </div>
                <p className="font-mono text-xs text-white/30 tracking-widest3">
                  Sem spam. Cancele a qualquer momento. Respeitamos a sua privacidade.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
