<template>
  <section class="s-program-reviews">
    <h2 class="s-program-reviews__title a-font_h2" v-html="title"></h2>
    <div class="s-program-reviews__swiper">
      <swiper :options="swiperOptionA">
        <swiper-slide v-for="(review, idx) in reviewsList" :key="idx" class="s-program-reviews__slide m-card-landing">
          <!-- API не отдает дату отзыва. Поля физически нет, когда появится передать в subhead-->
          <MCardLanding
            :subhead="review.subhead"
            :userName="review.name"
            :userImage="review.img"
            :text="review.description"
          />
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { MCardLanding } from '@cwespb/synergyui';
import './s_program_reviews.scss';

export default {
  name: 's_program_reviews',

  components: {
    MCardLanding,
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      title: 'Отзывы учеников и родителей',
      reviewsList: [
        {
          subhead: '14 сентября',
          img: '/school/avatar.svg',
          name: 'Диана',
          description:
            // eslint-disable-next-line max-len
            'В школе учиться очень понравилось! Любимые уроки – русский язык и литература. Круто было обсуждать произведения на вебинарах, рассказывать о любимых книгах. Еще можно было поделиться своими увлечениями. И оказалось, что есть одноклассники, которые, как и я, любят играть в шахматы. Потом мы вместе играли онлайн. Хотелось бы, чтобы для учеников проводили больше конкурсов или олимпиад.',
        },
        {
          subhead: '14 сентября',
          img: '/school/avatar.svg',
          name: 'Камалетдинова Н.З.',
          description:
            // eslint-disable-next-line max-len
            'Хочу выразить благодарность преподавателям школы Синергия! Обучаясь в этой онлайн- школе у меня появился интерес к обучению в целом, я перестал стесняться отвечать на вопросы, задавать сам вопросы, если что- то было не понятно, или же наоборот вызывало интерес к теме.  Материал подобран грамотно, информация подается интересно, не скучно. Есть возможность пересматривать вебинары. Я всегда с нетерпением ждал следующих занятий. Спасибо огромное за вашу работу.',
        },
        {
          subhead: '14 сентября',
          img: '/school/avatar.svg',
          name: 'Тетяйкина Е. А.',
          description:
            // eslint-disable-next-line max-len
            'Очень понравилось учиться в онлайн- школе Синергия, особенно запомнились уроки по химии, где было много ярких запоминающихся видео с опытами, а также занятия по английскому языку, на которых мы практически не говорили на русском языке!!! Это было сложно, но интересно.',
        },
        {
          subhead: '14 сентября',
          img: '/school/avatar.svg',
          name: 'Модебадзе',
          description:
            // eslint-disable-next-line max-len
            'Отдельное спасибо хочу сказать школе Синергии за чёткую и понятную организацию учебного процесса без лишних ненужных деталей и без навязывания ненужной информации. Все организационные моменты решаются всегда быстро и очень вежливо, процесс полностью повёрнут лицом к ученику. Хотела бы продолжить обучение в этой школе.',
        },
      ],
      baseUrl: process.env.NUXT_ENV_S3BACKET,
      swiperOptionA: {
        grabCursor: true,
        slidesPerView: 'auto',
        spaceBetween: 24,
        resistance: true,
        resistanceRatio: 0,
        breakpoints: {
          360: {
            spaceBetween: 16,
          },
          768: {
            spaceBetween: 20,
          },
        },
      },
    };
  },
};
</script>
