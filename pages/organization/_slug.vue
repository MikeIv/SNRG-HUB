<template>
  <div class="l-default">
    <component
      :is="key"
      v-for="{ key, methods, title, id } in pageInfo.components"
      :key="id"
      :methods="methods"
      :title="title"
    ></component>
    <pre>{{PageInfo}}</pre>
  </div>
</template>

<script>
export default {
  layout: 'organization',

  data() {
    return {
      title: 'Organization page',
    };
  },
  computed: {
    pageInfo() {
      return this.$store.state.pageInfo;
    },
    pageMeta() {
      return this.$store.state.pageMeta;
    },
  },

  head() {
    return {
      title: this.pageMeta?.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Home page description',
        },
      ],
      bodyAttrs: {
        class: 'bg-gray',
      },
    };
  },

  components: {},

  middleware: 'getPageInfo',
};
</script>

<style lang="scss">
.organization-page {
  --layout-v-padding: 3.75rem; // 60px
  --layout-h-padding: 5rem; // 80px
  @media all and (max-width: 1199px) {
    --layout-h-padding: 1.875rem; // 30px
    --layout-v-padding: 2.5rem; // 40px
  }
  @media all and (max-width: 767px) {
    --layout-h-padding: 1rem; // 16px
    --layout-v-padding: 2rem; // 32px
  }
  @media screen and (max-width: 767px) {
    .l-default {
      --layout-padding: 0;
    }
  }
  .s-partners {
    position: relative;
    overflow: hidden;
    width: 100%;
    margin: 1.25rem auto;
    padding: var(--layout-v-padding) var(--layout-h-padding);
    background-color: var(--a-color_bg);
    border-radius: var(--a-borderRadius--bg);
  }
}
</style>
