<template>
  <section class="s-university-start">
    <!-- <SUniversityStart :breadcrumbs="breadcrumbs" :university="university" :logoSrc="logoSrc" /> -->
    <div class="s-university-start__wrapper" :style="{ backgroundColor: university.color ? university.color : '#fff' }">
      <div class="s-university-start__header">
        <div class="s-university-start__header-breadcrumbs">
          <a-breadcrumbs-item :breadcrumbs="breadcrumbs" />
        </div>
        <div class="s-university-start__header-icons">
          <i class="si-share s-university-start__header-icon" @click.stop="toggleMenu" tabindex="0" />
          <i class="si-bell s-university-start__header-icon" @click="onBellClickHandler" />
          <i class="si-heart s-university-start__header-icon" @click="onHeartClickHandler" />
        </div>
        <m-social-share
          :is-menu-open="isMenuOpen"
          :networks="university.social"
          :title="university.name"
          :description="university.description"
          :image="university.photo"
          @changeMenuState="changeMenuState"
        />
      </div>
      <div class="s-university-start__content">
        <div class="s-university-start__info">
          <span class="s-university-start__info-subtitle a-font_l">{{ university.city }}</span>
          <h1 class="s-university-start__info-name a-font_h1">{{ university.name }}</h1>
          <p class="s-university-start__info-description a-font_xl">{{ university.description }}</p>
          <div class="s-university-start__photo s-university-start__photo-bottom">
            <img :src="university.photo" :alt="university.title" class="s-university-start__photo-img" />
            <a-logo type="bordered" :link="logoSrc" class="s-university-start__photo-logo" />
          </div>
          <div class="s-university-start__info-additional">
            <a-factoid
              type="default"
              :title="university.hostel"
              subtitle="Общежитие"
              class="s-university-start__info-additional_factoid"
              v-if="university.hostel"
            />
            <a-factoid type="default" :title="university.type" subtitle="Тип" v-if="university.type" />
          </div>
        </div>
        <div class="s-university-start__photo s-university-start__photo-top">
          <img :src="university.photo" alt="university" class="s-university-start__photo-img" />
          <a-logo type="bordered" :link="logoSrc" class="s-university-start__photo-logo" />
          <div class="s-university-start__photo-event" v-if="event">
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
      <div class="s-university-start__photo-event s-university-start__photo-event-bottom" v-if="event">
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
import { ABreadcrumbsItem, AFactoid, ALogo, MCard, MSocialShare } from '@cwespb/synergyui';
import './s_university_start.scss';
import getOrganizationsDetail from '~/api/organizationsDetail';

export default {
  name: 's_university_start',

  components: {
    ABreadcrumbsItem,
    AFactoid,
    ALogo,
    MCard,
    MSocialShare,
  },

  data() {
    return {
      baseURL: process.env.NUXT_ENV_S3BACKET,
      isMenuOpen: false,
      breadcrumbs: [
        {
          label: 'Учебные заведения',
          href: '/',
        },
        {
          label: 'Универститеты',
          href: '/',
        },
        {
          label: 'Москва',
          href: '/',
        },
        {
          label: 'МОИ',
          href: '/',
        },
      ],
      logoSrc: '',
      event: ''/* {
        date: '',
        title: '',
        description: '',
        link: '#',
      } */,
      university: {
        city: '',
        name: '',
        description: '',
        type: '',
        hostel: '',
        social: [],
        link: '#',
        photo: '',
      },
    };
  },
  props: ['methods', 'title'],
  async fetch() {
    const expandedMethod = this.methods[0].data;
    expandedMethod.include = ['persons', 'city'];
    const preData = await getOrganizationsDetail(expandedMethod);
    this.university.city = preData.data.included.city.name;
    this.university.name = preData.data.name;
    this.university.description = preData.data.description;
    this.university.type = preData.data.type_text;
    this.university.hostel = 'есть';
    this.university.photo = this.baseURL + preData.data.digital_image;
    this.logoSrc = this.baseURL + preData.data.logo;
  },

  computed: {
    hostel() {
      return this.university.hostel ? 'Есть' : 'Нет';
    },
  },

  methods: {
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

    onBellClickHandler() {
      this.$emit('bell-click');
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
