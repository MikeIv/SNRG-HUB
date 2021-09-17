<template>
  <section class="s-program-info">
    <div class="s-program-info__wrap">
      <div class="s-program-info__items">
        <AFactoid
          v-for="item in items"
          :key="item.id"
          :type="item.type"
          :title="item.title"
          :lineNumber="item.lineNumber"
        />
      </div>
      <div class="s-program-info__arrow">
        <svg viewBox="0 0 259 482" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M259 482L240.794 353.75L180.22 297.382L119.645 241.014L240.794 128.28L259 0L0 240.987L259 482Z" fill="#FF0040"></path>
        </svg>
      </div>
    </div>
  </section>
</template>

<script>
import { AFactoid } from '@cwespb/synergyui';
import './s_program_info.scss';

export default {
  name: 'SProgramInfo',

  components: {
    AFactoid,
  },

  data() {
    return {
      items: [
        {
          id: 1,
          lineNumber: 'от 120 000 ₽',
          title: 'в год',
          type: 'line',
        },
        {
          id: 2,
          lineNumber: '20',
          title: 'бюджетных мест',
          type: 'line',
        },
        {
          id: 3,
          lineNumber: '60',
          title: 'платных мест',
          type: 'line',
        },
      ],
    };
  },
};
</script>
