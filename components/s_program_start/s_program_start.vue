<template>
  <section class="s-program-start">
    <div class="s-program-start__wrapper" :style="{ backgroundColor: program.color ? program.color : '#fff' }">
      <div class="s-program-start__header">
        <div
          v-if="$route.name !== 'edu-platform' && $route.name !== 'edu-platform-slug'"
          class="s-program-start__header-breadcrumbs"
        >
          <a-breadcrumbs :breadcrumbs="breadcrumbs" />
        </div>
        <div class="s-program-start__header-icons">
          <i v-if="shareIcon" class="si-share s-program-start__header-icon" @click.stop="toggleMenu" tabindex="0" />
          <i v-if="favoriteIcon" class="si-heart s-program-start__header-icon" @click="onHeartClickHandler" />
        </div>
        <m-social-share
          :is-menu-open="isMenuOpen"
          :networks="program.social"
          :title="program.title"
          :description="program.description"
          :image="program.photo"
          @changeMenuState="changeMenuState"
        />
      </div>
      <div class="s-program-start__content" itemscope itemtype="https://schema.org/Product">
        <div class="s-program-start__info-top">
          <span class="s-program-start__info-top-subtitle a-font_l">{{ program.subtitle }}</span>
          <h2 class="s-program-start__info-top-name a-font_h1" itemprop="name">{{ program.title }}</h2>
          <p class="s-program-start__info-top-description a-font_xl" itemprop="description">
            {{ program.description }}
          </p>
          <div class="s-program-start__photo s-program-start__photo-bottom">
            <img :src="program.photo" :alt="program.title" class="s-program-start__photo-img" itemprop="image" />
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
              <a-factoid
                type="default"
                :title="program.start_date !== null ? program.start_date : program.city"
                :subtitle="program.start_date !== null ? 'Дата начала' : 'Город'"
                class="s-program-start__info-bottom-additional_factoid"
                v-if="program.city || program.start_date"
              />
              <a-factoid
                type="default"
                :title="program.language"
                subtitle="Язык"
                class="s-program-start__info-bottom-additional_factoid"
                v-if="program.language"
              />
              <a-factoid
                type="default"
                :title="program.duration"
                subtitle="Длительность"
                class="s-program-start__info-bottom-additional_factoid"
                v-if="program.duration"
              />
              <a-factoid
                type="default"
                :title="program.form"
                subtitle="Форма обучения"
                class="s-program-start__info-bottom-additional_factoid"
              />
            </div>
          </div>
        </div>
        <div class="s-program-start__photo s-program-start__photo-top">
          <img :src="program.photo" :alt="program.title" class="s-program-start__photo-img" />
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
  </section>
</template>

<script>
import {
  AFactoid, AButton, MSocialShare, MCard,
} from '@cwespb/synergyui';
import './s_program_start.scss';
import getProductsDetail from '~/api/productsDetail';
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
      baseURL: process.env.NUXT_ENV_S3BACKET,
      isMenuOpen: false,

      breadcrumbs: [
        {
          label: 'Главная',
          href: '/',
        },
        {
          label: 'Каталог',
          href: '/catalog',
        },
      ],

      event: null,
      program: {
        description: '',
        subtitle: '',
        title: '',
        color: '',
        social: [],
        city: '',
        document: '',
        duration: '',
        form: '',
        photo: '',
        link: '',
      },
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
  },

  async fetch() {
    const expandedMethod = this.methods[0].data;
    const preData = await getProductsDetail(expandedMethod);
    const getData = preData.data;
    this.program.color = getData.color;
    this.program.title = getData.name;
    this.program.subtitle = getData.included.levels[0]?.name;
    this.program.description = getData.description;
    this.program.document = getData.document;
    this.program.city = getData.included.organization.included.city?.name;
    this.program.start_date = getData.start_date;
    const formats = getData.included.formats.map((format) => format.name);
    this.program.form = formats.join(', ');
    this.program.photo = `${this.baseURL}${getData.digital_image}`;
    this.organization = getData.included.organization;

    this.directions = getData.included.directions;
    this.city = getData.included.organization.included.city;
    this.level = getData.included.levels;

    let globalHref = '/catalog';
    let citylHref = '';

    if (getData.included.organization.land) {
      this.$store.commit('updateLander', getData.included.organization);
    }

    if (this.city) {
      citylHref += `?&city_ids=${this.city.id}`;

      const breadcrumb = {
        label: this.city.name,
        href: globalHref + citylHref,
      };

      this.breadcrumbs.push(breadcrumb);
    }

    if (this.level) {
      globalHref += `/${this.level[0].slug}`;

      const breadcrumb = {
        label: this.level[0].name,
        href: globalHref + citylHref,
      };

      this.breadcrumbs.push(breadcrumb);
    }

    if (this.directions) {
      globalHref += `/${this.directions[0].slug}`;

      const breadcrumb = {
        label: this.directions[0].name,
        href: globalHref + citylHref,
        mobile: true,
      };

      this.breadcrumbs.push(breadcrumb);
    }

    if (this.organization) {
      globalHref += `/${this.organization.slug}`;

      const breadcrumb = {
        label: this.organization.abbreviation_name,
        href: globalHref + citylHref,
      };

      this.breadcrumbs.push(breadcrumb);
    }

    if (this.program.title) {
      const breadcrumb = {
        label: this.program.title,
        href: '',
      };

      this.breadcrumbs.push(breadcrumb);
    }

    // Перевод строки в виде "4y-6m-5d" и возврат даты в нужном формате (4 года 6 месяцев 5 дней)
    if (getData.duration_format_value) {
      this.program.duration = getDateFromDatesObj(getParseDate(getData.duration_format_value));
    }
  },

  methods: {
    scrollToFormBlock() {
      const formBlock = document.getElementById('form');
      formBlock.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
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
