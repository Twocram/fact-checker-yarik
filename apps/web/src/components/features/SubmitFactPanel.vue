<script setup lang="ts">
import { Send } from 'lucide-vue-next';
import { shallowRef } from 'vue';
import Button from '@/components/ui/Button.vue';
import Card from '@/components/ui/Card.vue';
import Textarea from '@/components/ui/Textarea.vue';

const proposal = shallowRef('');
const sent = shallowRef(false);

function send() {
  sent.value = true;
  proposal.value = '';
}
</script>

<template>
  <Card id="submit" class="space-y-4">
    <div class="flex items-center gap-3">
      <div class="grid size-10 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
        <Send class="size-5" />
      </div>
      <div>
        <h2 class="text-xl font-bold">
          Предложить факт
        </h2>
        <p class="text-sm text-slate-500">
          Для будущей модерации администрацией.
        </p>
      </div>
    </div>

    <Textarea v-model="proposal" placeholder="Факт, источник и доказательства..." />
    <Button :disabled="!proposal.trim()" @click="send">
      Отправить
    </Button>

    <p v-if="sent" class="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900">
      Спасибо! В тестовой версии заявка сохраняется только в интерфейсе.
    </p>
  </Card>
</template>
