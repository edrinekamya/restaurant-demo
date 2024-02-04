import { categories, items } from '@/data'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useItemStore = defineStore('item', {
  state: () => ({
    entities: items,
    categories,
    currentCategory: categories[0],
    filter: ''
  }),
  getters: {
    items: (state) =>
      state.entities.filter(
        (i) =>
          (i.category.name === state.currentCategory.name ||
            state.currentCategory.name === 'All') &&
          i.name.toLowerCase().includes(state.filter.trim().toLowerCase())
      )
  },
  actions: {}
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useItemStore, import.meta.hot))
}
