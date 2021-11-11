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
      const formBlock = document.getElementById('form-price');
      const headerHeight = document.querySelector('.s-header');

      const position = formBlock.offsetTop - headerHeight.offsetHeight;

      if (formBlock) {
        window.scrollTo({
          top: position,
          behavior: 'smooth',
        });
      }
    },
    getDiscountClickHandler() {
      this.$emit('get-discount-click');
    },
  },
};
</script>
