<template>
  <section class="s-program-start">
    <div class="s-program-start__wrapper" :style="{ backgroundColor: program.color ? program.color : '#fff' }">
      <div class="s-program-start__header">
        <div class="s-program-start__header-breadcrumbs">
          <!-- <a-breadcrumbs :breadcrumbs="breadcrumbs" /> -->
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
          <h2 class="s-program-start__info-top-name a-font_h1">{{ program.title }}</h2>
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
                title="к результату на экзамене"
                subtitle="+ 25 баллов"
                class="s-program-start__info-bottom-additional_factoid"
                v-if="program.city || program.start_date"
              />
              <a-factoid
                type="default"
                title="всего за 8 месяцев"
                subtitle="Полная подготовка"
                class="s-program-start__info-bottom-additional_factoid"
                v-if="program.language"
              />
              <a-factoid
                type="default"
                title="от методистов ФИПИ"
                subtitle="Пробные тесты"
                class="s-program-start__info-bottom-additional_factoid"
                v-if="program.duration"
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
// import ABreadcrumbs from '~/components/a_breadcrumbs/a_breadcrumbs';

export default {
  name: 's-program-start',

  components: {
    AFactoid,
    AButton,
    // ABreadcrumbs,
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
        description:
          // eslint-disable-next-line max-len
          'Первая в России онлайн-школа с полноценным аккредитованным образовательным процессом',
        subtitle: 'Школьное онлайн-образование',
        title: 'Подготовка к ЕГЭ/ОГЭ',
        color: '#FFF8CC',
        social: [],
        language: 'Русский',
        city: 'Москва',
        document: '',
        duration: '4 года',
        form: 'Очно, заочно',
        photo: '/ege/program.png',
        link: '',
        start_date: null,
      },
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
