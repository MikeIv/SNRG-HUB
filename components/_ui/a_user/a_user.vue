<template>
  <div class="a-user">
    <div class="a-user__avatar">
      <img :src="photo" class="a-user__avatar-img" alt="" />
    </div>
    <div class="a-user__info">
      <div class="a-user__name a-font_m">
        {{ name }}
      </div>
      <div class="a-user__publications a-font_s-m">{{ publicatons }} публикаций</div>
    </div>
  </div>
</template>

<script>
import './a_user.scss';

export default {
  name: 'AUser',

  props: ['name', 'photo', 'publicatons'],
};
</script>
