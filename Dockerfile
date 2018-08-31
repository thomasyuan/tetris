# Image for build stage
FROM node:8-alpine as builder

WORKDIR tetris
COPY package*.json ./

# Add packages needed to build native dependencies
RUN apk add --no-cache \
    git \
    python \
    python-dev \
    py-pip \
    build-base \
    libc6-compat \
  && pip install virtualenv

# Install modules
RUN npm install --only=production

COPY cli.js .
COPY src ./src

# Build the final docker image
FROM node:8-alpine

# Add tini following https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

COPY --from=builder /tetris /tetris

WORKDIR tetris
ENTRYPOINT ["node", "cli.js"]
