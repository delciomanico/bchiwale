import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="min-h-screen flex items-center bg-gray-light">
      <div className="container text-center py-20">
        <div className="font-mono font-semibold text-cyan text-8xl tracking-tight mb-6">
          404
        </div>
        <div className="section-rule mx-auto" aria-hidden="true" />
        <h1 className="section-title mt-6 mb-4">Página não encontrada.</h1>
        <p className="section-subtitle mx-auto">
          A página que procura não existe ou foi movida.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <Link to="/" className="btn-primary">
            VOLTAR AO INÍCIO
          </Link>
          <Link to="/contacto" className="btn-secondary">
            CONTACTAR-NOS
          </Link>
        </div>
      </div>
    </section>
  );
}
