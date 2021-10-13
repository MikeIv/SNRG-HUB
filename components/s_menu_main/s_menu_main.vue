<template>
  <div class="s-menu-main" :class="{ open: isOpen }">
    <div class="l-default">
      <div class="s-menu-main__box">
        <div class="s-menu-main__items">
          <div class="s-menu-main__login">
            <a-button label="Войти в аккаунт" backgroundColor="#F5F5F5" bgColor="ghost-accept"></a-button>
          </div>
          <div class="s-menu-main__title a-font_h5">Всё обучение</div>
          <template v-for="(item, idx) in menuAnchors" :index="idx">
            <div class="s-menu-main__item" @mouseover="getActive(idx)" @click="getActiveMenu" :key="idx">
              <a-sidebar-item :class="{ active: item.isActive }" :label="item.anchor" href="" />
            </div>
          </template>
        </div>
        <div class="s-menu-main__content" :class="{ open: menuIsOpen }">
          <template v-for="(item, idx) in menuLinks">
            <div class="s-menu-main__links" :key="idx" :class="{ active: item.isActive }">
              <div class="s-menu-main__links-top" @click="getActiveMenu">
                <div class="s-menu-main__links-icon si-chevron-left"></div>
                <div class="s-menu-main__links-title a-font_h4">{{ item.title }}</div>
              </div>
              <div class="s-menu-main__links-item" v-for="(linkItem, idx) in item.items" :key="idx">
                <div class="s-menu-main__link">
                  <div class="s-menu-main__link-top" @click="openMenuItem($event)">
                    <div class="s-menu-main__link-title a-font_xxl">
                      <nuxt-link :to="linkItem.link">{{ linkItem.anchor }}</nuxt-link>
                    </div>
                    <div class="s-menu-main__link-icon si-chevron-down"></div>
                  </div>
                </div>
                <div class="s-menu-main__link-list">
                  <div v-for="(product, idx) in linkItem.products" :index="idx" :key="idx">
                    <nuxt-link v-if="idx < 5" :to="product.link" class="s-menu-main__link-product">
                      <div class="s-menu-main__link-text a-font_m" @click="changeIsOpen">{{ product.anchor }}</div>
                    </nuxt-link>
                  </div>
                  <nuxt-link :to="`${buildFilterUrl(linkItem.link)}`" class="s-menu-main__link-more">
                    <div class="s-menu-main__link-more--text a-font_l">Смотреть все</div>
                    <div class="s-menu-main__link-more--icon si-chevron-right"></div>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </template>
        </div>
        <nuxt-link :to="banner.link">
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
import { ASidebarItem, MBanner, AButton } from '@cwespb/synergyui';
import getMenuMain from '~/api/menuMain';
import getBannersDetail from '~/api/bannersDetail';
import './s_menu_main.scss';

export default {
  name: 'SMenuMain',

  components: {
    ASidebarItem,
    MBanner,
    AButton,
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
  },

  methods: {
    buildFilterUrl(link) {
      return `${link.split('?')[0]}?page=1&${link.split('?')[1]}`;
    },

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

    getActiveMenu() {
      if (this.windowWidth < 767) {
        this.menuIsOpen = !this.menuIsOpen;
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
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('DOMContentLoaded', this.handleResize);
  },
};
</script>
