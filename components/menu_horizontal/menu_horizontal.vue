<template>
  <nav class="menu-horizontal" itemscope itemtype="http://schema.org/SiteNavigationElement">
    <swiper class="menu-horizontal__box" :options="swiperOption">
      <swiper-slide v-for="item in navLinks" :key="item.id">
        <div
          class="menu-horizontal__link"
          v-if="item && item.links && item.links.length"
          @click.stop="item.active = !item.active"
        >
          {{ item.anchor }}
          <i class="si-chevron-down"></i>
        </div>
        <a class="menu-horizontal__link" v-else :href="item.link">{{ item.anchor }}</a>

        <a-tooltip
          v-if="item.links && item.links.length"
          :visible="item.active"
          @hide-tooltip="item.active = false"
          :position="dropdownPosition"
          class="menu-horizontal__dropdown"
        >
          <div v-for="link in item.links" :key="link.id" class="menu-horizontal__dropdown-link a-font_m">
            <a
              @click="item.active = false"
              :href="`/catalog?page=1&${Object.entries(link.filter_by)[0][0]}=${Object.entries(
                link.filter_by,
              )[0][1].toString()}`"
              itemprop="url"
            >
              {{ link.anchor }}
            </a>
          </div>
        </a-tooltip>
      </swiper-slide>

      <!-- <template v-else>
        <template v-for="item in navLinks">
          <swiper-slide v-if="item.active" :key="item.id" itemprop="name">
            <a
              :href="`/catalog?page=1&${Object.entries(item.filter_by)[0][0]}=${Object.entries(
                item.filter_by,
              )[0][1].toString()}`"
              class="a-font_m menu-horizontal__link"
              itemprop="url"
            >
              {{ item.anchor }}
            </a>
          </swiper-slide>
        </template>
      </template> -->
    </swiper>
  </nav>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import ATooltip from '~/components/_ui/a_tooltip/a_tooltip';
import getMenuData from '~/api/menuData';
import './menu_horizontal.scss';

export default {
  name: 'menuMain',

  props: {
    dropdownPosition: {
      type: String,
      default: 'bottom-left',
    },
  },

  data() {
    return {
      navLinks: [],
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 24,
        breakpoints: {
          768: {
            spaceBetween: 40,
          },
        },
      },
      menuDropdownVisible: true,
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    ATooltip,
  },
  async fetch() {
    const educationLinks = await getMenuData();
    /* if (this.customList?.length) {
      this.navLinks = this.customList;
    } */
    this.navLinks = [
      { anchor: 'Образование', links: educationLinks, active: false },
      { anchor: 'Учебные заведения', link: '/organizations' },
      { anchor: 'Журнал', link: '/journal' },
      { anchor: 'Тесты', link: '/proftest' },
      /* { anchor: 'Специальности', link: '#' },
      { anchor: 'Профессии', link: '#' },
      { anchor: 'Вебинары', link: '#' },
      { anchor: 'Сравнения', link: '#' }, */
    ];
  },
};
</script>
