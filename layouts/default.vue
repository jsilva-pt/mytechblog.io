<template>
  <div class="pt-16 min-h-screen flex flex-col text-gray-800">
    <div
      class="fixed flex bg-white top-0 w-full h-16 z-10 border-b align-center"
    >
      <div class="flex justify-between w-full align-center px-5">
        <nuxt-link class="flex items-center" to="/">
          <div>
            <h1 class="text-3xl font-medium">
              MyTechBlog
            </h1>
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

    <div class="w-full max-w-md mx-auto text-center border-t mt-10">
      <div class="p-5 inline-block">
        <div class="text-sm mb-3">
          @ 2020 José Silva.
        </div>
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
    </div>
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
}
</script>
