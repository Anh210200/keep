FROM node:latest
WORKDIR /app
RUN npm install -g pnpm
COPY package.json .
RUN pnpm install
COPY . ./
ENV PORT 3000
EXPOSE ${PORT}
CMD [ "pnpm", "run", "start:dev" ]

