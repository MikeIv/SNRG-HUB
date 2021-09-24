<template>
  <section class="s-program-start">
    <SProgramStart
      :breadcrumbs="breadcrumbs"
      :program="program"
      :event="event"
      :description="program.description"
      :city="program.city"
      :language="program.language"
      :duration="program.duration"
      :form="program.form"
      :photo="program.photo"
      :link="program.link"
      :color="program.color"
    />
  </section>
</template>

<script>
import { SProgramStart } from '@cwespb/synergyui';
import './s_program_start.scss';

export default {
  name: 's_program_start',

  components: {
    SProgramStart,
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
          label: 'Онлайн-курсы',
          href: '/',
        },
      ],
      event: {
        date: '22 июня в 15:00',
        title: 'JAVA для новичков. Программируем вендинговый автомат',
        description: 'Вебинар',
        link: '#',
      },
      program: {
        subtitle: 'Профессия с трудоустройством',
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
        description:
          // eslint-disable-next-line max-len
          'Язык PHP отличается практичностью и дает возможность быстро решать задачи, поэтому множество сайтов написаны именно на нем. Язык PHP отличается практичностью и дает возможность быстро решать задачи, поэтому множество сайтов написаны именно на нем.',
        city: 'Москва',
        language: 'Русский',
        duration: '4 года',
        form: 'Очно, заочно',
        photo: 'https://fainaidea.com/wp-content/uploads/2015/02/agh1.jpg',
        link: '#link',
      },
    };
  },
};
</script>
