<template>
  <section v-if="organizationData" class="s-university-start s-margin">
    <div class="l-wide l-border-radius">
      <div
        class="s-university-start__wrapper"
        :style="{ backgroundColor: university.color ? university.color : '#fff' }"
      >
        <div class="s-university-start__header">
          <div v-if="getBreadcrumbs.length" class="s-university-start__header-breadcrumbs">
            <a-breadcrumbs :breadcrumbs="getBreadcrumbs" :key="key" />
          </div>
          <div class="s-university-start__header-icons">
            <i class="si-share s-university-start__header-icon" @click.stop="toggleMenu" tabindex="0" />
            <i
              class="si-bell s-university-start__header-icon"
              :style="{ display: 'none' }"
              @click="onBellClickHandler"
            />
            <i
              class="si-heart s-university-start__header-icon"
              :style="{ display: 'none' }"
              @click="onHeartClickHandler"
            />
          </div>
          <m-social-share
            :is-menu-open="isMenuOpen"
            :netSocials="netSocials"
            :title="university.name"
            :description="university.description"
            :image="university.photo"
            @changeMenuState="changeMenuState"
          />
        </div>
        <div class="s-university-start__content">
          <div class="s-university-start__info">
            <span v-if="university.city" class="s-university-start__info-subtitle a-font_l">{{ university.city }}</span>
            <h2 class="s-university-start__info-name a-font_h1">{{ university.name }}</h2>
            <p class="s-university-start__info-description a-font_xl">{{ university.description }}</p>
            <div class="s-university-start__photo s-university-start__photo-bottom">
              <img :src="university.photo" :alt="university.title" class="s-university-start__photo-img" />
              <a-logo type="bordered" :link="university.logoSrc" class="s-university-start__photo-logo" />
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
            <a-logo type="bordered" :link="university.logoSrc" class="s-university-start__photo-logo" />
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
    </div>
  </section>
</template>

<script>
import {
  AFactoid, ALogo, MCard, MSocialShare,
} from '@cwespb/synergyui';
import ABreadcrumbs from '~/components/_ui/a_breadcrumbs/a_breadcrumbs';
import './s_university_start.scss';

export default {
  name: 'SUniversityStart',

  props: {
    organizationData: {
      type: Object,
    },
    organizationCity: {
      type: Object,
    },
  },

  components: {
    ABreadcrumbs,
    AFactoid,
    ALogo,
    MCard,
    MSocialShare,
  },

  data() {
    return {
      baseURL: process.env.NUXT_ENV_S3BACKET,
      isMenuOpen: false,
      event: null,
      netSocials: [
        {
          id: 1,
          name: 'Вконтакте',
          icon: 'vk',
        },
      ],
      key: 100,
    };
  },

  mounted() {
    if (this.organizationData.land) {
      this.$store.commit('updateLander', this.organizationData);
    }
  },

  computed: {
    university() {
      return {
        city: this.organizationCity?.attributes?.name,
        name: this.organizationData.name,
        description: this.organizationData.description,
        type: this.organizationData.type_text,
        hostel: this.organizationData.is_hostel ? 'есть' : 'нет',
        photo: this.baseURL + this.organizationData.digital_image,
        logoSrc: this.baseURL + this.organizationData.preview_image,
      };
    },
    getBreadcrumbs() {
      const breadcrumbs = [
        { label: 'Главная', href: '/' },
        { label: 'Каталог', href: '/catalog' },
      ];

      if (this.university.city) {
        const breadcrumb = {
          label: `${this.university.city}`,
          href: `/catalog?&city_ids=${this.organizationCity?.id}`,
        };

        breadcrumbs.push(breadcrumb);
      }

      if (this.university.name) {
        const breadcrumb = {
          label: `${this.university.name}`,
          href: '',
        };

        breadcrumbs.push(breadcrumb);
      }

      return breadcrumbs;
    },
  },

  watch: {
    getBreadcrumbs() {
      this.key += 1;
    },
  },

  methods: {
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
