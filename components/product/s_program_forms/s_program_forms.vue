<template>
  <section class="s-program-forms">
    <s-program-price v-if="product && product.offers" :product="product" />
    <s-program-form v-else :formProduct="product" />
  </section>
</template>

<script>
import SProgramForm from '~/components/s_program_form/s_program_form';
import SProgramPrice from '~/components/product/s_program_price/s_program_price';
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
