<template>
  <div class="a-user">
    <div class="a-user__avatar">
      <img v-if="user.img" :src="user.img" class="a-user__avatar-img" alt="" />
      <img else="user.img" src="/school/avatar.svg" class="a-user__avatar-img" alt="" />
    </div>
    <div class="a-user__info">
      <div class="a-user__name a-font_m">
        {{ user.name }}
      </div>
      <div class="a-user__publications a-font_s-m">{{ user.published }} {{ publicashionString }}</div>
    </div>
  </div>
</template>

<script>
import './a_user.scss';

export default {
  name: 'AUser',

  props: {
    user: {
      type: Object,
    },
  },

  data() {
    return {
      publicashionString: '',
    };
  },

  mounted() {
    this.publications();
  },

  methods: {
    publications() {
      switch (true) {
        case this.user.published > 1 && this.user.published < 5:
          this.publicashionString = 'публикации';
          break;
        case this.user.published > 5:
          this.publicashionString = 'публикаций';
          break;
        default:
          this.publicashionString = 'публикация';
          break;
      }
    },
  },
};
</script>
