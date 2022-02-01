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
  },
};
</script>
