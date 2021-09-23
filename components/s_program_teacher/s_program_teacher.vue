<template>
  <section class="s-program-teacher">
    <h2 class="s-program-teacher__title a-font_h2" v-html="title"></h2>
    <div class="s-program-teacher__items s-program-teacher__items_horisontal" v-if="items.length < 3">
      <MCardSpeaker
        v-for="item in items"
        :key="item.id"
        :name="item.name"
        :title="item.title"
        :description="item.description"
        :image="item.image"
      />
    </div>
    <div class="s-program-teacher__items s-program-teacher__items_vertical" v-else>
      <swiper class="swiper" :options="swiperOption">
        <MCardLanding
          v-for="item in items"
          :key="item.id"
          :title="item.title"
          :text="item.text"
          :image="item.image"
          class="swiper-slide"
        />
      </swiper>
    </div>
  </section>
</template>

<script>
import { MCardSpeaker, MCardLanding } from '@cwespb/synergyui';
import './s_program_teacher.scss';

export default {
  name: 's_program_teacher',

  components: {
    MCardSpeaker,
    MCardLanding,
  },

  data() {
    return {
      swiperOption: {
        grabCursor: true,
        slidesPerView: 'auto',
        spaceBetween: 20,
        resistance: true,
        resistanceRatio: 0,
      },
      items: [
        {
          name: 'Андрей Борю',
          title: 'Основатель Академии Infostorm',
          description:
            // eslint-disable-next-line max-len
            'В разработке более 12 лет, изначально программировал на php, потом освоил Golang, java, python. Последние несколько лет активно занимается devops. Работал в центральном вьетнамском офисе Лазады — крупнейшем азиатском маркетплейсе, и в офисе финтех-проекта в Литве',
          image:
            // eslint-disable-next-line max-len
            'https://images.unsplash.com/photo-1528287942171-fbe365d1d9ac?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&w=1200&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
        },
        {
          name: 'Андрей Борю',
          title: 'Основатель Академии Infostorm',
          description:
            // eslint-disable-next-line max-len
            'В разработке более 12 лет, изначально программировал на php, потом освоил Golang, java, python. Последние несколько лет активно занимается devops. Работал в центральном вьетнамском офисе Лазады — крупнейшем азиатском маркетплейсе, и в офисе финтех-проекта в Литве',
          image:
            // eslint-disable-next-line max-len
            'https://images.unsplash.com/photo-1528287942171-fbe365d1d9ac?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&w=1200&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
        },
        {
          name: 'Андрей Борю',
          title: 'Основатель Академии Infostorm',
          description:
            // eslint-disable-next-line max-len
            'В разработке более 12 лет, изначально программировал на php, потом освоил Golang, java, python. Последние несколько лет активно занимается devops. Работал в центральном вьетнамском офисе Лазады — крупнейшем азиатском маркетплейсе, и в офисе финтех-проекта в Литве',
          image:
            // eslint-disable-next-line max-len
            'https://images.unsplash.com/photo-1528287942171-fbe365d1d9ac?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&w=1200&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
        },
        {
          name: 'Андрей Борю',
          title: 'Основатель Академии Infostorm',
          description:
            // eslint-disable-next-line max-len
            'В разработке более 12 лет, изначально программировал на php, потом освоил Golang, java, python. Последние несколько лет активно занимается devops. Работал в центральном вьетнамском офисе Лазады — крупнейшем азиатском маркетплейсе, и в офисе финтех-проекта в Литве',
          image:
            // eslint-disable-next-line max-len
            'https://images.unsplash.com/photo-1528287942171-fbe365d1d9ac?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&w=1200&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
        },
        {
          name: 'Андрей Борю',
          title: 'Основатель Академии Infostorm',
          description:
            // eslint-disable-next-line max-len
            'В разработке более 12 лет, изначально программировал на php, потом освоил Golang, java, python. Последние несколько лет активно занимается devops. Работал в центральном вьетнамском офисе Лазады — крупнейшем азиатском маркетплейсе, и в офисе финтех-проекта в Литве',
          image:
            // eslint-disable-next-line max-len
            'https://images.unsplash.com/photo-1528287942171-fbe365d1d9ac?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&w=1200&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
        },
      ],
      title: '<span>Преподаватели</span> курса',
    };
  },
};
</script>
