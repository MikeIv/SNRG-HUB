<template>
  <div class="s-lp-people--single">
    <div class="s-lp-people--single__wrapper">
      <h2 class="s-lp-people--single__title a-font_h2" v-html="title"></h2>
      <div class="s-lp-people--single__items">
        <MCardSpeaker
          v-for="item in items"
          :key="item.id"
          :name="item.name"
          :title="item.title"
          :description="item.description"
          :image="item.image"
          />
      </div>
    </div>
  </div>
</template>

<script>
import { MCardSpeaker } from '@cwespb/synergyui';
import './s_program_teacher_horizontal.scss';

export default {
  name: 'SProgramTeacherHorizontal',

  components: {
    MCardSpeaker,
  },

  data() {
    return {
      items: [
        {
          name: 'Андрей Борю',
          title: 'Основатель Академии Infostorm',
          description:
          'В разработке более 12 лет, изначально программировал на php, потом освоил Golang, java, python. Последние несколько лет активно занимается devops. Работал в центральном вьетнамском офисе Лазады — крупнейшем азиатском маркетплейсе, и в офисе финтех-проекта в Литве',
          image:
          'https://images.unsplash.com/photo-1528287942171-fbe365d1d9ac?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&w=1200&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
        },
        {
          name: 'Андрей Борю',
          title: 'Основатель Академии Infostorm',
          description:
          'В разработке более 12 лет, изначально программировал на php, потом освоил Golang, java, python. Последние несколько лет активно занимается devops. Работал в центральном вьетнамском офисе Лазады — крупнейшем азиатском маркетплейсе, и в офисе финтех-проекта в Литве',
          image:
          'https://images.unsplash.com/photo-1528287942171-fbe365d1d9ac?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&w=1200&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
        },
      ],
      title: '<span>Преподаватель</span> курса',
    };
  },
};
</script>
