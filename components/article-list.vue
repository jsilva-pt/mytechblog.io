<template>
  <div class="articles">
    <nuxt-link
      v-for="block in list"
      :key="block.path"
      class="block p-5 mb-6 hover:shadow"
      :to="getUrl(block)"
    >
      <h2 class="text-4xl font-medium leading-none mb-3 text-blue-500">
        {{ block.title }}
      </h2>
      <p class="text-sm text-gray-700 mb-1">
        {{ formatDate(block.createdAt) }}
      </p>
      <p class="text-gray-700">{{ block.description }}</p>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return []
      },
    },
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
    getUrl(block) {
      if (block.dir.startsWith('/articles')) {
        return block.slug
      } else if (block.dir.startsWith('/series')) {
        return `${block.dir}/${block.slug}`
      } else {
        return block.dir
      }
    },
  },
}
</script>
