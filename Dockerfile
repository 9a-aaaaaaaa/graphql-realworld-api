FROM node:16.17.1-alpine3.15
ENV NODE_ENV=production
WORKDIR /usr/app
COPY ["package.json", "package-lock.json*", "tsconfig.json*", "./"]
RUN npm install pm2 -g --registry=https://registry.npm.taobao.org
RUN npm install --ignore-scripts --registry=https://registry.npm.taobao.org
COPY . .
RUN npm run build
EXPOSE 8000
CMD ["npm", "start"]
