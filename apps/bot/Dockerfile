FROM oven/bun:1

WORKDIR /app

COPY package.json bun.lock ./
COPY apps/bot/package.json apps/bot/package.json

RUN bun install --frozen-lockfile

COPY apps/bot apps/bot

WORKDIR /app/apps/bot

CMD ["bun", "run", "start"]
