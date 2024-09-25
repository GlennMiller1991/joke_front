FROM node:20.17-alpine3.19

WORKDIR /usr/app/front
COPY . .

RUN npm install
ARG port
RUN export port=$port
RUN npm run build

EXPOSE $port

CMD ["node", "./dist/front/server/server.mjs"]