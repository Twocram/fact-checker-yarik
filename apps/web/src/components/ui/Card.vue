<script setup lang="ts">
import { computed } from 'vue';
import { cn } from '@/lib/utils';

const props = withDefaults(defineProps<{ class?: string }>(), { class: '' });
const cardClass = computed(() => cn('rounded-2xl bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.10),0_1px_2px_rgba(15,23,42,0.06)] backdrop-blur', props.class));
</script>

<template>
  <section :class="cardClass">
    <slot />
  </section>
</template>
