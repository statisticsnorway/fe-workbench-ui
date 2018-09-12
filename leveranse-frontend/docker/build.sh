#!/bin/bash

#rm -rf node_modules

if [[ ! -d "dc-jsonschema-react-page-builder" ]]; then
    git clone git@github.com:statisticsnorway/dc-jsonschema-react-page-builder.git
else
    cd dc-jsonschema-react-page-builder
    git pull
    cd ..
fi

cat package.json | sed "s,https://github.com/statisticsnorway/dc-jsonschema-react-page-builder.git,file:dc-jsonschema-react-page-builder,g" > package.json.docker

docker build -t dc-workbench-ui .
