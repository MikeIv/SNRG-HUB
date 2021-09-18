<template>
  <div class="s-program-cpa-line">
    <div class="l-default">
      <SProgramCpaLine :sale="sale" />
    </div>
  </div>
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
};
</script>
