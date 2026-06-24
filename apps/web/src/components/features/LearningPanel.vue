<script setup lang="ts">
import { GraduationCap } from 'lucide-vue-next';
import { computed, shallowRef } from 'vue';
import Button from '@/components/ui/Button.vue';
import Card from '@/components/ui/Card.vue';
import Textarea from '@/components/ui/Textarea.vue';

type Difficulty = 'basic' | 'advanced';

const difficulty = shallowRef<Difficulty>('basic');
const answer = shallowRef('');
const submitted = shallowRef(false);

const task = computed(() => difficulty.value === 'basic'
  ? {
      text: 'Первый полет человека в космос совершил Юрий Гагарин 12 апреля 1961 года на корабле «Восток-1». Это длилось несколько суток.',
      errors: ['несколько суток', '108 минут'],
      points: 20,
      comment: 'Ошибка в длительности: полет продолжался примерно 108 минут.',
    }
  : {
      text: 'Блокада Ленинграда длилась около 500 дней, поэтому ее считают одной из самых коротких крупных осад XX века.',
      errors: ['500', '872', 'коротких'],
      points: 40,
      comment: 'Блокада длилась 872 дня. Формулировка искажает масштаб события.',
    });

const found = computed(() => task.value.errors.filter(error => answer.value.toLowerCase().includes(error.toLowerCase())).length);

function submit() {
  submitted.value = true;
}

function setDifficulty(value: Difficulty) {
  difficulty.value = value;
  answer.value = '';
  submitted.value = false;
}
</script>

<template>
  <Card id="learn" class="space-y-4">
    <div class="flex items-center gap-3">
      <div class="grid size-10 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
        <GraduationCap class="size-5" />
      </div>
      <div>
        <h2 class="text-xl font-bold">
          Обучающая игра
        </h2>
        <p class="text-sm text-slate-500">
          Найди ошибки и объясни, почему это фейк.
        </p>
      </div>
    </div>

    <div class="rounded-xl bg-indigo-50 px-4 py-3 text-sm text-indigo-950 shadow-sm">
      🤖 ИИ пока не используется: задания и ответы заранее подготовлены для демонстрации механики.
    </div>

    <div class="flex gap-2">
      <Button :variant="difficulty === 'basic' ? 'default' : 'secondary'" @click="setDifficulty('basic')">
        Обычный
      </Button>
      <Button :variant="difficulty === 'advanced' ? 'default' : 'secondary'" @click="setDifficulty('advanced')">
        Продвинутый
      </Button>
    </div>

    <p class="rounded-xl bg-slate-50 p-4 text-sm text-slate-700 text-pretty">
      {{ task.text }}
    </p>

    <Textarea v-model="answer" placeholder="Опиши найденные ошибки..." />
    <Button :disabled="!answer.trim()" @click="submit">
      Ответить
    </Button>

    <div v-if="submitted" class="rounded-xl bg-blue-50 p-4 text-sm text-blue-950">
      <b class="tabular-nums">+{{ found * (task.points / task.errors.length) }} баллов.</b>
      Найдено: {{ found }}/{{ task.errors.length }}. {{ task.comment }}
    </div>
  </Card>
</template>
