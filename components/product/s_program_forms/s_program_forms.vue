<template>
  <section class="s-program-forms">
    <s-program-price v-show="product && product.offers" />
    <s-program-form v-show="!(product && product.offers)" :formProduct="product" />
  </section>
</template>

<script>
import SProgramForm from '~/components/s_program_form/s_program_form';
import SProgramPrice from '~/components/product/s_program_price_old/s_program_price_old';
import './s_program_forms.scss';

export default {
  name: 'SProgramForms',
  props: ['program'],

  computed: {
    product() {
      return this.program;
    },
  },

  components: {
    SProgramForm,
    SProgramPrice,
  },
};
</script>
