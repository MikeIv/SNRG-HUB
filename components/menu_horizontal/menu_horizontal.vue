<template>
  <nav class="menu-horizontal" itemscope itemtype="http://schema.org/SiteNavigationElement">
    <div class="menu-horizontal__box" v-if="isMobile">
      <div class="menu-horizontal__item menu-horizontal__item--user">
        <AUser
          :user="{ name: 'Алексей О.', img: '/ege/teachers/3.jpg', published: 'Юр.лицо' }"
          namePosition="right"
          imageShape="circle"
        />
        <i class="si-chevron-right"></i>
      </div>
      <div
        class="menu-horizontal__item"
        v-for="(menuItem, i) in navLinks"
        :key="i"
        @click="menuItemClickHandler(menuItem)"
      >
        <template v-if="menuItem && menuItem.links">
          <a-sidebar-item :label="menuItem.anchor" />
          <div class="menu-horizontal__content" :class="{ open: menuItem.isActive }">
            <div class="menu-horizontal__links">
              <div class="menu-horizontal__links-top" @click="menuItem.isActive = false">
                <div class="menu-horizontal__links-icon si-chevron-left"></div>
                <div class="menu-horizontal__links-title a-font_h4">{{ menuItem }}</div>
              </div>
            </div>
            <div class="menu-horizontal__link-list" itemscope itemtype="http://schema.org/SiteNavigationElement">
              <a
                v-for="(linkItem, idx) in menuItem.links"
                :key="idx"
                class="menu-horizontal__link"
                :href="`/catalog?page=1&${Object.entries(linkItem.filter_by)[0][0]}=${Object.entries(
                  linkItem.filter_by,
                )[0][1].toString()}`"
                itemprop="url"
              >
                <a-sidebar-item :label="linkItem.anchor" />
              </a>
            </div>
          </div>
        </template>
        <a v-else :href="menuItem.link">
          <a-sidebar-item :label="menuItem.anchor" />
        </a>
      </div>
    </div>

    <swiper v-else class="menu-horizontal__box" :options="swiperOption">
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
    </swiper>
  </nav>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { ASidebarItem } from '@cwespb/synergyui';
import ATooltip from '~/components/_ui/a_tooltip/a_tooltip';
import AUser from '~/components/_ui/a_user/a_user';
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
      isMobile: false,
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    ASidebarItem,
    ATooltip,
    AUser,
  },
  methods: {
    menuItemClickHandler(item) {
      this.$set(item, 'isActive', !item.isActive);
      console.log('----', item);
    },
  },
  async mounted() {
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

    this.isMobile = window.innerWidth < 768;
  },
};
</script>
