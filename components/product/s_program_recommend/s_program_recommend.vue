<template>
  <section class="s-program-recommend s-margin" v-if="sectionData">
    <div class="l-wide l-border-radius">
      <h2 class="s-program-recommend__title a-font_h2" v-html="sectionData.title"></h2>
      <div class="s-program-recommend__swiper">
        <swiper :options="swiperOptionRecomend">
          <swiper-slide
            v-for="(item, index) in sectionData.items"
            :key="index"
            class="s-program-recommend__slide m-card-vertical"
          >
            <nuxt-link to="/">
              <m-card
                :title="item.attributes.name"
                :type="item.type === 'products' ? 'program' : item.type"
                description=""
                :bottomText="organization.name"
                :iconSrc="`${baseUrl}${organization.icon}`"
                :verticalImgSrc="`${baseUrl}${item.attributes.digital_image}`"
                @onLikeClick="onLikeClickHandler"
              />
            </nuxt-link>
          </swiper-slide>
        </swiper>
        <a-button
          class="swiper-button-prev m-card-verticalbutton s-program-recommend__button"
          size="medium"
          bg-color="ghost-primary"
          only-icon="square"
          iconType="si-chevron-left"
          slot="button-prev"
        ></a-button>
        <a-button
          class="swiper-button-next m-card-verticalbutton s-program-recommend__button"
          size="medium"
          bg-color="ghost-primary"
          only-icon="square"
          iconType="si-chevron-right"
          slot="button-next"
        ></a-button>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { MCard, AButton } from '@cwespb/synergyui';
import './s_program_recommend.scss';
import productSectionInfo from '~/api/productSectionInfo';
import getOrganizationProducts from '~/api/getOrganizationProducts';

export default {
  name: 'SProgramRecommend',

  components: {
    MCard,
    AButton,
    Swiper,
    SwiperSlide,
  },

  props: {
    organizationSlug: {
      type: String,
    },
  },

  data() {
    return {
      sectionData: null,
      baseUrl: process.env.S3_URL,
      organization: {
        name: 'Университет Синергия',
        icon: 'uploads/organizations/yuIYPVAzTpYhkDo2acWAZAMLpIh4LiRGttzzlyFs.svg',
      },
      swiperOptionRecomend: {
        slidesPerView: 'auto',
        spaceBetween: 16,
        grabCursor: true,
        direction: 'vertical',
        resistance: true,
        resistanceRatio: 0,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          475: {
            spaceBetween: 12,
            direction: 'horizontal',
          },
          991: {
            spaceBetween: 16,
            direction: 'horizontal',
          },
        },
      },
    };
  },

  async fetch() {
    if (this.organizationSlug) {
      const requestData = { slug: this.organizationSlug };
      await getOrganizationProducts(requestData).then((response) => {
        this.sectionData = {
          title: 'Другие программы университета',
          items: response,
        };
      });
    } else {
      const requestData = { slug: this.$route.params.slug, key: 's-program-recommend' };
      this.sectionData = await productSectionInfo(requestData);
    }
  },

  methods: {
    onLikeClickHandler() {
      this.$emit('onLikeClick');
    },
  },
};
</script>
