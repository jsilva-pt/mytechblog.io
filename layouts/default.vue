<template>
  <div class="pt-16 min-h-screen flex flex-col text-gray-800">
    <div
      class="fixed flex bg-white top-0 w-full h-16 z-10 border-b align-center"
    >
      <div class="flex justify-between w-full align-center px-5">
        <nuxt-link class="flex items-center" to="/">
          <div>
            <h1 class="text-3xl font-medium">MyTechBlog</h1>
          </div>
        </nuxt-link>

        <div class="flex items-center">
          <nuxt-link class="font-medium px-4" to="/series">Series</nuxt-link>
          <a
            :href="$config.githubRepositoryUrl"
            target="_blank"
            class="hidden sm:block ml-3"
            rel="noopener"
          >
            <img
              src="~/assets/github.svg"
              width="24"
              height="24"
              alt="github"
            />
          </a>
          <a
            href="/feed.xml"
            target="_blank"
            class="hidden sm:block ml-3"
            rel="noopener"
          >
            <img src="~/assets/rss.svg" width="24" height="24" alt="rss" />
          </a>
        </div>
      </div>
    </div>

    <div
      class="mx-auto max-w-3xl py-3 flex-grow"
      :class="{
        'md:ml-64 xl:mx-auto max-w-3xl md:ml-64 sm:px-6 w-full': withToc,
      }"
    >
      <Nuxt />
    </div>

    <div class="w-full max-w-xs mx-auto text-center border-t mt-10 py-5">
      <div class="text-4xl">Newsletter</div>

      <p v-if="subscribed">
        An email to confirm your subscription has been sent to
        {{ subscribedEmail }} 💚
      </p>

      <form v-else>
        <div class="mb-3">Get notified when a new article is released.</div>
        <div class="mb-2 flex">
          <input
            v-model="subscribedEmail"
            class="border border-teal-500 rounded-l w-full text-gray-700 py-1 px-2 focus:outline-none"
            type="email"
            placeholder="Email"
            aria-label="Email"
          />
          <button
            class="bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded-r"
            type="button"
            @click="subscribe"
          >
            Subscribe
          </button>
        </div>

        <div class="text-xs text-left">
          ✋️ I promise to respect your inbox. No spam.
        </div>
      </form>
    </div>

    <footer class="w-full max-w-md mx-auto text-center border-t mt-5">
      <div class="p-5 inline-block">
        <div class="text-sm mb-3">@ 2020 José Silva.</div>
        <div class="mb-3">
          <a :href="$config.githubAccountUrl" target="_blank" rel="noopener">
            <img
              class="inline-block"
              src="~/assets/github-footer.svg"
              height="64"
              width="64"
              alt="github"
            />
          </a>
          <a :href="$config.linkedinAccountUrl" target="_blank" rel="noopener">
            <img
              class="ml-3 inline-block"
              src="~/assets/linkedin-footer.svg"
              height="64"
              width="64"
              alt="linkedin"
            />
          </a>
          <a :href="$config.twitterAccountUrl" target="_blank" rel="noopener">
            <img
              class="ml-3 inline-block"
              src="~/assets/twitter-footer.svg"
              height="64"
              width="64"
              alt="twitter"
            />
          </a>
        </div>
        <div class="text-xs">
          Icons from
          <a href="https://icons8.com/" target="_blank" rel="noopener">
            <u>Icons8</u>
          </a>
          and
          <a href="https://feathericons.com/" target="_blank" rel="noopener">
            <u>Feather</u>.
          </a>
          Illustrations from
          <a href="https://undraw.co/" target="_blank" rel="noopener">
            <u>unDraw</u>.
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    withToc: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      subscribedEmail: null,
      subscribed: false,
    }
  },
  head() {
    const canonical = this.$config.productionDomain + this.$route.path
    const link = [
      { rel: 'canonical', href: canonical },
      {
        rel: 'alternate',
        hreflang: 'en',
        href: canonical,
      },
    ]
    return {
      htmlAttrs: { lang: 'en' },
      link,
      meta: [
        { hid: 'og:url', property: 'og:url', content: canonical },
        { hid: 'twitter:url', property: 'twitter:url', content: canonical },
      ],
    }
  },
  methods: {
    async subscribe() {
      try {
        await this.$axios({
          method: 'post',
          url: `${this.$config.currentDomain}/api/subscribe`,
          data: { email: this.subscribedEmail },
        })

        this.subscribed = true
      } catch {}
    },
  },
}
</script>
