<template>
  <article-details :article="article" />
</template>

<script>
export default {
  layout: 'details',
  async asyncData({ params, $content }) {
    const article = await $content(
      `series/${params.serieSlug}/${params.articleSlug}`
    ).fetch()

    return {
      article,
    }
  },
}
</script>
