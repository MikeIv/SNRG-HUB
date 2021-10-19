<template>
  <div class="s-program-cpaLine">
    <span class="s-program-cpaLine__text a-font_xl">{{ sale.text }}</span>
    <a-button
      label="Получить скидку"
      bg-color="custom"
      backgroundColor="#fff"
      @click="
        scrollToFormBlock();
        getDiscountClickHandler();
      "
    />
  </div>
</template>

<script>
import { AButton } from '@cwespb/synergyui';
import './s_program_cpa_line.scss';

export default {
  name: 's_program_cpa_line',

  components: {
    AButton,
  },

  data() {
    return {
      sale: {
        text: 'Скидка 40% на обучение до 10 февраля',
      },
    };
  },

  methods: {
    scrollToFormBlock() {
      const formBlock = document.getElementById('form');
      if (formBlock) {
        formBlock.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
      }
    },
    getDiscountClickHandler() {
      this.$emit('get-discount-click');
    },
  },
};
</script>
