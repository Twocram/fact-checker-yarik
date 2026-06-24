<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@/lib/utils';

const props = withDefaults(defineProps<{ placeholder?: string, class?: string }>(), {
  placeholder: '',
  class: '',
});
const model = defineModel<string>({ default: '' });
const textareaClass = computed(() => cn('min-h-36 w-full resize-y rounded-xl bg-white px-4 py-3 text-sm shadow-inner outline-none ring-1 ring-slate-200 transition-[box-shadow] placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500', props.class));
</script>

<template>
  <textarea v-model="model" :class="textareaClass" :placeholder="props.placeholder" />
</template>
