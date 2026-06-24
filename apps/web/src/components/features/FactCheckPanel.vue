<script setup lang="ts">
import { SearchCheck } from 'lucide-vue-next';
import { computed, shallowRef } from 'vue';
import Button from '@/components/ui/Button.vue';
import Card from '@/components/ui/Card.vue';
import Textarea from '@/components/ui/Textarea.vue';

const text = shallowRef('');
const checked = shallowRef(false);
const flags = ['шок', 'срочно', 'скрывают', '100%', 'без доказательств', 'все знают'];

const hits = computed(() => flags.filter(flag => text.value.toLowerCase().includes(flag)));
const verdict = computed(() => {
  if (!checked.value)
    return '';
  return hits.value.length
    ? `Есть признаки недостоверности: ${hits.value.join(', ')}.`
    : 'Явных признаков фейка по тестовым правилам не найдено. Нужна проверка по базе источников.';
});

function check() {
  checked.value = true;
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

    <div class="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900 shadow-sm">
      ⚠️ Сейчас это MVP без ИИ: проверка ищет учебные маркеры кликбейта и манипуляций.
    </div>

    <Textarea v-model="text" placeholder="Например: Срочно! Это скрывают все СМИ..." />
    <Button :disabled="!text.trim()" @click="check">
      Проверить
    </Button>

    <p v-if="verdict" class="rounded-xl bg-slate-50 p-4 text-sm text-slate-700 text-pretty">
      {{ verdict }}
    </p>
  </Card>
</template>
