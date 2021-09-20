<template>
  <section class="s-menu-main">
    <div class="l-default">
      <div class="s-menu-main__box">
        <div class="s-menu-main__items">
          <template v-for="item in menuAnchors">
            <a-sidebar-item :key="item.id" :label="item.anchor" :href="item.link" />
          </template>
        </div>
        <div class="s-menu-main__content">
            <template v-for="item in menuLinks">
              <div class="s-menu-main__links" :key="item">
                <div class="s-menu-main__links-title a-font_h4">
                  {{ item.title }}
                </div>
                <div class="s-menu-main__links-item" v-for="linkItem in item.items" :key="linkItem.id">
                  <nuxt-link :to="linkItem.link" class="s-menu-main__link">
                    <div class="s-menu-main__link-title a-font-xxl">
                      {{ linkItem.anchor }}
                    </div>
                    <object v-for="product in linkItem.products" :key="product">
                      <nuxt-link :to="product.link" class="s-menu-main__link-product a-font_M">
                        {{ product.anchor }}
                      </nuxt-link>
                    </object>
                  </nuxt-link>
                </div>
              </div>
            </template>
        </div>
        <m-banner type="side" titleTxt="Разработка VR/AR" secondTxt="Станьте редким востребованным специалистом" ImgBgSrc="https://placeimg.com/250/350/people"></m-banner>
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
    };
  },

  async fetch() {
    this.menu = await getMenuMain().then((data) => {
      this.menuAnchors = data;
      
      data.forEach(el => {
        let item = {
          title: el.anchor,
          items: el.sub_items
        }
        this.menuLinks.push(item);
      });
    });
  },

  components: {
    ASidebarItem,
    MBanner
  },
};
</script>
