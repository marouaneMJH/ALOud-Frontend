<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="rounded-lg border border-gold-700 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 shadow-xl shadow-gold-500/20 max-w-md w-full mx-4">
      <!-- Header -->
      <div class="px-6 py-4 border-b border-gold-700 bg-gradient-to-r from-gray-900 to-gold-950">
        <h3 class="text-lg font-semibold text-gold-300">{{ title }}</h3>
      </div>

      <!-- Content -->
      <div class="px-6 py-4">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isOpen?: boolean;
  title: string;
}

withDefaults(defineProps<Props>(), {
  isOpen: false,
});

const emit = defineEmits<{
  close: [];
}>();
</script>
