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
      handlers/   # команды, callback-и, сообщения
      services/   # логика факт-чека и обучения
      bot.ts      # сборка бота
      index.ts    # entrypoint
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
GEMINI_API_KEY=google-ai-studio-key
GEMINI_MODEL=gemini-1.5-flash
```

Запуск:

```bash
bun run dev:bot
```

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

- Бот использует Gemini, если задан `GEMINI_API_KEY`; иначе включается простая эвристика.
- Сайт пока работает без backend/API, поэтому проверка на сайте демонстрационная.
- Данные бота хранятся в памяти процесса.
- SEO для сайта пока не добавлено: тестовая версия сделана как Vue SPA.

Если понадобится SEO — проще перейти на Nuxt/SSG. 🙂
