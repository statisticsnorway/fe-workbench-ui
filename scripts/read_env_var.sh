#!/bin/bash

# Recreate config file
rm -rf ./env-var.js
touch ./env-var.js

# Add assignment
echo "window._env_ = {" >> ./env-var.js

# Read value of REACT_APP_ENV
react_app_env="REACT_APP_ENV"
react_app_env_value=$(printf '%s\n' ${!react_app_env})

echo "REACT_APP_ENV value is:" react_app_env_value

# Read value of OAUTH_CLIENT_ID
oauth_client_id="OAUTH_CLIENT_ID"
oauth_client_id_value=$(printf '%s\n' ${!oauth_client_id})

# Append variables to JS file
echo "  \"$react_app_env\": \"$react_app_env_value\"," >> ./env-var.js
echo "  \"$oauth_client_id\": \"$oauth_client_id_value\"," >> ./env-var.js

echo "}" >> ./env-var.js