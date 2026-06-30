# 🛡️ Yarik Fact‑Check MVP

MVP сервиса для проверки информации и обучения распознаванию дезинформации.
Проект состоит из сайта и Telegram-бота в одном монорепозитории.

## ✨ Что внутри

| App | Stack | Description |
| --- | --- | --- |
| 🌐 `apps/web` | Vue + TypeScript + Vite + Tailwind | Сайт с факт-чеком, обучением, рейтингом и формой предложения факта |
| 🤖 `apps/bot` | Bun + TypeScript + grammy | Telegram-бот с теми же базовыми сценариями |

## 📁 Структура

```txt
apps/
  bot/
    data/          # учебные задания
    src/
      app/         # сборка бота, HTTP API, роутинг сообщений
      features/    # fact-check, learning, rating, submission, start
      shared/      # типы, клавиатуры, in-memory state
      index.ts     # entrypoint
  web/
    src/
      components/ # UI и feature-компоненты
      assets/     # глобальные стили
```

## 🚀 Быстрый старт

```bash
bun install
```

### 🌐 Сайт

```bash
cp apps/web/.env.example apps/web/.env
# VITE_API_URL=http://localhost:3000 для локального бота
bun run dev:web
```

Production build:

```bash
bun run build:web
```

### 🤖 Telegram-бот

```bash
cp apps/bot/.env.example apps/bot/.env
```

Вставь токен от `@BotFather`:

```env
BOT_TOKEN=123456:telegram-bot-token
BOT_POLLING=true
GROQ_API_KEY=groq-api-key
GROQ_MODEL=llama-3.1-8b-instant
WEB_ORIGIN=http://localhost:5173
```

Запуск бота:

```bash
bun run dev:bot
```

Только API для сайта без Telegram polling:

```env
BOT_POLLING=false
```

Это нужно, если бот уже запущен на Render с тем же `BOT_TOKEN`.

## 🧪 Проверки

| Command | What it does |
| --- | --- |
| `bun run typecheck` | Проверяет TypeScript в `bot` и `web` |
| `bun run lint` | Запускает ESLint |
| `bun run lint:fix` | Автофиксит стиль кода |
| `bun run check` | Typecheck + lint |

## 🧰 Tooling

| Tool | Purpose |
| --- | --- |
| Bun | package manager/runtime |
| ESLint | lint + format |
| `@antfu/eslint-config` | общий стиль кода |
| TypeScript | типизация |

## ⚠️ Ограничения MVP

- Бот использует Groq, если задан `GROQ_API_KEY`; иначе включается простая эвристика.
- Сайт использует `/api/check` бота, если задан `VITE_API_URL`; иначе включается простая эвристика.
- Данные бота хранятся в памяти процесса.
- SEO для сайта пока не добавлено: тестовая версия сделана как Vue SPA.

Если понадобится SEO — проще перейти на Nuxt/SSG. 🙂
