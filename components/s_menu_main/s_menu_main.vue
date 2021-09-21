<template>
  <section class="s-menu-main">
    <div class="l-default">
      <div class="s-menu-main__box">
        <div class="s-menu-main__items">
          <template v-for="(item, index) in menuAnchors" :index="index">
            <div class="s-menu-main__item" @mouseover="getActive(index)" @click="getActiveMenu" :key="item.id">
              <a-sidebar-item :class="{ active: item.isActive }" :label="item.anchor" href="" />
            </div>
          </template>
        </div>
        <div class="s-menu-main__content" :class="{ open: menuIsOpen }">
          <template v-for="item in menuLinks">
            <div class="s-menu-main__links" :key="item" v-if="item.isActive">
              <div class="s-menu-main__links-top" @click="getActiveMenu">
                <div class="s-menu-main__links-icon si-chevron-left"></div>
                <div class="s-menu-main__links-title a-font_h4">
                  {{ item.title }}
                </div>
              </div>
              <div class="s-menu-main__links-item" v-for="linkItem in item.items" :key="linkItem.id">
                <nuxt-link to="" class="s-menu-main__link">
                  <div class="s-menu-main__link-top" @click="openMenuItem($event)">
                    <div class="s-menu-main__link-title a-font_xxl">
                      {{ linkItem.anchor }}
                    </div>
                    <div class="s-menu-main__link-icon si-chevron-down"></div>
                  </div>
                </nuxt-link>
                <div class="s-menu-main__link-list">
                  <div v-for="(product, index) in linkItem.products" :index="index" :key="product.id">
                    <nuxt-link v-if="index < 5" :to="product.link" class="s-menu-main__link-product">
                      <div class="s-menu-main__link-text a-font_m">{{ product.anchor }}</div>
                    </nuxt-link>
                  </div>
                  <nuxt-link to="/" class="s-menu-main__link-more">
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
  </section>
</template>

<script>
import { ASidebarItem, MBanner } from '@cwespb/synergyui';
import getMenuMain from '~/api/menuMain';
import '@cwespb/synergyui/lib/synergyui.css';
import './s_menu_main.scss';

export default {
  name: 'SMenuMain',

  props: {},

  data() {
    return {
      menu: [],
      menuAnchors: [],
      menuLinks: [],
      isActive: false,
      windowWidth: 0,
      isOpen: false,
      menuIsOpen: false,
    };
  },

  async fetch() {
    this.menu = await getMenuMain().then((data) => {
      this.menuAnchors = data;

      data.forEach((el) => {
        const item = {
          title: el.anchor,
          items: el.sub_items,
          isActive: false,
        };
        this.menuLinks.push(item);
      });
    });
  },

  mounted() {
    this.getActive(0);

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

  components: {
    ASidebarItem,
    MBanner,
  },
};
</script>
