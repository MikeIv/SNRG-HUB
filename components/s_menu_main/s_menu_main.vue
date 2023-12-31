<template>
  <div class="s-menu-main" :class="{ open: isOpen }">
    <div class="l-wide">
      <div class="s-menu-main__box">
        <div class="s-menu-main__items">
          <div class="s-menu-main__location">
            <MLocation />
          </div>

          <a-button
            v-if="!$synergyAuth.loggedIn"
            class="s-menu-main__login"
            label="Войти в аккаунт"
            bgColor="accent"
            @click="login"
          ></a-button>
          <MenuHorizontal class="s-menu-main__usermenu" />

          <div class="s-menu-main__title a-font_h5">Всё обучение</div>
          <template v-for="(item, idx) in menuAnchors" :index="idx">
            <div
              class="s-menu-main__item"
              @mouseover="handleMouseOver(idx)"
              @click.prevent="handleClickActive(idx)"
              :key="idx"
            >
              <a-sidebar-item :class="{ active: item.isActive }" :label="item.anchor" />
            </div>
          </template>
        </div>
        <div class="s-menu-main__content" :class="{ open: menuIsOpen }">
          <template v-for="(item, idx) in menuLinks">
            <div class="s-menu-main__links" :key="idx" :class="{ active: item.isActive }">
              <div class="s-menu-main__links-top" @click="handleClickActive">
                <div class="s-menu-main__links-icon si-chevron-left"></div>
                <div class="s-menu-main__links-title a-font_h4">{{ item.title }}</div>
              </div>
              <div class="s-menu-main__links-item" v-for="(linkItem, idx) in item.items" :key="idx">
                <div class="s-menu-main__link">
                  <div class="s-menu-main__link-top" @click="openMenuItem($event)">
                    <div class="s-menu-main__link-title a-font_xxl">
                      <nuxt-link :to="linkItem.link" @click="changeIsOpen">{{ linkItem.anchor }}</nuxt-link>
                    </div>
                    <div class="s-menu-main__link-icon si-chevron-down"></div>
                  </div>
                </div>
                <div class="s-menu-main__link-list" itemscope itemtype="http://schema.org/SiteNavigationElement">
                  <div v-for="(product, idx) in linkItem.products" :index="idx" :key="idx">
                    <nuxt-link
                      v-if="idx < 3"
                      :to="product.link"
                      @click.native="changeIsOpen"
                      class="s-menu-main__link-product"
                      itemprop="url"
                    >
                      <div class="s-menu-main__link-text a-font_m" itemprop="name">{{ product.anchor }}</div>
                    </nuxt-link>
                  </div>
                  <nuxt-link
                    v-if="linkItem.products.length > 3"
                    :to="linkItem.link"
                    @click="changeIsOpen"
                    class="s-menu-main__link-more"
                  >
                    <div class="s-menu-main__link-more--text a-font_l">Смотреть все</div>
                    <div class="s-menu-main__link-more--icon si-chevron-right"></div>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </template>
        </div>
        <nuxt-link class="s-menu-main__banner" :to="banner.link" v-if="banner.type !== ''">
          <m-banner
            :type="banner.type"
            :titleTxt="banner.titleText"
            :secondTxt="banner.secondTxt"
            :ImgSrc="baseUrl + banner.ImgSrc"
          ></m-banner>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ASidebarItem, AButton } from '@cwespb/synergyui';
import MBanner from '~/components/_ui/m_banner/m_banner';
import getMenuMain from '~/api/menuMain';
import getBannersDetail from '~/api/bannersDetail';
import MLocation from '../_ui/m_location/m_location';
import MenuHorizontal from '../menu_horizontal/menu_horizontal';
import './s_menu_main.scss';

export default {
  name: 'SMenuMain',

  components: {
    ASidebarItem,
    MBanner,
    AButton,
    MLocation,
    MenuHorizontal,
  },

  data() {
    return {
      menu: [],
      menuAnchors: [],
      menuLinks: [],
      isActive: false,
      windowWidth: 0,
      menuIsOpen: false,
      banner: {
        type: '',
        titleText: '',
        secondTxt: '',
        ImgSrc: '',
        link: '',
      },
      baseUrl: process.env.NUXT_ENV_S3BACKET,
    };
  },

  props: ['isOpen'],

  watch: {
    isOpen() {
      this.getScrollBody();
    },
  },

  async fetch() {
    this.menu = await getMenuMain().then(async (data) => {
      const menuData = data.list;
      if (data.banner_id) {
        const bannerData = {
          filter: {
            id: data.banner_id,
          },
        };
        const bannerDetail = await getBannersDetail(bannerData);
        this.banner.link = bannerDetail.link;
        this.banner.type = bannerDetail.banner_type;
        this.banner.titleText = bannerDetail.name;
        this.banner.secondTxt = bannerDetail.name_second;
        this.banner.ImgSrc = bannerDetail.image;
      }

      this.menuAnchors = menuData;
      menuData.forEach((el, i) => {
        const element = el;
        if (i === 0) {
          element.isActive = true;
        }
        const item = {
          title: element.anchor,
          items: element.sub_items,
          isActive: element.isActive,
        };
        this.menuLinks.push(item);
      });
    });
  },

  mounted() {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('DOMContentLoaded', this.handleResize);
    this.getScrollBody();
  },

  methods: {
    getActive(id) {
      this.menuLinks.forEach((data, i) => {
        const element = data;
        if (i === id) {
          element.isActive = true;
        } else {
          element.isActive = false;
        }
      });

      this.menuAnchors.forEach((data, i) => {
        const element = data;
        if (i === id) {
          element.isActive = true;
        } else {
          element.isActive = false;
        }
      });
    },

    getScrollBody() {
      const htmlWrapper = document.querySelector('html');

      if (this.isOpen === true) {
        htmlWrapper.style.overflowY = 'hidden';
      } else {
        htmlWrapper.style.overflowY = 'visible';
      }
    },

    handleResize() {
      this.windowWidth = window.innerWidth;
    },

    handleClickActive(id) {
      if (this.windowWidth < 767) {
        this.menuIsOpen = !this.menuIsOpen;
        this.getActive(id);
      }
    },

    handleMouseOver(id) {
      if (this.windowWidth > 767) {
        this.getActive(id);
      }
    },

    openMenuItem(event) {
      const element = event.target;
      const parent = element.closest('.s-menu-main__links-item');

      parent.classList.toggle('open');
    },

    changeIsOpen() {
      this.$emit('change-is-open');
    },

    login() {
      // this.$store.dispatch('auth/login');
      this.$synergyAuth.login();
    },
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('DOMContentLoaded', this.handleResize);
  },
};
</script>
