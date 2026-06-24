<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@/lib/utils';

const props = withDefaults(defineProps<{
  variant?: 'default' | 'secondary' | 'ghost'
  class?: string
}>(), {
  variant: 'default',
  class: '',
});

const buttonClass = computed(() => cn(
  'inline-flex min-h-10 items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold shadow-sm transition-[transform,background-color,box-shadow] active:scale-[0.96] disabled:pointer-events-none disabled:opacity-50',
  props.variant === 'default' && 'bg-blue-600 text-white shadow-blue-600/20 hover:bg-blue-700',
  props.variant === 'secondary' && 'bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50',
  props.variant === 'ghost' && 'text-slate-700 shadow-none hover:bg-white/70',
  props.class,
));
</script>

<template>
  <button :class="buttonClass">
    <slot />
  </button>
</template>
