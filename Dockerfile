FROM node:20.17-alpine3.19

WORKDIR /usr/app/front
COPY . .

RUN npm install
RUN npm run build

EXPOSE 4000

CMD ["node", "./dist/front/server/server.mjs"]