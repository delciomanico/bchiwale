#!/bin/sh
# Gera /config.js a partir das variáveis de ambiente do container (Dokploy → Environment).
# Corre no arranque do nginx (/docker-entrypoint.d/), por isso mudar a variável só exige reiniciar.
#   DYNAMIX_API_URL  (obrigatória)  URL pública da API do Dynamix, ex. https://cms.exemplo.com/api/v1
#   DYNAMIX_PROJECT  (opcional)     slug do projeto no Dynamix (defeito: bchiwale)
#   WEB3FORMS_KEY    (opcional)     access key do Web3Forms; sem ela o formulário de contacto não envia
set -eu
: "${DYNAMIX_API_URL:?defina DYNAMIX_API_URL (ex. https://cms.exemplo.com/api/v1)}"
PROJECT="${DYNAMIX_PROJECT:-bchiwale}"
FORMS_KEY="${WEB3FORMS_KEY:-}"
# escapa \ e " para o literal JS
esc() { printf '%s' "$1" | sed 's/\\/\\\\/g; s/"/\\"/g'; }
printf 'window.__CONFIG__ = { DYNAMIX_API_URL: "%s", DYNAMIX_PROJECT: "%s", WEB3FORMS_KEY: "%s" };\n' \
  "$(esc "$DYNAMIX_API_URL")" "$(esc "$PROJECT")" "$(esc "$FORMS_KEY")" > /usr/share/nginx/html/config.js
echo "[bchiwale] config.js: API=$DYNAMIX_API_URL projeto=$PROJECT formulario=$([ -n "$FORMS_KEY" ] && echo configurado || echo SEM-CHAVE)"
