#
# One stage 'main' creates and runs project distribution.
#
# https://hub.docker.com/_/node

FROM node:alpine AS main
USER root
COPY / /app
WORKDIR /app
RUN npm start