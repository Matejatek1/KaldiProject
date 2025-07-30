FROM node:20 AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g @nestjs/cli
RUN npm install --only=production

COPY . .

RUN npm run build


FROM node:20-slim AS production

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY ./tsconfig.json .

RUN npm install -g @nestjs/cli

WORKDIR /usr/src/app

EXPOSE 3005
EXPOSE 5432

CMD ["sh", "-c", "npm run migration:run && npm run start:prod"]