# bchiwale — site estático (Vite/React) servido por nginx. Deploy no Dokploy (Application → Dockerfile, porta 80).
# O conteúdo (textos, imagens, vídeo) vem do Dynamix-CMS. A API é lida no ARRANQUE do container
# (Dokploy → Environment): DYNAMIX_API_URL (obrigatória) e DYNAMIX_PROJECT (defeito: bchiwale).
FROM node:24-bookworm-slim AS build
WORKDIR /app
COPY package*.json ./
# --ignore-scripts: o playwright (dependência) não deve descarregar browsers no build
RUN npm ci --ignore-scripts --no-audit --no-fund
COPY . .
RUN npm run build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
COPY docker-entrypoint.sh /docker-entrypoint.d/40-config.sh
RUN chmod +x /docker-entrypoint.d/40-config.sh
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1/healthz || exit 1
