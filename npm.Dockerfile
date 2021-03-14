FROM node:10.24-buster AS builder

WORKDIR /home/app

# NPM v7
RUN npm install --global npm
COPY package.json /home/app/
COPY package-lock.json /home/app/
COPY packages/billing/package.json /home/app/packages/billing/
COPY packages/ds/package.json /home/app/packages/ds/
COPY packages/products/package.json /home/app/packages/products/
COPY packages/shell/package.json /home/app/packages/shell/
RUN npm ci

COPY . .

RUN npm run single:build

FROM nginx:1.19-alpine
COPY --from=builder /home/app/build /usr/share/nginx/html
COPY nginx.default.conf /etc/nginx/conf.d/default.conf
