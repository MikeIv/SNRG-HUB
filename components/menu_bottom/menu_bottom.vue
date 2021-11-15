<template>
  <div class="menu_bottom">
    <div class="menu_bottom__accord a-font_m">
      © <span>{{ year }}</span> Synergy. Все права защищены
    </div>
    <a
      target="_blank"
      class="menu_bottom__accord a-font_m"
      rel="noreferrer"
      :href="policy.href"
      v-if="policy.text !== ''"
    >
      {{ policy.text }}
    </a>
    <template v-for="navItem in navBottomLinks">
      <nuxt-link
        class="menu_bottom__accord a-font_m"
        :key="navItem.text"
        target="_blank"
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
  data: () => ({
    navBottomLinks: [{ href: 'https://synergyeducation.ru/contacts/', text: 'Контакты' }],
  }),
};
</script>
