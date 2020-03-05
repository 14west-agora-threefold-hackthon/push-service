
FROM registry.access.redhat.com/ubi8/nodejs-10:latest

LABEL maintainer="bquigley@tfd.ie"

WORKDIR /opt/app-root/src

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 8080

ENTRYPOINT [ "npm", "start" ]
