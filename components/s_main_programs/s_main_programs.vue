<template>
  <section class="s-main-programs s-padding">
    <div class="l-wide l-border-radius">
      <h2 class="s-main-programs__h2 a-font_h5">{{ title }}</h2>
      <div class="s-main-programs__row">
        <div class="s-main-programs__cards">
          <template v-for="(product, index) in productsList">
            <nuxt-link
              :to="`/product/${product.slug}`"
              class="s-main-programs__wrapper"
              v-if="productsList && productsList.length > 0 && index < cardsSet"
              :key="product.id"
            >
              <m-card
                :title="product.name"
                :bottomText="product.included.organization.name"
                :name="product.name"
                :description="product.included.levels[0].name"
                :iconSrc="`${baseURL}${product.included.organization.logo}`"
                :verticalImgSrc="`${baseURL}${product.digital_image}`"
                type="program"
                @organization-click="onOrganizationClick(product)"
              />
            </nuxt-link>
          </template>
        </div>
        <s-banner v-if="viewType === 'product_list_banner'" :methods="[...this.methods[1]]" />
      </div>

      <nuxt-link v-if="optionsSection" :to="urlToCatalog" class="s-main-programs__btn-link">
        <a-button class="s-main-programs__btn" label="Показать все" bgColor="accent" @click="onButtonMoreClick" />
      </nuxt-link>
    </div>
  </section>
</template>

<script>
import { MCard, AButton } from '@cwespb/synergyui';
import SBanner from '~/components/s_banner/s_banner';
import getProductsList from '~/api/products_list';
import './s_main_programs.scss';

export default {
  name: 'SMainPrograms',

  components: {
    MCard,
    AButton,
    SBanner,
  },

  data() {
    return {
      productsList: [],
      baseURL: process.env.NUXT_ENV_S3BACKET,
      windowWidth: 0,
    };
  },
  props: ['methods', 'title', 'viewType', 'optionsSection'],
  methods: {
    getWindowWidth() {
      this.windowWidth = document.documentElement.clientWidth;
    },

    onOrganizationClick(product) {
      this.$router.push(`/organization/${product.included.organization.slug}`);
    },
    onButtonMoreClick() {
      this.$router.push(this.urlToCatalog);
    },
  },
  async fetch() {
    let [expandedMethod] = this.methods;
    if (expandedMethod) {
      expandedMethod = { ...expandedMethod.data };
      expandedMethod.include = ['organization', 'levels', 'directions'];
      const productsData = await getProductsList(expandedMethod);
      this.productsList = productsData.data;
    }
  },
  mounted() {
    this.$nextTick(() => {
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

    urlToCatalog() {
      return this.optionsSection?.find((item) => item.code === 'show_all').value;
    },
  },
};
</script>
