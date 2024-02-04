<script setup lang="ts">
import { useResponsiveness } from '@/composables/responsive'

const { isSmall } = useResponsiveness()
defineEmits(['press'])
</script>

<template>
  <button @click="$emit('press')" class="row">
    <v-icon v-if="isSmall" class="icon" name="io-chevron-back" />
    <h1><slot></slot></h1>
  </button>
</template>

<style scoped>
.icon {
  height: 24px;
  width: 24px;
}

button {
  padding: 2px 4px 2px 0;
  border-radius: var(--border-radius-m);
}

button:hover {
  background: #dddddd;
}

h1 {
  font-size: 1.2rem;
}
</style>
