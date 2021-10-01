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

export default {
  name: 's-program-start',

  components: {
    SProgramStart,
  },

  data() {
    return {
      productsDetail: [],

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
        // description: 'Вебинар',
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
    let [expandedMethod] = this.methods;
    expandedMethod = { ...expandedMethod.data };
    expandedMethod.include = ['organization', 'formats', 'levels', 'directions', 'organization.city'];
    const preData = await getProductsDetail(expandedMethod);
    this.productsDetail = preData.data;
    const obj = this.program;
    const {
      description, color, name, digital_image, document, duration_format_value, included,
    } = this.productsDetail;
    // TODO: дописать парсинг duration_format_value на год\месяцы и склонения добавить
    const duration_value = duration_format_value.charAt(1) === 'm'
      ? `${duration_format_value.charAt(0)} месяца`
      : `${duration_format_value.charAt(0)} года`;
    obj.color = color;
    obj.title = name;
    obj.subtitle = included.levels[0].name;
    obj.description = description;
    obj.document = document;
    obj.city = included.organization.included.city.name;
    obj.form = included.formats[0].name;
    obj.duration = duration_value;
    obj.photo = this.baseURL + digital_image;
  },

  methods: {
    scrollToFormBlock() {
      const formBlock = document.getElementById('form');
      formBlock.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    },
  },
};
</script>
