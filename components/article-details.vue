<template>
  <div>
    <article>
      <div class="p-5 sm:px-0 mb-8">
        <h1 class="text-4xl font-medium mb-3 leading-none">
          {{ article.title }}
        </h1>
        <p class="text-sm text-gray-700 mb-1">
          {{ formatDate(article.createdAt) }}
        </p>
        <p class="text-gray-700">{{ article.description }}</p>
      </div>
      <div class="mx-5 sm:mx-0">
        <nuxt-content :document="article" />
        <p class="mt-10">
          Caught a mistake or want to contribute to improve this article?
          <a :href="githubArticleUrl" target="_blank" rel="noopener">
            Edit this page on GitHub!
          </a>
        </p>
      </div>
    </article>

    <nav
      class="fixed top-0 left-0 bottom-0 overflow-y-auto text-sm p-4 mt-16 w-64 hidden md:block bg-white"
    >
      <ul>
        <li
          v-for="(link, index) of article.toc"
          :key="link.id"
          class="toc text-gray-700"
          :class="{
            'py-2': link.depth === 2,
            'ml-2 pb-2': link.depth === 3,
            'text-green-700 font-bold': selectedIndex === index,
          }"
        >
          <NuxtLink :to="`#${link.id}`">
            {{ link.text }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  layout: 'details',
  props: {
    article: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      selected: null,
      selectedIndex: 0,
    }
  },
  computed: {
    githubArticleUrl() {
      return `${this.$config.githubRepositoryUrl}content${this.article.path}${this.article.extension}`
    },
  },
  mounted() {
    this.updateSidebar()
    window.addEventListener('scroll', this.updateSidebar)
  },
  destroyed() {
    window.removeEventListener('scroll', this.updateSidebar)
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
    updateSidebar() {
      const allHeaders = document.querySelectorAll(
        '.nuxt-content h2, .nuxt-content h3'
      )

      for (let i = 0; i < allHeaders.length; i++) {
        const link = allHeaders[i]
        if (link.getBoundingClientRect().top > 1) {
          this.selected = allHeaders[-1]
          this.selectedIndex = i - 1
          break
        }
      }
    },
  },
}
</script>
