<template>
  <section class="s-program-skills">
    <h2 class="s-program-skills__title a-font_h2" v-html="title"></h2>
    <div class="s-program-skills__items">
      <AListElement v-for="(item, index) in programSkillsList" :key="index" :type="item.type" :label="item.value" />
    </div>
  </section>
</template>

<script>
import { AListElement } from '@cwespb/synergyui';
import './s_program_skills.scss';

export default {
  name: 's_program_skills',

  components: {
    AListElement,
  },

  data() {
    return {
      programSkillsList: [
        {
          type: 'icon',
          value: 'Преподаватели ведущих школ и вузов',
        },
        {
          type: 'icon',
          value: 'Оптимальная нагрузка',
        },
        {
          type: 'icon',
          value: 'Дешевле, чем занятия с репетитором',
        },
        {
          type: 'icon',
          value: 'Удобные форматы обучения',
        },
        {
          type: 'icon',
          value: 'Проверка знаний на 3 тестированиях',
        },
        {
          type: 'icon',
          value: 'Сертификат по окончании',
        },
      ],
      title: 'Что вы получите',
    };
  },

  props: ['methods'],
};
</script>
