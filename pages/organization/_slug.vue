<template>
  <div class="l-default">
    <LazyHydrate :key="id" v-for="{ key, methods, title, id } in pageInfo.components" when-visible>
      <component
        :is="key"
        :methods="methods"
        :title="title"
        :products-per-page="16"
        :entity_page="pageInfo.entity_page"
      ></component>
    </LazyHydrate>
    <MobileButton />
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration';
import MobileButton from '~/components/mobile_button/mobile_button';

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
          hid: 'keywords',
          name: 'keywords',
          content: this.pageMeta?.keywords,
        },
        {
          hid: 'description',
          name: 'description',
          content: this.pageMeta?.description,
        },
        {
          hid: 'og:type',
          name: 'og:type',
          content: 'website',
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.pageMeta?.title,
        },
        {
          hid: 'og:site_name',
          name: 'og:site_name',
          content: 'Synergyeducation',
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.pageMeta?.description,
        },
      ],
      bodyAttrs: {
        class: 'bg-gray',
      },
    };
  },

  components: {
    LazyHydrate,
    MobileButton,
  },

  middleware: ['getPageInfo', 'parseUtms'],
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
