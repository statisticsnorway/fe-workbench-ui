FROM node:12.2.0-alpine as react-build
WORKDIR /app
COPY . ./
RUN yarn install
RUN CI=true yarn test
RUN CI=true yarn build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 80

# Copy env script to container
WORKDIR /usr/share/nginx/html
COPY ./scripts/read_env_var.sh .

# Add bash
RUN apk add --no-cache bash

# Make env_var script executable
RUN chmod +x read_env_var.sh

CMD ["/bin/bash", "-c", "/usr/share/nginx/html/read_env_var.sh && nginx -g \"daemon off;\""]