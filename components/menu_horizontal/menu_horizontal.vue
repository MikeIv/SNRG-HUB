<template>
  <nav class="menu-horizontal" itemscope itemtype="http://schema.org/SiteNavigationElement">
    <div v-if="isMobile" class="menu-horizontal__box">
      <div
        v-if="$synergyAuth.loggedIn"
        class="menu-horizontal__item menu-horizontal__item--user"
        @click="userMenuVisible = true"
      >
        <AUser
          @avatar-click="userMenuVisible = true"
          class="menu-horizontal__user"
          :user="user"
          namePosition="right"
          imageShape="circle"
        />
        <i class="si-chevron-right"></i>
        <div class="menu-horizontal__content menu-horizontal__content--user" :class="{ open: userMenuVisible }">
          <div class="menu-horizontal__content-head" @click.stop="userMenuVisible = false">
            <i class="si-chevron-left"></i>
            <div class="menu-horizontal__content-title a-font_h4">Назад</div>
          </div>
          <MUserMenu />
        </div>
      </div>
      <div
        class="menu-horizontal__item a-font_l"
        v-for="(menuItem, i) in navLinks"
        :key="i"
        @click="menuItemClickHandler(menuItem)"
      >
        <template v-if="menuItem && menuItem.links">
          <a-sidebar-item class="menu-horizontal__item-text" :label="menuItem.anchor" />
          <div class="menu-horizontal__content" :class="{ open: menuItem.isActive }">
            <div class="menu-horizontal__content-head" @click="menuGoBack">
              <i class="si-chevron-left"></i>
              <div class="menu-horizontal__content-title a-font_h4">{{ menuItem.anchor }}</div>
            </div>
            <div class="menu-horizontal__content-list" itemscope itemtype="http://schema.org/SiteNavigationElement">
              <a
                v-for="(linkItem, idx) in menuItem.links"
                :key="idx"
                class="menu-horizontal__content-link a-font_xxl"
                :href="`/catalog?page=1&${Object.entries(linkItem.filter_by)[0][0]}=${Object.entries(
                  linkItem.filter_by,
                )[0][1].toString()}`"
                itemprop="url"
                @click.stop
              >
                {{ linkItem.anchor }}
              </a>
            </div>
          </div>
        </template>
        <a v-else :href="menuItem.link" class="menu-horizontal__item-text">{{ menuItem.anchor }}</a>
      </div>
    </div>

    <swiper
      v-else
      class="menu-horizontal__box"
      :options="swiperOption"
      :style="`overflow: ${disableSliderOverflow ? 'hidden' : ''}`"
    >
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
import MUserMenu from '~/components/_ui/m_usermenu/m_usermenu';
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
      userAvatar: '',
      isMobile: false,
      userMenuVisible: false,
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    ASidebarItem,
    ATooltip,
    AUser,
    MUserMenu,
  },
  methods: {
    menuItemClickHandler(item) {
      this.$set(item, 'isActive', !item.isActive);
    },
    menuGoBack(item) {
      this.$set(item, 'isActive', false);
    },
  },
  computed: {
    userData() {
      return this.$synergyAuth.user;
    },
    userFullName() {
      const name = this.userData?.account_information?.name || '';
      const surname = this.userData?.account_information?.surname;
      return `${name} ${(surname && surname[0]) || ''}`.trim();
    },
    user() {
      return {
        name: this.userFullName,
        published: this.userData?.email?.email,
        img: this.userAvatar,
      };
    },
    disableSliderOverflow() {
      return this.navLinks.every((link) => !link?.active);
    },
  },
  async mounted() {
    const educationLinks = await getMenuData();
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
    this.userAvatar = await this.$synergyAuth.getUserAvatar();
  },
};
</script>
