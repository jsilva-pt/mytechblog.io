<template>
  <div>
    <article-list :list="articles" />
  </div>
</template>

<script>
import metaTags from '~/utilities/metaTags'
export default {
  async asyncData({ params, app, $content, error }) {
    const articles = await $content('', { deep: true })
      .where({
        isSerieIntroduction: { $ne: true },
        isArticle: { $ne: false },
      })
      .sortBy('createdAt', 'desc')
      .fetch()

    return {
      articles,
    }
  },
  head() {
    return {
      title: 'MyTechBlog — A blog by José Silva',
      titleTemplate: '%s',
      meta: metaTags({
        title: 'A blog by José Silva',
        description: 'Frontend development articles',
        isTitlePrepended: true,
        isTitlePrefixed: false,
      }),
    }
  },
}
</script>
