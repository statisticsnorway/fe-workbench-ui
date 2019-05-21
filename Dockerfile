FROM node:12.2.0-alpine as react-build
WORKDIR /app
COPY . ./
RUN yarn
RUN yarn build
RUN yarn test --no-watch

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]