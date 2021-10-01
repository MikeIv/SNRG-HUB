<template>
  <section class="s-university-start">
    <SUniversityStart :breadcrumbs="breadcrumbs" :university="university" :logoSrc="logoSrc" />
  </section>
</template>

<script>
import { SUniversityStart } from '@cwespb/synergyui';
import './s_university_start.scss';
import getOrganizationsDetail from '~/api/organizationsDetail';

export default {
  name: 's_university_start',

  components: {
    SUniversityStart,
  },

  data() {
    return {
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
          label: 'МОИ',
          href: '/',
        },
      ],
      logoSrc: '',
      event: {
        date: '',
        title: '',
        description: '',
        link: '#',
      },
      university: {
        city: '',
        name: '',
        description: '',
        type: '',
        hostel: '',
        social: [],
        link: '#',
        photo: '',
      },
    };
  },
  props: ['methods', 'title'],
  async fetch() {
    const expandedMethod = this.methods[0].data;
    expandedMethod.include = ['persons', 'city'];
    const preData = await getOrganizationsDetail(expandedMethod);
    this.university.city = preData.data.included.city.name;
    this.university.name = preData.data.name;
    this.university.description = preData.data.description;
    this.university.type = preData.data.type_text;
    this.university.hostel = 'есть';
    this.university.photo = this.baseURL + preData.data.digital_image;
    this.logoSrc = this.baseURL + preData.data.logo;
  },
};
</script>
