<template>
  <div class="container">
    <component :is="section" v-for="section in sections" :key="section"></component>
  </div>
</template>

<script>
import { SProgramStart } from '@cwespb/synergyui';

import '@cwespb/synergyui/lib/synergyui.css';

export default {
  components: {
    SProgramStart,
  },

  middleware: 'getPageInfo',

  data() {
    return {
      event: {
        date: '22 июня в 15:00',
        title: 'День открытых дверей',
        description: 'Событие',
      },
      program: {
        subtitle: 'Профессия с трудоустройством',
        title: 'PHP-программист',
        social: [
          {
            id: 1,
            name: 'Вконтакте',
            icon: 'vk',
            link: '#vk',
          },
          {
            id: 2,
            name: 'Twitter',
            icon: 'twitter',
            link: '#twitter',
          },
          {
            id: 3,
            name: 'Instagram',
            icon: 'instagram',
            link: '#insta',
          },
          {
            id: 4,
            name: 'Facebook',
            icon: 'facebook',
            link: '#facebook',
          },
        ],
        description:
          'Язык PHP отличается практичностью и дает возможность быстро решать задачи, поэтому множество сайтов написаны именно на нем. Язык PHP отличается практичностью и дает возможность быстро решать задачи, поэтому множество сайтов написаны именно на нем.',
        city: 'Москва',
        language: 'Русский',
        duration: '4 года',
        form: 'Очно, заочно',
        photo:
          'https://s3-alpha-sig.figma.com/img/fe50/fd2e/03ae8fbb1c3b5ed4e9ddbdc2c0d23b60?Expires=1631491200&Signature=EtKWoxKnItI9MG8ZzbIdoSxC3-rwfRJiL5D3fAVy1JaZ5VLen45LbjwWy2d7i~BQJXe6jqNU39GVghl3ovfF8Guj~WT3FJE~Lf-IhXXspBN8BEoulmjgzTCdJ1LISqEXhjjzhZg7UelTuRO~oKniBCozUp7INYNQQeoGrj6XCwvBr4-yjkPUAi68cNm9YPnCWLkSckREHa6OSNCvJp1E-1TAzjVVHmQ0q1snp78B-l9bLvLilVGC8yIatywPf7AZVhrzhiz87roY9yeqxL8vLBShUiz2KuYGcmw5HG3IZ~9ffsUOiO0WKiYlN8Phc0~YekMrNvyE3gxK5dGTujBCZg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
        link: '#link',
        sale: {
          text: 'Скидка 40% на обучение до 10 февраля',
        },
      },
    };
  },

  asyncData() {
    // Массив имен для component :is будет формироваться от бэка
    // На данный момент там имена неправильные, поэтому хардкод
    // А так мы их будем брать из pageInfo.components и у объекта ключ "key"
    const sections = [
      's-program-content',
      's-program-teacher-horizontal',
      's-program-teacher-vertical',
    ];

    return {
      sections,
    };
  },

  computed: {
    pageInfo() {
      return this.$store.state.pageInfo;
    },
  },
};
</script>
