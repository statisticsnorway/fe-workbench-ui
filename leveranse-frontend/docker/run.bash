#!/bin/bash

echo "REACT_APP_BACKENDHOST=$REACT_APP_BACKENDHOST" > .env
echo "REACT_APP_SSB_SUBJECTS=$REACT_APP_SSB_SUBJECTS" >> .env

yarn start:production
