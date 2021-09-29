<template>
  <section class="s-program-start">
    <SProgramStart
      :breadcrumbs="breadcrumbs"
      :program="program"
      :description="program.description"
      :city="program.city"
      :document="program.document"
      :duration="program.duration"
      :form="program.form"
      :photo="`${baseURL}/${program.photo}`"
      :color="program.color"
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
        title: 'PHP-программист',
        color: '#e6e4f1',
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
        city: '',
        document: '',
        duration: '4 года',
        form: '',
        photo: 'https://fainaidea.com/wp-content/uploads/2015/02/agh1.jpg',
        link: '#link',
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
    const { description, color, name, digital_image, document, begin_duration_format_value, included } =
      this.productsDetail;
    const duration_value =
      begin_duration_format_value.charAt(1) === 'm'
        ? `${begin_duration_format_value.charAt(0)} месяца`
        : `${begin_duration_format_value.charAt(0)} года`;
    obj.color = color;
    obj.title = name;
    obj.subtitle = included.levels[0].name;
    obj.description = description;
    obj.document = document;
    obj.city = included.organization.included.city.name;
    obj.form = included.formats[0].name;
    obj.duration = duration_value;
    obj.photo = digital_image;

  methods: {
    scrollToFormBlock() {
      const formBlock = document.getElementById('form');
      formBlock.scrollIntoView({ behavior: 'smooth' });
    },
  },
};
</script>
