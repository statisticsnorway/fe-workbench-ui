#!/bin/bash

# Recreate config file
rm -rf ./env-var.js
touch ./env-var.js

# Add assignment
echo "window._env_ = {" >> ./env-var.js

# Read value of REACT_ENV_APP
varname="REACT_APP_ENV"
value=$(printf '%s\n' ${!varname})

echo "REACT_APP_ENV value is:" $value

# Append var to JS file
echo "  \"$varname\": \"$value\"," >> ./env-var.js

echo "}" >> ./env-var.js