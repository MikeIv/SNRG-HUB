<template>
  <div class="s-program-numbers__wrapper">
    <AFactoid
      v-for="factoid in factoids"
      :key="factoid.id"
      :type="factoid.type"
      :title="factoid.title"
      :number="factoid.number"
    />
  </div>
</template>

<script>
import { AFactoid } from '@cwespb/synergyui';
import '@cwespb/synergyui/lib/synergyui.css';
import './s_program_numbers.scss';

export default {
  name: 'SProgramNumbers',

  components: {
    AFactoid,
  },

  data() {
    return {
      factoids: [
        {
          lineNumber: 'от 120 000 ₽',
          title: 'в год',
          type: 'line',
        },
        {
          lineNumber: '20',
          title: 'бюджетных мест',
          type: 'line',
        },
        {
          lineNumber: '60',
          title: 'платных мест',
          type: 'line',
        },
      ],
    };
  },
};
</script>
