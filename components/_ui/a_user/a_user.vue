<template>
  <div :class="classes">
    <div :class="avatarClasses" @click.stop="avatarClickHandler">
      <img v-if="user.img" :src="user.img" class="a-user__avatar-img" alt="icon" />
      <img v-else src="/school/avatar.svg" class="a-user__avatar-img" alt="icon" />
    </div>
    <div class="a-user__info">
      <div class="a-user__name a-font_m">
        {{ user.name }}
      </div>
      <div v-if="user.published" class="a-user__publications a-font_s-m">
        {{ user.published }} {{ publicationString }}
      </div>
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
    publicationString: {
      type: String,
    },
    namePosition: {
      type: String,
    },
    imageShape: {
      type: String,
    },
  },
  computed: {
    classes() {
      return {
        'a-user': true,
        [`a-user--${this.namePosition}`]: this.namePosition,
      };
    },
    avatarClasses() {
      return {
        'a-user__avatar': true,
        [`a-user__avatar--${this.imageShape}`]: this.imageShape,
      };
    },
  },
  methods: {
    avatarClickHandler() {
      this.$emit('avatar-click');
    },
  },
};
</script>
