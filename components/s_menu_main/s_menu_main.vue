<template>
  <div class="s-menu-main" :class="{ open: isOpen }">
    <div class="l-default">
      <div class="s-menu-main__box">
        <div class="s-menu-main__items">
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
                <div to="" class="s-menu-main__link">
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
                      <div class="s-menu-main__link-text a-font_m">{{ product.anchor }}</div>
                    </nuxt-link>
                  </div>
                  <nuxt-link :to="linkItem.link" class="s-menu-main__link-more">
                    <div class="s-menu-main__link-more--text a-font_l">Смотреть все</div>
                    <div class="s-menu-main__link-more--icon si-chevron-right"></div>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </template>
        </div>

        <m-banner
          type="side"
          titleTxt="Разработка VR/AR"
          secondTxt="Станьте редким востребованным специалистом"
          ImgBgSrc="https://placeimg.com/250/350/people"
        ></m-banner>
      </div>
    </div>
  </div>
</template>

<script>
import { ASidebarItem, MBanner } from '@cwespb/synergyui';
import getMenuMain from '~/api/menuMain';
import './s_menu_main.scss';

export default {
  name: 'SMenuMain',

  components: {
    ASidebarItem,
    MBanner,
  },

  data() {
    return {
      menu: [],
      menuAnchors: [],
      menuLinks: [],
      isActive: false,
      windowWidth: 0,
      isOpen: this.open,
      menuIsOpen: false,
    };
  },

  watch: {
    open(val) {
      this.isOpen = val;
    },
  },

  async fetch() {
    this.menu = await getMenuMain().then((data) => {
      this.menuAnchors = data;

      data.forEach((el, i) => {
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

  props: ['open'],

  mounted() {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('DOMContentLoaded', this.handleResize);
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
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('DOMContentLoaded', this.handleResize);
  },
};
</script>
