<script setup lang="ts">
import { useItemStore } from '@/stores/item'
import TheCategoryItem from './TheCategoryItem.vue'
import TheListItem from './TheListItem.vue'

const items = useItemStore()
</script>

<template>
  <section class="main-content column">
    <section class="row header">
      <h1 class="app-logo"><i>FoodHub</i></h1>
      <p>
        The best flavors and menus are only in one place, find your favorite food here, get
        discounts up to 30%
      </p>
    </section>
    <section class="sticky">
      <input
        v-model="items.filter"
        placeholder="Search for dishes"
        class="shadow search-bar"
        type="text"
      />
      <section class="row category-list">
        <TheCategoryItem
          :category="category"
          v-for="category in items.categories"
          :key="category.name"
        />
      </section>
    </section>
    <section class="grid">
      <TransitionGroup name="list">
        <TheListItem v-for="item in items.items" :item="item" :key="item.name" />
      </TransitionGroup>
    </section>
  </section>
</template>

<style scoped>
.sticky {
  position: sticky;
  flex-direction: column;
  display: flex;
  top: 0px;
  z-index: 3;
}

.search-bar {
  border-radius: var(--border-radius-r);
  height: var(--action-height);
  margin: var(--padding);
  margin-bottom: 0;
  padding: var(--padding);
  height: var(--action-height);
  background: var(--bg-white);
}

.main-content {
  overflow: auto;
  padding-bottom: var(--padding);
}

.header {
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: 1fr auto;
  background: var(--color-background-1);
  padding: var(--padding);
  gap: var(--padding-s);
}

p {
  font-size: 12px;
  grid-row: 2;
}

.category-list {
  overflow-x: auto;
  gap: var(--padding-s);
  padding: var(--padding);
}

.grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(196px, 1fr));
  gap: var(--padding);
  padding: 0 var(--padding);
}
</style>
