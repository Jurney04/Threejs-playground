FROM node:20-alpine

WORKDIR /app

COPY public/ ./public
COPY src/ ./src
COPY package*.json ./
COPY tsconfig.json ./
COPY vite.config.js ./
COPY index.html ./
COPY next.config.ts ./
COPY eslint.config.js ./

RUN npm install

ENV PATH="/app/node_modules/.bin:$PATH"

EXPOSE 5173

CMD ["npm", "run", "dev"]

