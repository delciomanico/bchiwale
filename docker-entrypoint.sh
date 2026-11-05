#!/bin/sh
# Gera /config.js a partir das variáveis de ambiente do container (Dokploy → Environment).
# Corre no arranque do nginx (/docker-entrypoint.d/), por isso mudar a variável só exige reiniciar.
set -eu
: "${DYNAMIX_API_URL:?defina DYNAMIX_API_URL (ex. https://cms.exemplo.com/api/v1)}"
PROJECT="${DYNAMIX_PROJECT:-bchiwale}"
# escapa \ e " para o literal JS
esc() { printf '%s' "$1" | sed 's/\\/\\\\/g; s/"/\\"/g'; }
printf 'window.__CONFIG__ = { DYNAMIX_API_URL: "%s", DYNAMIX_PROJECT: "%s" };\n' "$(esc "$DYNAMIX_API_URL")" "$(esc "$PROJECT")" \
  > /usr/share/nginx/html/config.js
echo "[bchiwale] config.js: API=$DYNAMIX_API_URL projeto=$PROJECT"
