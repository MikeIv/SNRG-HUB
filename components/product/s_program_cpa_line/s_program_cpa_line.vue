<template>
  <section class="s-program-cpaLine" v-if="sectionData">
    <div class="l-wide l-border-radius">
      <div class="s-program-cpaLine__wrap">
        <span class="s-program-cpaLine__text a-font_xl">{{ sectionData.text }}</span>
        <a-button
          :label="sectionData.label"
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
import productSectionInfo from '~/api/productSectionInfo';

export default {
  name: 'SProgramCpaLine',

  components: {
    AButton,
  },

  props: ['slug'],

  data() {
    return {
      sectionData: null,
    };
  },

  async fetch() {
    const requestData = { slug: this.slug || this.$route.params.slug, key: 's-program-cpa-line' };
    this.sectionData = await productSectionInfo(requestData);
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
