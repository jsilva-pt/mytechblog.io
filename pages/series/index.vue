<template>
  <div>
    <article-list v-if="series.length > 0" :list="series" />
    <div v-else class="text-center px-3 py-6">
      <img
        class="max-w-xs mx-auto w-full"
        src="~/assets/not-found.svg"
        width="320"
        height="222"
        alt="No results"
      />
      <h2 class="text-blue-500 text-2xl font-medium my-3">
        There are no series published yet!
      </h2>
      <p>
        Series is a set of articles about something. It can be a series of
        articles about working with Google Analytics or a series of articles
        about creating a blog similar to the one you are reading right now.
      </p>
    </div>
  </div>
</template>

<script>
import metaTags from '~/utilities/metaTags'
export default {
  async asyncData({ $content }) {
    const series = await $content('series', { deep: true })
      .where({ isSerieIntroduction: { $eq: true } })
      .fetch()

    return {
      series,
    }
  },
  head() {
    return {
      title: 'Series',
      meta: metaTags({
        title: 'Series',
        description: 'Frontend development articles',
      }),
    }
  },
}
</script>
