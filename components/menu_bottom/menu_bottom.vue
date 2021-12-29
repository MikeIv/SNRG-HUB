<template>
  <div class="menu_bottom">
    <div class="menu_bottom__accord a-font_m">
      © <span>{{ year }}</span> Synergy. Все права защищены
    </div>
    <div class="menu_bottom__accord a-font_m" v-if="policy.text !== ''" @click="togglePopup">
      {{ policy.text }}
    </div>
    <APopup @close="popupOptions = false" :visible="popupOptions">
      <div class="menu_bottom__popup" v-html="policy.text_full"></div>
    </APopup>

    <template v-for="navItem in navBottomLinks">
      <nuxt-link
        class="menu_bottom__accord a-font_m"
        :key="navItem.text"
        rel="noreferrer"
        :to="navItem.href"
        v-if="navItem.text !== ''"
      >
        {{ navItem.text }}
      </nuxt-link>
    </template>
  </div>
</template>

<script>
import { APopup } from '@cwespb/synergyui';
import './menu_bottom.scss';

export default {
  name: 'menu_bottom',
  props: {
    year: {
      type: Number,
    },
    policy: {
      type: Object,
    },
  },
  components: { APopup },
  data: () => ({
    navBottomLinks: [{ href: '/contacts/', text: 'Контакты' }],
    popupOptions: false,
  }),

  methods: {
    togglePopup() {
      this.popupOptions = true;
    },
  },
};
</script>
