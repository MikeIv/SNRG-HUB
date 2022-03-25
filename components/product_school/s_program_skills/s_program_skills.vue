<template>
  <section class="s-program-skills s-padding">
    <div class="l-wide">
      <h2 class="s-program-skills__title a-font_h2" v-html="title"></h2>
      <div class="s-program-skills__items">
        <AListElement v-for="(item, index) in programSkillsList" :key="index" :type="item.type" :label="item.value" />
      </div>
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
          value: 'Онлайн-образование 5-11 классов, по программам, соответствующим ФГОС',
        },
        {
          type: 'icon',
          value: 'Выдача аттестатов государственного образца',
        },
        {
          type: 'icon',
          value: 'Полный цикл подготовки к экзаменам ОГЭ/ЕГЭ',
        },
        {
          type: 'icon',
          value: 'Поступление в любое время года',
        },
        {
          type: 'icon',
          value: 'Авторские программы обучения',
        },
        {
          type: 'icon',
          value: 'Современная многофункциональная образовательная платформа',
        },
      ],
      title: 'Что вы получите',
    };
  },

  props: ['methods'],
};
</script>
