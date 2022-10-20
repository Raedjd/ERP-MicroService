FROM alpine
WORKDIR /usr/src/app1
COPY package*.json .
RUN npm ci
COPY . .
CMD ["npm","start"]
