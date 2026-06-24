<script setup lang="ts">
import { SearchCheck } from 'lucide-vue-next';
import { computed, shallowRef } from 'vue';
import Button from '@/components/ui/Button.vue';
import Card from '@/components/ui/Card.vue';
import Textarea from '@/components/ui/Textarea.vue';

const apiUrl = import.meta.env.VITE_API_URL as string | undefined;
const text = shallowRef('');
const result = shallowRef('');
const loading = shallowRef(false);
const flags = ['шок', 'срочно', 'скрывают', '100%', 'без доказательств', 'все знают'];

const aiEnabled = computed(() => Boolean(apiUrl));

async function check() {
  loading.value = true;
  result.value = '';

  try {
    result.value = apiUrl ? await checkWithApi(text.value) : heuristicCheck(text.value);
  }
  catch {
    result.value = heuristicCheck(text.value);
  }
  finally {
    loading.value = false;
  }
}

async function checkWithApi(value: string) {
  const response = await fetch(`${apiUrl}/api/check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: value }),
  });

  if (!response.ok)
    throw new Error('Check failed');

  const data = await response.json() as { result: string };
  return data.result;
}

function heuristicCheck(value: string) {
  const hits = flags.filter(flag => value.toLowerCase().includes(flag));

  if (!hits.length)
    return '⚠️ AI недоступен. По тестовым правилам явных признаков фейка не найдено.';

  return `⚠️ AI недоступен. Найдены признаки недостоверности: ${hits.join(', ')}. Проверь источник, дату, автора и подтверждения в независимых источниках.`;
}
</script>

<template>
  <Card id="check" class="space-y-4">
    <div class="flex items-center gap-3">
      <div class="grid size-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
        <SearchCheck class="size-5" />
      </div>
      <div>
        <h2 class="text-xl font-bold">
          Проверить информацию
        </h2>
        <p class="text-sm text-slate-500">
          Вставь ссылку, статью или утверждение.
        </p>
      </div>
    </div>

    <div v-if="!aiEnabled" class="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900 shadow-sm">
      ⚠️ AI не настроен для сайта: работает учебная проверка по маркерам.
    </div>

    <Textarea v-model="text" placeholder="Например: Срочно! Это скрывают все СМИ..." />
    <Button :disabled="!text.trim() || loading" @click="check">
      {{ loading ? 'Проверяю…' : 'Проверить' }}
    </Button>

    <p v-if="result" class="whitespace-pre-line rounded-xl bg-slate-50 p-4 text-sm text-slate-700 text-pretty">
      {{ result }}
    </p>
  </Card>
</template>
