<template>
  <div class="l-wide">
    <div class="lp-banner" :style="`background-image: url(${baseURL}${landingDetailInfo.image_src})`">
      <h1 class="lp-banner__title">{{ landingDetailInfo.name }}</h1>
      <div class="lp-banner__description">{{ landingDetailInfo.description }}</div>
    </div>
    <s-catalog-landing :products-per-page="10" :filters="landingDetailInfo.included" />
    <pre>
      {{ landingDetailInfo }}
    </pre>
  </div>
</template>

<script>
import getLandingDetail from '~/api/landingsDetail';
import SCatalogLanding from '~/components/marketing/s_catalog_landing/s_catalog_landing';

export default {
  components: { SCatalogLanding },

  data() {
    return {
      baseURL: process.env.NUXT_ENV_S3BACKET,
    };
  },

  async asyncData() {
    const request = {
      filter: {
        id: 1,
      },
      include: ['formats', 'levels', 'directions', 'cities', 'organizations'],
    };

    const landingDetailInfo = await getLandingDetail(request);
    return {
      landingDetailInfo,
    };
  },
};
</script>

<style lang="scss">
.lp-banner {
  position: relative;
  overflow: hidden;
  padding: 50px 100px;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover;
  @media screen and (max-width: 991px) {
    padding: var(--a-padding--x6) var(--a-padding--x8);
  }
  @media screen and (max-width: 767px) {
    padding: var(--a-padding--x8) var(--a-padding--x4);
  }

  &__title {
    max-width: 380px;
  }

  &__description {
    padding: var(--a-padding--x4) 0 var(--a-padding--x5) 0;
  }
}
</style>
