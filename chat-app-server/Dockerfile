FROM node:alpine

WORKDIR /chat-app/back-end

COPY package*.json ./

RUN npm ci

COPY config/ config/
COPY controller/ controller/
COPY dbconnection/ dbconnection/
COPY middleware/ middleware/
COPY routes/ routes/
COPY utils/ utils/
COPY validation/ validation/
COPY index.js ./index.js

EXPOSE 3501

CMD ["node","index.js"]
