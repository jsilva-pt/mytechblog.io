<template>
  <div class="flex items-center">
    <div>Share on</div>
    <ShareNetwork
      v-for="network in networks"
      :key="network"
      :network="network"
      :url="currentUrl"
      :title="title"
      :description="description"
      :hashtags="['MyTechBlog'].concat(hashtags).join(',')"
      class="cursor-pointer inline-block p-3"
      :twitter-user="$config.twitterUsername"
    >
      <img
        :src="require(`~/assets/${network}.svg`)"
        width="24"
        height="24"
        :alt="network"
      />
    </ShareNetwork>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    hashtags: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      networks: ['facebook', 'twitter', 'linkedin'],
      currentUrl: this.$config.productionDomain + this.$route.path,
    }
  },
}
</script>
