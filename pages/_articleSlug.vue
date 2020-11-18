<template>
  <article-details :article="article" />
</template>

<script>
import metaTags from '~/utilities/metaTags'
export default {
  layout: 'details',
  async asyncData({ params, $content }) {
    const article = await $content('articles', params.articleSlug).fetch()

    return {
      article,
    }
  },
  head() {
    return {
      title: this.article.title,
      meta: metaTags({
        title: this.article.title,
        description: this.article.description,
        publishedTime: this.article.publishedTime,
        modifiedTime: this.article.modifiedTime,
      }),
    }
  },
}
</script>
