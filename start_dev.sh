#!/usr/bin/env bash
export REACT_APP_ENV=development
chmod +x ./scripts/read_env_var.sh && ./scripts/read_env_var.sh && cp env-var.js ./public/ && yarn start