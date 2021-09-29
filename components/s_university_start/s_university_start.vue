<template>
  <section class="s-university-start">
    <SUniversityStart :breadcrumbs="breadcrumbs" :event="event" :university="university" :logoSrc="logoSrc" />
  </section>
</template>

<script>
import { SUniversityStart } from '@cwespb/synergyui';
import './s_university_start.scss';

export default {
  name: 's_university_start',

  components: {
    SUniversityStart,
  },

  data() {
    return {
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
      logoSrc: 'https://sys3.ru/marketplace/uploads/organizations/yuIYPVAzTpYhkDo2acWAZAMLpIh4LiRGttzzlyFs.svg',
      event: {
        date: '22 июня в 15:00',
        title: 'День открытых дверей',
        description: 'Событие',
        link: '#',
      },
      university: {
        city: 'Москва',
        name: 'Московский открытый институт',
        description:
          // eslint-disable-next-line max-len
          'По итогам 2012 года он вошел в десятку лучших негосударственных высших учебных заведений Москвы. Институт имеет бессрочную лицензию на осуществление образовательной деятельности.',
        type: 'Негосударственный',
        hostel: true,
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
        link: '#',
        photo: 'https://fainaidea.com/wp-content/uploads/2015/02/agh1.jpg',
      },
    };
  },
};
</script>
