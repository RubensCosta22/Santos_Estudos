#!/usr/bin/env bash
set -euo pipefail
: "${SUPABASE_URL:?SUPABASE_URL não definida no Render}"
: "${SUPABASE_PUBLISHABLE_KEY:?SUPABASE_PUBLISHABLE_KEY não definida no Render}"
cat > config.js <<EOC
export const SUPABASE_URL = '${SUPABASE_URL}'
export const SUPABASE_PUBLISHABLE_KEY = '${SUPABASE_PUBLISHABLE_KEY}'
EOC
printf 'Configuração Supabase gerada para o build.\n'
