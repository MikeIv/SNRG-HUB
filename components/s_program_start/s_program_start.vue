<template>
  <section class="s-program-start">
    <SProgramStart
      :breadcrumbs="breadcrumbs"
      :program="program"
      @get-program-click="scrollToFormBlock"
      @sign-up="scrollToFormBlock"
    />  
  </section>
</template>

<script>
import { SProgramStart } from '@cwespb/synergyui';
import './s_program_start.scss';

import getProductsDetail from '~/api/productsDetail';
import getParseDate from '~/assets/js/getParseDate';
import getDateFromDatesObj from '~/assets/js/getDateFromDatesObj';

export default {
  name: 's-program-start',

  components: {
    SProgramStart,
  },

  data() {
    return {
      baseURL: process.env.NUXT_ENV_S3BACKET,

      breadcrumbs: [
        // {
        //   label: 'Учебные заведения',
        //   href: '/',
        // },
        // {
        //   label: 'Универститеты',
        //   href: '/',
        // },
        // {
        //   label: 'Москва',
        //   href: '/',
        // },
        // {
        //   label: 'Онлайн-курсы',
        //   href: '/',
        // },
      ],
      event: {
        date: '22 июня в 15:00',
        title: 'JAVA для новичков. Программируем вендинговый автомат',
        link: '#',
      },
      program: {
        description: '',
        subtitle: '',
        title: '',
        color: '',
        social: [],
        city: '',
        document: '',
        duration: '',
        form: '',
        photo: '',
        link: '',
      },
    };
  },

  props: ['methods', 'title'],
  async fetch() {
    const expandedMethod = this.methods[0].data;
    const preData = await getProductsDetail(expandedMethod);
    const getData = preData.data;
    this.program.color = getData.color;
    this.program.title = getData.name;
    this.program.subtitle = getData.included.levels[0].name;
    this.program.description = getData.description;
    this.program.document = getData.document;
    this.program.city = getData.included.organization.included.city.name;
    this.program.form = getData.included.formats[0].name;
    this.program.photo = `${this.baseURL}${getData.digital_image}`;

    // Перевод строки в виде "4y-6m-5d" и возврат даты в нужном формате (4 года 6 месяцев 5 дней)
    this.program.duration = getDateFromDatesObj(getParseDate(getData.duration_format_value));
  },

  methods: {
    scrollToFormBlock() {
      const formBlock = document.getElementById('form');
      formBlock.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    },
  },
};
</script>
