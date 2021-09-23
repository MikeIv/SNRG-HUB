<template>
  <section class="s-program-university">
    <div class="s-program-university__top">
      <h2 class="s-program-university__title a-font_h2" v-html="title"></h2>
      <p class="s-program-university__introtext a-font_xxl" v-html="introtext"></p>
      <p class="s-program-university__description" v-html="description"></p>
      <span class="s-program-university__img" v-if="image">
        <img :src="image" alt="" />
      </span>
    </div>

    <swiper :options="swiperOption">
      <div class="swiper-slide s-program-university__factoids">
        <div class="s-program-university__factoids-left">
          <div class="s-program-university__factoids-row">
            <AFactoid
              v-for="factoid in factoids.slice(0, 3)"
              :key="factoid.id"
              :type="factoid.type"
              :title="factoid.title"
              :number="factoid.number"
              :color="factoid.color"
            />
          </div>
          <div class="s-program-university__factoids-row">
            <AFactoid
              v-for="factoid in factoids.slice(3, 5)"
              :key="factoid.id"
              :type="factoid.type"
              :title="factoid.title"
              :number="factoid.number"
              :color="factoid.color"
            />
          </div>
        </div>
        <div class="s-program-university__factoids-right">
          <AFactoid
            v-for="factoid in factoids.slice(5, 6)"
            :key="factoid.id"
            :type="factoid.type"
            :title="factoid.title"
            :number="factoid.number"
            :color="factoid.color"
          />
        </div>
      </div>
    </swiper>
  </section>
</template>

<script>
import { Swiper } from 'vue-awesome-swiper';
import { AFactoid } from '@cwespb/synergyui';
import './s_program_university.scss';

export default {
  name: 's_program_university',

  components: {
    Swiper,
    AFactoid,
  },

  data() {
    return {
      swiperOption: {
        observer: true,
        observeParents: true,
        freeMode: true,
        slidesPerView: 'auto',
        spaceBetween: 0,
        breakpoints: {
          768: {
            grabCursor: true,
          },
        },
      },

      title: 'Университет <span>«Синергия»</span>',
      introtext: 'Флагманский проект образовательной корпорации, который является одним из ведущих российских вузов',
      description:
        'С 1988 года он осуществляет профессиональную подготовку студентов по более 200 программам колледжа, высшего, второго высшего и дополнительного образования. На базе университета существует первая в России школа бизнеса, которая обладает 7 престижными международными аккредитациями AMBA',
      image:
        'https://images.unsplash.com/photo-1528287942171-fbe365d1d9ac?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&w=1200&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
      factoids: [
        {
          number: '140',
          title: 'филиалов в России <br>и за рубежом',
          color: 'color_link',
          type: 'number',
        },
        {
          number: '7',
          title: 'престижных <br>аккредитаций АМВА',
          color: 'color_link',
          type: 'number',
        },
        {
          number: '120 000',
          title: 'студентов в России <br>и за рубежом',
          color: 'color_link',
          type: 'number',
        },
        {
          number: '200 000 +',
          title: 'выпускников, успешно окончивших <br>образовательные программы',
          color: 'color_link',
          type: 'number',
        },
        {
          number: '1',
          title: 'место в рейтинге образовательных <br>программ управления АЦ «Эксперт»',
          color: 'color_link',
          type: 'number',
        },
        {
          number: 'Государственный диплом',
          title: 'о высшем образованиии общеевропейское <br>приложение на английском языке',
          color: 'color_link',
          type: 'number',
        },
      ],
    };
  },
};
</script>
