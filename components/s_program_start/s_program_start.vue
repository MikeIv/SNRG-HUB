<template>
  <section class="s-program-start">
    <div class="s-program-start__wrapper" :style="{ backgroundColor: program.color ? program.color : '#fff' }">
      <div class="s-program-start__header">
        <div class="s-program-start__header-breadcrumbs">
          <a-breadcrumbs-item :breadcrumbs="breadcrumbs" />
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
      <div class="s-program-start__content">
        <div class="s-program-start__info-top">
          <span class="s-program-start__info-top-subtitle a-font_l">{{ program.subtitle }}</span>
          <h1 class="s-program-start__info-top-name a-font_h1">{{ program.title }}</h1>
          <p class="s-program-start__info-top-description a-font_xl">{{ program.description }}</p>
          <div class="s-program-start__photo s-program-start__photo-bottom">
            <img :src="program.photo" :alt="program.title" class="s-program-start__photo-img" />
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
                :title="program.city"
                subtitle="Город"
                class="s-program-start__info-bottom-additional_factoid"
                v-if="program.city"
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
              <a-factoid type="default" :title="program.form" subtitle="Форма обучения" />
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
  ABreadcrumbsItem, AFactoid, AButton, MSocialShare, MCard,
} from '@cwespb/synergyui';
import './s_program_start.scss';

import getProductsDetail from '~/api/productsDetail';
import getParseDate from '~/assets/js/getParseDate';
import getDateFromDatesObj from '~/assets/js/getDateFromDatesObj';

export default {
  name: 's-program-start',

  components: {
    ABreadcrumbsItem,
    AFactoid,
    AButton,
    MSocialShare,
    MCard,
  },

  data() {
    return {
      baseURL: process.env.NUXT_ENV_S3BACKET,
      isMenuOpen: false,

      breadcrumbs: [
        // {
        //   label: 'Учебные заведения',
        //   href: '/',
        // },
        // {
        //   label: 'Универститеты',
        //   href: '/',
        // },
        // {
        //   label: 'Москва',
        //   href: '/',
        // },
        // {
        //   label: 'Онлайн-курсы',
        //   href: '/',
        // },
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
    };
  },

  props: ['methods', 'title', 'favoriteIcon', 'shareIcon'],

  async fetch() {
    const expandedMethod = this.methods[0].data;
    const preData = await getProductsDetail(expandedMethod);
    const getData = preData.data;
    this.program.color = getData.color;
    this.program.title = getData.name;
    this.program.subtitle = getData.included.levels[0].name;
    this.program.description = getData.description;
    this.program.document = getData.document;
    this.program.city = getData.included.organization.included.city.name;
    this.program.form = getData.included.formats[0].name;
    this.program.photo = `${this.baseURL}${getData.digital_image}`;

    // Перевод строки в виде "4y-6m-5d" и возврат даты в нужном формате (4 года 6 месяцев 5 дней)
    this.program.duration = getDateFromDatesObj(getParseDate(getData.duration_format_value));
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
      this.isMenuOpen = !this.isMenuOpen;
      if (this.isMenuOpen) {
        this.$nextTick(() => {
          document.addEventListener('click', this.hideMenu);
        });
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
