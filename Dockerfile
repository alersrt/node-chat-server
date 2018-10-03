#
# Stage 'certs' creates certificates.
#
# https://hub.docker.com/r/jordi/openssl/
FROM jordi/openssl:latest AS certs
WORKDIR /app
RUN mkdir -p ssl
RUN openssl req -nodes -new -x509 \
    -keyout ssl/server.key \
    -out ssl/server.cert \
    -subj "/"

#
# Stage 'runtime' creates final Docker image to use in runtime.
#
# https://hub.docker.com/_/node
FROM node:alpine AS runtime
WORKDIR /app
COPY / /app
COPY --from=certs /app/ssl .
CMD ["npm", "start"]