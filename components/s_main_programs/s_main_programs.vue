<template>
  <section class="l-wide">
    <h2 class="s_main_programs__h2 a-font_h5">{{ title }}</h2>
    <div class="s_main_programs__cards">
      <template v-for="(product, index) in productsList">
        <nuxt-link
          to="/#"
          class="s_main_programs__wrapper"
          v-if="productsList && productsList.length > 0 && index < cardsSet"
          :key="product.id"
        >
          <m-card
            :title="product.name"
            :bottomText="product.included.organization.name"
            :name="product.name"
            :description="product.included.levels[0].name"
            :iconSrc="`${baseURL}/${product.included.organization.logo}`"
            :verticalImgSrc="`${baseURL}/${product.digital_image}`"
            type="program"
            @click="$router.push({ name: 'product', params: { id: product.id } })"
          />
        </nuxt-link>
      </template>
    </div>

    <nuxt-link :to="redirectUrl" class="s_main_programs__btn-link">
      <a-button class="s_main_programs__btn" label="Показать все" bgColor="accent" />
    </nuxt-link>
  </section>
</template>

<script>
import { MCard, AButton } from '@cwespb/synergyui';
import getProductsList from '~/api/products_list';
import getBannersDetail from '~/api/bannersDetail';
import './s_main_programs.scss';

export default {
  name: 'SMainPrograms',

  components: {
    MCard,
    AButton,
  },

  data() {
    return {
      productsList: [],
      bannersDetail: [],
      baseURL: process.env.NUXT_ENV_S3BACKET,
      windowWidth: 0,
      redirectUrl: '#',
    };
  },
  props: ['methods', 'title', 'view_type'],
  methods: {
    getWindowWidth() {
      this.windowWidth = document.documentElement.clientWidth;
    },
  },
  async fetch() {
    let [expandedMethod, expandedBanners] = this.methods;
    if (expandedMethod) {
      expandedMethod = { ...expandedMethod.data };
      expandedMethod.include = ['organization', 'levels', 'directions'];
      this.productsList = await getProductsList(expandedMethod);
    }
    if (expandedBanners) {
      expandedBanners = { ...expandedBanners.data };
      this.bannersDetail = await getBannersDetail(expandedBanners);
    }
  },
  mounted() {
    this.$nextTick(function () {
      window.addEventListener('resize', this.getWindowWidth);
      // Init
      this.getWindowWidth();
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowWidth);
  },
  computed: {
    cardsSet() {
      let cardsList = 0;
      if (this.windowWidth > 991) {
        cardsList = 6;
      } else if (this.windowWidth < 992) {
        cardsList = 4;
      }
      return cardsList;
    },
  },
};
</script>
