<template>
  <div class="text-lg">
    <nuxt-content :document="serie" class="px-4 sm:p-0 mb-12" />
    <div class="px-4 sm:p-0 mb-5 sm:mb-8">
      <h2 class="text-2xl">The articles</h2>
    </div>
    <article-list :list="articles" />
  </div>
</template>

<script>
export default {
  async asyncData({ params, app, $content, error }) {
    const serie = await $content(
      `series/${params.serieSlug}/introduction`
    ).fetch()
    const articles = await $content(`series/${params.serieSlug}`)
      .where({ isSerieIntroduction: { $ne: true } })
      .sortBy('order', 'asc')
      .fetch()
    return {
      serie,
      articles,
    }
  },
}
</script>
