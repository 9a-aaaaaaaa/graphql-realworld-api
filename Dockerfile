FROM node:16.17.1-alpine3.15
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "tsconfig.json*", "./"]
RUN npm config set registry https://registry.npm.taobao.org 
RUN npm install pm2 -g 
RUN npm install --ignore-scripts &&  mv node_modules ../
COPY . .
RUN npm run build
EXPOSE 8000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
