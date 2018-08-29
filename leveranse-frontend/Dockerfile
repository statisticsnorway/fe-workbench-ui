FROM node:10-alpine

ENV APP_DIR=/opt/dc-workbench-ui
ENV NODE_PATH=$APP_DIR/node_modules
ENV PATH=$PATH:$NODE_PATH/.bin

ENV REACT_APP_BACKENDHOST="http://172.17.0.1:9090/data/"
ENV REACT_APP_SSB_SUBJECTS="https://data.ssb.no/api/v0/no/table/"

USER root

RUN apk update \
    && apk upgrade \
    && apk add --no-cache bash-completion git openssh-client vim sed curl \
    && mkdir -p $APP_DIR

WORKDIR $APP_DIR

ADD package.json.docker .
ADD dc-jsonschema-react-page-builder dc-jsonschema-react-page-builder/
ADD public public/
ADD src src/
ADD docker/run.sh .

RUN chmod +x run.sh \
    && cat package.json.docker | sed "s,https://github.com/statisticsnorway/dc-jsonschema-react-page-builder.git,file:dc-jsonschema-react-page-builder,g" > package.json \
    && yarn install

EXPOSE 3000
EXPOSE 35729

CMD ["./run.sh"]

