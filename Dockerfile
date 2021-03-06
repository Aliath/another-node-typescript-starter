FROM node:15-alpine

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .

RUN yarn install --production
RUN yarn build

COPY dist dist
CMD ["yarn", "start"]