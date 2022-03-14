<template>
  <div class="m-card-gorizontal">
    <div class="m-card-gorizontal__info">
      <div class="m-card-gorizontal__icon">
        <img :src="iconClasses" alt="img" />
      </div>
      <div class="m-card-gorizontal__title a-font_xxl">
        {{ title }}
      </div>
      <div class="m-card-gorizontal__description">
        {{ description }}
      </div>
    </div>
  </div>
</template>

<script>
import './m_card_edu.scss';

export default {
  props: {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    iconClasses: {
      type: String,
    },
  },
};
</script>
