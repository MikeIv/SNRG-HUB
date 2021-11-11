<template>
  <div class="s-program-course">
    <h2 class="s-program-course__title a-font_h2">Как проходит курс?</h2>
    <div class="s-program-course__top">
      <AFactoid
        type="number"
        v-for="(factoid, id) in factoids"
        :key="id"
        :number="factoid.number"
        :title="factoid.title"
        color="color_link"
      />
    </div>
    <div class="s-program-course__list">
      <AListElement v-for="(list_item, id) in list" :key="id" :label="list_item" type="dotted" />
    </div>
    <div class="s-program-course__text a-font_xl">
      ЕГЭ меняется, а мы отслеживаем изменения кодификаторов ФИПИ и регулярно обновляем курс! Учим выявлять суть задания
      и применять самые эффективные алгоритмы решения.
    </div>
  </div>
</template>

<script>
import './s_program_course.scss';
import { AFactoid, AListElement } from '@cwespb/synergyui';

export default {
  name: 's-program-course',

  components: {
    AFactoid,
    AListElement,
  },

  data() {
    return {
      factoids: [
        {
          number: '30-60',
          title: 'Онлайн-занятий',
        },
        {
          number: '1-2',
          title: 'Раза в неделю',
        },
        {
          number: '2',
          title: 'Часа в формате онлайн-урока',
        },
      ],
      list: [
        'Разбираем тему с учителем на уроке',
        '24/7 доступ к записям уроков и необходимым материалам',
        'После каждого модуля — проверочная работа',
        'Пробные экзамены с использованием банка заданий от ФИПИ',
      ],
    };
  },
};
</script>
