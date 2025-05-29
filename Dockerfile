FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./


RUN npm install --global yarn --force
RUN yarn cache clean

COPY . .

RUN yarn generate

EXPOSE 3333

CMD ["sh", "-c", "npx prisma migrate deploy && yarn start"]
