<template>
  <section class="s_main_programs__wrapper">
    <h2 class="s_main_programs_h2 a-font_h5">{{ title }}</h2>
    <div class="s_main_programs__cards">
      <template v-for="(product, index) in productsList">
        <m-card
          :key="product.id"
          :title="product.name"
          :bottomText="product.included.organization.name"
          :name="product.name"
          :description="product.included.levels[0].name"
          :iconSrc="`${baseURL}/${product.included.organization.logo}`"
          type="program"
          v-if="productsList && productsList.length > 0 && index <= cardsSet"
        />
      </template>
    </div>

    <nuxt-link :to="redirectUrl" class="s_main_programs__btn-link">
      <a-button class="s_main_programs__btn" label="Показать все" bgColor="accent" />
    </nuxt-link>
    <!--    <pre>{{ methods }}</pre>-->
    <!--    <pre>{{ productsList }}</pre>-->
  </section>
</template>

<script>
import { MCard, AButton } from '@cwespb/synergyui';
import getProductsList from '~/api/products_list';
import '@cwespb/synergyui/lib/synergyui.css';
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
      baseURL: process.env.NUXT_ENV_S3BACKET,
      limitationList: 5,
      windowWidth: 0,
      redirectUrl: 'google.com',
    };
  },
  props: ['methods', 'title', 'view_type'],
  methods: {
    getWindowWidth() {
      this.windowWidth = document.documentElement.clientWidth;
    },
  },
  async mounted() {
    this.methods.forEach(async (method) => {
      const expandedMethod = { ...method.data };
      expandedMethod.include = ['organization', 'levels', 'directions'];
      this.productsList = await getProductsList(expandedMethod);
      console.log(this.productsList);
    });
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
      if (this.windowWidth > 991) {
        this.limitationList = 5;
      } else if (this.windowWidth < 991) {
        this.limitationList = 3;
      }
      return this.limitationList;
    },
  },
};
</script>
