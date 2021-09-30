<template>
  <SProgramCpaLine :sale="sale" @get-discount-click="scrollToFormBlock" />
</template>

<script>
import { SProgramCpaLine } from '@cwespb/synergyui';
import './s_program_cpa_line.scss';

export default {
  name: 's_program_cpa_line',

  components: {
    SProgramCpaLine,
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
      formBlock.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    },
  },
};
</script>
