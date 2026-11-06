# bchiwale

Site institucional (React + Vite + Tailwind). **Todo o conteúdo — textos, imagens, vídeo, logo — vem do Dynamix-CMS** (projeto `bchiwale`), via API pública `…/api/v1/public/bchiwale/…`.

## Desenvolvimento

```bash
npm ci
cp .env.example .env.local   # VITE_DYNAMIX_API_URL (defeito em dev: http://localhost:3001/api/v1)
npm run dev
```

O Dynamix tem de estar a correr (e semeado) — ver `Dynamix-CMS/docs/seeds.md`.

## Deploy (Dokploy)

Application → Provider Git → Build Type **Dockerfile** → Domains: porta **80**.
Em *Environment* (lidas no arranque do container; mudar = reiniciar, sem rebuild):

```
DYNAMIX_API_URL=https://<cms>/api/v1
DYNAMIX_PROJECT=bchiwale        # opcional
WEB3FORMS_KEY=...               # opcional; sem ela o formulário de contacto não envia (lida no arranque)
```

O domínio do site tem de estar em `allowedOrigins` do projeto no Dynamix (CORS).

## Regenerar o seed do Dynamix

`node scripts/export-dynamix-seed.mjs` (gera `data.json` e copia os ficheiros referenciados).
