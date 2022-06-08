<template>
  <section class="s-program-forms">
    <s-program-price v-show="getProgram && getProgram.offers" :product="getProgram" />
    <s-program-form v-show="!(getProgram && getProgram.offers)" formProduct="getProgram" />
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
    getProgram() {
      return this.program;
    },
  },

  components: {
    SProgramForm,
    SProgramPrice,
  },
};
</script>
