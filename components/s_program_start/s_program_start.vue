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
      productsDetail: [],
      date: '',
      parseDate: {},
      dateFromDatesObj: '',
      declOfNumber: '',

      baseURL: process.env.NUXT_ENV_S3BACKET,

      breadcrumbs: [
        {
          label: 'Учебные заведения',
          href: '/',
        },
        {
          label: 'Универститеты',
          href: '/',
        },
        {
          label: 'Москва',
          href: '/',
        },
        {
          label: 'Онлайн-курсы',
          href: '/',
        },
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
    console.log(preData);
    this.productsDetail = preData.data;
    this.program.color = this.productsDetail.color;
    this.program.title = this.productsDetail.name;
    this.program.subtitle = this.productsDetail.included.levels[0].name;
    this.program.description = this.productsDetail.description;
    this.program.document = this.productsDetail.document;
    this.program.city = this.productsDetail.included.organization.included.city.name;
    this.program.form = this.productsDetail.included.formats[0].name;
    this.program.photo = `${this.baseURL}${this.productsDetail.digital_image}`;

    this.program.duration = getDateFromDatesObj(getParseDate(this.productsDetail.duration_format_value));
    // Перевод строки в виде "4y-6m-5d" и возврат даты в нужном формате (4 года 6 месяцев 5 дней)
  },

  methods: {
    scrollToFormBlock() {
      const formBlock = document.getElementById('form');
      formBlock.scrollIntoView({ behavior: 'smooth' });
    },
  },
};
</script>
