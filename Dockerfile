FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

# Install yarn
RUN npm install --global yarn --force
RUN yarn cache clean

COPY . .

RUN yarn build

RUN yarn generate

CMD ["yarn", "start"]
