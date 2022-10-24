FROM node:16
WORKDIR /index
COPY package.json /index
RUN npm install
COPY . /index
CMD ["npm","start"]