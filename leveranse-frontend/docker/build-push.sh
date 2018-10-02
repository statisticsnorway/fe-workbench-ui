#!/bin/bash

WORKBENCH_VERSION=0.0.6

./docker/build.sh
docker tag dc-workbench-ui eu.gcr.io/p2-utvikling/dc-workbench-ui:$WORKBENCH_VERSION
gcloud auth application-default print-access-token | docker login -u oauth2accesstoken --password-stdin https://eu.gcr.io
docker push eu.gcr.io/p2-utvikling/dc-workbench-ui:$WORKBENCH_VERSION

#docker run -it -p 3000:3000 -e REACT_APP_BACKENDHOST="http://172.17.0.1:9090" eu.gcr.io/p2-utvikling/dc-workbench-ui:$WORKBENCH_VERSION
