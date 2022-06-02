<template>
  <section class="s-program-cpaLine">
    <div class="l-wide l-border-radius">
      <div class="s-program-cpaLine__wrap">
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
    </div>
  </section>
</template>

<script>
import { AButton } from '@cwespb/synergyui';
import './s_program_cpa_line.scss';
import getProductSectionInfo from '~/api/productSectionInfo';

export default {
  name: 'SProgramCpaLine',

  components: {
    AButton,
  },

  data() {
    return {
      sectionData: null,
      sale: {
        text: 'Скидка 40% на обучение до 10 февраля',
      },
    };
  },

  async fetch() {
    const requestData = { slug: this.$route.params.slug, key: 's-program-cpa-line' };
    this.sectionData = await getProductSectionInfo(requestData);
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
