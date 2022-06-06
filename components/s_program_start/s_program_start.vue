<template>
  <section class="s-program-start s-margin" v-if="program">
    <div class="l-wide l-border-radius">
      <div class="s-program-start__wrapper" :style="{ backgroundColor: program.color ? program.color : '#eaebff' }">
        <div class="s-program-start__header">
          <div
            v-if="$route.name !== 'edu-platform' && $route.name !== 'edu-platform-slug'"
            class="s-program-start__header-breadcrumbs"
          >
            <a-breadcrumbs :breadcrumbs="getBreadcrumbs" />
          </div>
          <div class="s-program-start__header-icons">
            <i v-if="shareIcon" class="si-share s-program-start__header-icon" @click.stop="toggleMenu" tabindex="0" />
            <i v-if="favoriteIcon" class="si-heart s-program-start__header-icon" @click="onHeartClickHandler" />
          </div>
          <m-social-share
            :is-menu-open="isMenuOpen"
            :netSocials="netSocials"
            :title="program.name"
            :description="program.description"
            :image="`${this.baseURL}${program.digital_image}`"
            @changeMenuState="changeMenuState"
          />
        </div>
        <div class="s-program-start__content" itemscope itemtype="https://schema.org/Product">
          <div class="s-program-start__info-top">
            <span class="s-program-start__info-top-subtitle a-font_l" v-if="program.levels">{{
              program.levels.name
            }}</span>
            <h2 class="s-program-start__info-top-name a-font_h1" itemprop="name">{{ program.name }}</h2>
            <p class="s-program-start__info-top-description a-font_xl" itemprop="description">
              {{ program.description }}
            </p>
            <div class="s-program-start__photo s-program-start__photo-bottom">
              <img
                :src="`${this.baseURL}${program.digital_image}`"
                :alt="program.name"
                class="s-program-start__photo-img"
                itemprop="image"
              />
            </div>
            <div itemprop="aggregateRating" itemscope itemtype="https://schema.org/AggregateRating">
              <meta itemprop="ratingValue" content="5" />
              <meta itemprop="reviewCount" content="5" />
            </div>
            <div class="s-program-start__info-bottom">
              <div class="s-program-start__info-bottom-buttons">
                <a-button
                  @click="
                    signUpClickHandler();
                    scrollToFormBlock();
                  "
                  bg-color="accent"
                  size="large"
                  label="Записаться"
                />
                <a-button
                  @click="
                    getProgramClickHandler();
                    scrollToFormBlock();
                  "
                  bg-color="none"
                  size="large"
                  label="Получить программу"
                  class="s-program-start__info-bottom-button"
                />
              </div>
              <div class="s-program-start__info-bottom-additional">
                <!-- <a-factoid
                  type="default"
                  :title="program.start_date !== null ? program.start_date : program.city"
                  :subtitle="program.start_date !== null ? 'Дата начала' : 'Город'"
                  class="s-program-start__info-bottom-additional_factoid"
                  v-if="program.city || program.start_date"
                /> -->
                <!-- <a-factoid
                  type="default"
                  :title="program.language"
                  subtitle="Язык"
                  class="s-program-start__info-bottom-additional_factoid"
                  v-if="program.language"
                /> -->
                <a-factoid
                  v-if="program.duration"
                  type="default"
                  :title="getDurationDate"
                  subtitle="Длительность"
                  class="s-program-start__info-bottom-additional_factoid"
                />
                <!-- eslint-disable max-len -->
                <a-factoid
                  v-if="getEducationFormats"
                  type="default"
                  :title="getEducationFormats"
                  subtitle="Форма обучения"
                  class="s-program-start__info-bottom-additional_factoid s-program-start__info-bottom-additional_factoid--form"
                />
              </div>
            </div>
          </div>
          <div class="s-program-start__photo s-program-start__photo-top">
            <img
              :src="`${this.baseURL}${program.digital_image}`"
              :alt="program.name"
              class="s-program-start__photo-img"
            />
          </div>
        </div>
        <div class="s-program-start__event" v-if="event">
          <m-card
            type="announce"
            :title="event.title"
            :description="event.description"
            :date="event.date"
            :link="event.link"
            @more="onMoreBtnClickHandler"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {
  AFactoid, AButton, MSocialShare, MCard,
} from '@cwespb/synergyui';
import './s_program_start.scss';
import getParseDate from '~/assets/js/getParseDate';
import getDateFromDatesObj from '~/assets/js/getDateFromDatesObj';
import ABreadcrumbs from '~/components/_ui/a_breadcrumbs/a_breadcrumbs';

