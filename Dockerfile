FROM node:14.17.0-alpine3.13

ENV APP_ROOT /bl0g0sphere

WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}

RUN npm ci
RUN npm run build

CMD ["npm", "run", "start"]

