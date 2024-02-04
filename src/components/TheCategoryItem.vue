<script setup lang="ts">
import { useItemStore } from '@/stores/item'
import { computed } from 'vue'

const props = defineProps<{
  category: Category
}>()

const items = useItemStore()
const isSelected = computed(() => props.category == items.currentCategory)
</script>

<template>
  <button
    class="shadow category-item"
    @click.stop="items.currentCategory = category"
    :class="{
      active: isSelected
    }"
  >
    <section class="img"></section>
    <span>{{ category.name }}</span>
  </button>
</template>

<style scoped>
.category-item {
  border-radius: var(--border-radius-r);
  gap: var(--padding-s);
  transition: all 0.3s ease-in;
  display: flex;
  align-items: center;
  font-weight: bold;
  color: grey;
  font-size: 16px;
  background: var(--bg-white);
  padding: var(--padding-xs) var(--padding-s) var(--padding-xs) var(--padding-xs);
}

.img {
  width: var(--action-height);
  height: var(--action-height);
  border-radius: var(--border-radius-r);
  background: var(--color-background-1);
}

.active {
  background: var(--color-accent);
  color: white;
  flex-direction: row-reverse;
  padding: var(--padding-xs) var(--padding-xs) var(--padding-xs) var(--padding-s);
}

.active > .img {
  background: white;
}
</style>