export default {
  name: 's-program-start',

  components: {
    AFactoid,
    AButton,
    ABreadcrumbs,
    MSocialShare,
    MCard,
  },

  data() {
    return {
      getDuration: '',
      baseURL: process.env.NUXT_ENV_S3BACKET,
      isMenuOpen: false,

      netSocials: [
        {
          id: 1,
          name: 'Вконтакте',
          icon: 'vk',
        },
      ],
      event: null,
      directions: {},
      city: {},
      organization: {},
      level: {},
    };
  },

  props: {
    methods: {
      type: Array,
    },
    title: {
      type: String,
    },
    shareIcon: {
      type: Boolean,
      default: true,
    },
    favoriteIcon: {
      type: Boolean,
      default: false,
    },
    product: {
      type: Object,
    },
  },

  async fetch() {
    /* const expandedMethod = this.methods[0].data;
    const preData = await getProductsDetail(expandedMethod); */
    console.log('--this.product--', this.program);
    /* this.program = { ...this.product }; */

    // Создаем запись для формата обучения
    this.calculateDuration();
  },

  computed: {
    getDurationDate() {
      this.calculateDuration();
      if (this.program.beginDuration === '') {
        return this.program.duration;
      }
      return `${this.program.beginDuration} - ${this.program.duration}`;
    },
    getEducationFormats() {
      const formats = this.program?.formats?.map((format) => format.name);
      return formats?.join(', ');
    },
    getBreadcrumbs() {
      let globalHref = '/catalog';
      const citylHref = '';

      const breadcrumbs = [
        { label: 'Главная', href: '/' },
        { label: 'Каталог', href: '/catalog' },
      ];

      /* const landerInfo = {
      version: getData.included.landVersion ? getData.included.landVersion.value : '',
      partner: getData.partner ? getData.partner : getData.included.organization.partner,
    };

    this.$store.commit('updateLander', landerInfo); */

      /* if (this.city) {
      citylHref += `?&city_ids=${this.city.id}`;

      const breadcrumb = {
        label: this.city.name,
        href: globalHref + citylHref,
      };

      breadcrumbs.push(breadcrumb);
    } */

      if (this.program.levels) {
        globalHref += `/${this.program.levels.name}`;

        const breadcrumb = {
          label: this.program.levels.name,
          href: globalHref + citylHref,
        };

        breadcrumbs.push(breadcrumb);
      }

      /* if (this.directions) {
      globalHref += `/${this.directions[0].slug}`;

      const breadcrumb = {
        label: this.directions[0].name,
        href: globalHref + citylHref,
        mobile: true,
      };

      breadcrumbs.push(breadcrumb);
    } */

      if (this.program.organization) {
        globalHref += `/${this.program.organization.slug}`;

        const breadcrumb = {
          label: this.program.organization.abbreviation_name,
          href: globalHref + citylHref,
        };

        breadcrumbs.push(breadcrumb);
      }

      if (this.program.name) {
        const breadcrumb = {
          label: this.program.name,
          href: '',
        };

        breadcrumbs.push(breadcrumb);
      }

      return breadcrumbs;
    },
    program: {
      get() {
        return this.product;
      },
      set(newVal) {
        this.$emit('updateProduct', newVal);
      },
    },
  },

  methods: {
    scrollToFormBlock() {
      const formBlock = document.getElementById('form');
      const formPriceBlock = document.getElementById('form-price');
      if (formPriceBlock) {
        formPriceBlock.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
      } else {
        formBlock.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
      }
    },
    calculateDuration() {
      // Перевод строки в виде "4y-6m-5d" и возврат даты в нужном формате (4 года 6 месяцев 5 дней)
      const beginDurationFormatValue = this.program?.begin_duration_format_value;
      if (beginDurationFormatValue) {
        this.program.beginDuration = getDateFromDatesObj(getParseDate(beginDurationFormatValue));
      }

      const durationFormatValue = this.program?.duration_format_value;
      if (durationFormatValue) {
        this.program.duration = getDateFromDatesObj(getParseDate(durationFormatValue));
      }
    },

    changeMenuState(value) {
      this.isMenuOpen = value;
    },

    toggleMenu() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
          navigator.userAgent,
        )
        && navigator.share
      ) {
        navigator.share({
          title: this.program.title,
          url: document.location.href,
        });
      } else {
        this.isMenuOpen = !this.isMenuOpen;
        if (this.isMenuOpen) {
          this.$nextTick(() => {
            document.addEventListener('click', this.hideMenu);
          });
        }
      }
    },

    hideMenu() {
      this.isMenuOpen = false;
      document.removeEventListener('click', this.hideMenu);
    },

    signUpClickHandler() {
      this.$emit('sign-up');
    },

    getProgramClickHandler() {
      this.$emit('get-program-click');
    },

    onHeartClickHandler() {
      this.$emit('heart-click');
    },

    onMoreBtnClickHandler() {
      this.$emit('more-click');
    },
  },
};
</script>

<style lang="scss" scoped>
[itemprop='aggregateRating'] {
  display: none;
}
</style>
