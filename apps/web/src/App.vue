<script setup lang="ts">
import { AlertTriangle, Bot, CheckCircle2, Gamepad2, Search, ShieldCheck, Sparkles, Trophy } from 'lucide-vue-next';
import FactCheckPanel from '@/components/features/FactCheckPanel.vue';
import LearningPanel from '@/components/features/LearningPanel.vue';
import SubmitFactPanel from '@/components/features/SubmitFactPanel.vue';
import Button from '@/components/ui/Button.vue';
import Card from '@/components/ui/Card.vue';

const problemTypes = [
  'кликбейт и эмоциональные заголовки',
  'подмена исторического контекста',
  'фейковые цитаты и даты',
  'манипуляция картинками и скриншотами',
];

const analogs = [
  'Лапша Медиа',
  'Война с фейками',
  'Фактчекер АНО «Диалог»',
  'Bad News',
];

const steps = [
  'Пользователь отправляет новость или выбирает учебный челлендж',
  'Сервис показывает подозрительные признаки и задаёт вопросы',
  'Пользователь получает баллы, разбор и советы по проверке источников',
];
</script>

<template>
  <main class="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8">
    <header class="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <a class="flex items-center gap-3" href="#top" aria-label="На главную">
        <div class="grid size-11 place-items-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
          <ShieldCheck class="size-6" />
        </div>
        <span class="text-lg font-black">Фейк-детектор</span>
      </a>

      <nav class="flex flex-wrap gap-2 text-sm">
        <a href="#about"><Button variant="ghost">Концепция</Button></a>
        <a href="#check"><Button variant="ghost">Проверка</Button></a>
        <a href="#learn"><Button variant="ghost">Обучение</Button></a>
        <a href="#submit"><Button variant="ghost">Предложить факт</Button></a>
      </nav>
    </header>

    <section id="top" class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div class="space-y-6">
        <div class="flex flex-wrap gap-3">
          <p class="inline-flex rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
            🛡️ MVP сервиса против исторических фейков
          </p>
        </div>

        <h1 class="max-w-3xl text-balance text-4xl font-black tracking-tight sm:text-6xl">
          Игровой фактчекинг для школьников
        </h1>
        <p class="max-w-2xl text-pretty text-lg text-slate-600">
          Сервис превращает скучные правила проверки источников в челлендж: найди манипуляцию, объясни ошибку, получи баллы и прокачай медиаграмотность.
        </p>
        <div class="flex flex-wrap gap-3">
          <a href="#check"><Button>Начать проверку</Button></a>
          <a href="#learn"><Button variant="secondary">Перейти к обучению</Button></a>
        </div>
      </div>

      <Card class="space-y-5">
        <div class="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-5 text-white shadow-lg shadow-blue-600/20">
          <Sparkles class="mb-8 size-6" />
          <p class="text-sm opacity-80">
            Вирусная фишка
          </p>
          <h2 class="mt-1 text-2xl font-black text-balance">
            Отправь подозрительную новость — получи разбор и чеклист проверки
          </h2>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div class="rounded-xl bg-slate-50 p-4">
            <span class="text-sm text-slate-500">Режимы</span>
            <b class="mt-1 block tabular-nums text-2xl">2</b>
          </div>
          <div class="rounded-xl bg-slate-50 p-4">
            <span class="text-sm text-slate-500">Сложности</span>
            <b class="mt-1 block tabular-nums text-2xl">2</b>
          </div>
        </div>
        <div class="flex items-center gap-3 rounded-xl bg-blue-50 p-4 text-blue-950">
          <Bot class="size-5 shrink-0" />
          <p class="text-sm">
            Telegram-бот повторяет сценарии сайта: проверка, обучение, рейтинг и сбор фактов.
          </p>
        </div>
      </Card>
    </section>

    <section id="about" class="grid gap-6 lg:grid-cols-3">
      <Card class="space-y-4 lg:col-span-2">
        <div class="flex items-center gap-3">
          <div class="grid size-10 place-items-center rounded-xl bg-rose-50 text-rose-600">
            <AlertTriangle class="size-5" />
          </div>
          <div>
            <h2 class="text-xl font-bold">
              Какие обманы разбираем
            </h2>
            <p class="text-sm text-slate-500">
              Типовые ловушки из соцсетей, чатов и коротких видео.
            </p>
          </div>
        </div>
        <div class="grid gap-3 sm:grid-cols-2">
          <div v-for="item in problemTypes" :key="item" class="rounded-xl bg-slate-50 p-4 text-sm text-slate-700 shadow-sm">
            <CheckCircle2 class="mb-3 size-5 text-blue-600" />
            {{ item }}
          </div>
        </div>
      </Card>

      <Card class="space-y-4">
        <div class="flex items-center gap-3">
          <div class="grid size-10 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
            <Search class="size-5" />
          </div>
          <div>
            <h2 class="text-xl font-bold">
              Аналоги
            </h2>
            <p class="text-sm text-slate-500">
              Что изучили для концепции.
            </p>
          </div>
        </div>
        <ul class="space-y-2 text-sm text-slate-700">
          <li v-for="item in analogs" :key="item" class="rounded-xl bg-slate-50 px-4 py-3">
            {{ item }}
          </li>
        </ul>
      </Card>
    </section>

    <section class="grid gap-6 lg:grid-cols-3">
      <Card v-for="(step, index) in steps" :key="step" class="space-y-4">
        <div class="flex size-11 items-center justify-center rounded-2xl bg-blue-600 text-lg font-black text-white shadow-lg shadow-blue-600/20 tabular-nums">
          {{ index + 1 }}
        </div>
        <p class="text-pretty text-slate-700">
          {{ step }}
        </p>
      </Card>
    </section>

    <section class="grid gap-6 lg:grid-cols-2">
      <FactCheckPanel />
      <LearningPanel />
    </section>

    <section class="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
      <SubmitFactPanel />
      <Card class="space-y-4">
        <div class="flex items-center gap-3">
          <div class="grid size-10 place-items-center rounded-xl bg-amber-50 text-amber-600">
            <Trophy class="size-5" />
          </div>
          <div>
            <h2 class="text-xl font-bold">
              Рейтинг челленджа
            </h2>
            <p class="text-sm text-slate-500">
              Мотивация играть и делиться результатом.
            </p>
            <p class="mt-2 inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
              Демо-данные
            </p>
          </div>
        </div>
        <ol class="space-y-3 text-sm">
          <li class="flex justify-between rounded-xl bg-slate-50 p-3">
            <span>1. Историк PRO</span><b class="tabular-nums">120</b>
          </li>
          <li class="flex justify-between rounded-xl bg-slate-50 p-3">
            <span>2. Охотник за фейками</span><b class="tabular-nums">80</b>
          </li>
          <li class="flex justify-between rounded-xl bg-slate-50 p-3">
            <span>3. Новичок</span><b class="tabular-nums">40</b>
          </li>
        </ol>
        <div class="rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
          <Gamepad2 class="mb-2 size-5" />
          В школе рейтинг можно использовать для классного часа по медиаграмотности.
        </div>
      </Card>
    </section>
  </main>
</template>
