<template>
  <section class="s-about">
    <div class="l-wide">
      <div class="s-about__box">
        <div class="s-about__wrapper">
          <div class="s-about__info">
            <div class="s-about__title">{{ title }}</div>
            <div class="s-about__tabs">
              <div
                class="s-about__tabs-item"
                v-for="(tab, index) in tabs"
                :key="index"
                :class="{ 'is-active': show == index }"
                @click.prevent="show = index"
              >
                {{ tab.label }}
              </div>
            </div>
          </div>
          <div class="s-about__content">
            <div
              v-for="(tab, index) in tabs"
              :key="index"
              class="s-about__tabs-item__content"
              :class="{ 'is-active': show == index }"
            >
              <div class="s-about__tabs__swiper">
                <swiper ref="awesomeSwiperTabsContent" :options="swiperOptionTabsContent">
                  <swiper-slide v-for="(item, index) in tab.items_1" :key="index" class="s-about__tabs-content__slide">
                    <div class="s-about__tabs-content__top">
                      <div class="s-about__tabs-content__img"><img :src="item.image" alt="" /></div>
                      <div class="s-about__tabs-content__info">
                        <div class="s-about__tabs-content__info-title">{{ item.name }}</div>
                        <div class="s-about__tabs-content__info-subtitle">{{ item.student }}</div>
                      </div>
                    </div>
                    <div class="s-about__tabs-content__text">
                      {{ item.text }}
                    </div>
                    <div class="s-about__tabs-content__stars">
                      {{ item.stars }}
                    </div>
                  </swiper-slide>
                </swiper>
                <swiper ref="awesomeSwiperTabsContent2" :options="swiperOptionTabsContent2">
                  <swiper-slide v-for="(item, index) in tab.items_2" :key="index" class="s-about__tabs-content__slide">
                    <div class="s-about__tabs-content__top">
                      <div class="s-about__tabs-content__img"><img :src="item.image" alt="" /></div>
                      <div class="s-about__tabs-content__info">
                        <div class="s-about__tabs-content__info-title">{{ item.name }}</div>
                        <div class="s-about__tabs-content__info-subtitle">{{ item.student }}</div>
                      </div>
                    </div>
                    <div class="s-about__tabs-content__text">
                      {{ item.text }}
                    </div>
                    <div class="s-about__tabs-content__stars">
                      {{ item.stars }}
                    </div>
                  </swiper-slide>
                </swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import './s_about.scss';

export default {
  name: 'SAbout',

  components: {
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      title: 'Что говорят о нас',
      students: 'Студенты',
      university: 'Вузы',
      show: 0,
      tabs: [
        {
          label: 'студенты',
          items_1: [
            {
              name: 'Екатерина Васильева',
              student: 'Студент программы “Ландшафтная архитектура”',
              image: 'about/students/vasilieva.jpg',
              stars: '4.5/5',
              text: 'Отличные преподаватели! Находят индивидуальный подход к каждому студенту.',
            },
            {
              name: 'Наталья Лисицина',
              student: 'Выпускник программы “Маркетинг”',
              image: 'about/students/lisitsina.jpg',
              stars: '4.5/5',
              text: 'Сразу после выпуска смогла устроиться в крупную компанию.',
            },
            {
              name: 'Никита Краснов',
              student: 'Выпускник программы “Вычислительные машины, комплексы, системы и сети”',
              image: 'about/students/krasnov.jpg',
              stars: '4.5/5',
              text: 'На учебе были преподаватели, которые делились реальным опытом работы.',
            },
            {
              name: 'Алина Сычева',
              student: 'Выпускник программы “Финансы и кредит”',
              image: 'about/students/sycheva.jpg',
              stars: '4.5/5',
              // eslint-disable-next-line max-len
              text: 'Будущую профессию навязали родители, думала будет сложно, но преподаватели смогли заинтересовать, сейчас работаю по специальности.',
            },
            {
              name: 'Вячеслав Ермолаев',
              student: 'Выпускник программы “Управление рисками”',
              image: 'about/students/ermolaev.jpg',
              stars: '4.5/5',
              // eslint-disable-next-line max-len
              text: 'Уже со второго курса начал проходить стажировки, очень пригодились пройденные практические задания.',
            },
            {
              name: 'Иван Козлов',
              student: 'Студент программы “Бизнес-аналитика”',
              image: 'about/students/kozlov.jpg',
              stars: '4.5/5',
              text: 'Порадовал выбор профильных дисциплин.',
            },
            {
              name: 'Надежда Исаева',
              student: 'Студент программы “Психология и социальная педагогика”',
              image: 'about/students/isaeva.jpg',
              stars: '4.5/5',
              text: 'Заканчиваю в следующем году, уже знаю куда пойду работать.',
            },
            {
              name: 'Александр Бутиков',
              student: 'Студент программы “Энергообеспечение предприятий”',
              image: 'about/students/butikov.jpg',
              stars: '4.5/5',
              text: 'Пишу диплом, научный руководитель очень помогает и поддерживает.',
            },
            {
              name: 'Варий Набиуллин',
              student: 'Выпускник программы “Менеджмент в игровой индустрии и киберспорте”',
              image: 'about/students/nabiullin.jpg',
              stars: '4.5/5',
              // eslint-disable-next-line max-len
              text: 'Выбрал эту программу, потому что в других университетах аналогичных не нашел. Теперь знаю, что когда пойду работать мои знания не устареют.',
            },
            {
              name: 'Валентина Романенко',
              student: 'Студент программы “Теория и история искусств”',
              image: 'about/students/romanenko.jpg',
              stars: '4.5/5',
              text: 'Хожу на учебу с удовольствием. Интересные лекции и много практики.',
            },
          ],
          items_2: [
            {
              name: 'Екатерина Васильева',
              student: 'Студент программы “Ландшафтная архитектура”',
              image: 'about/students/vasilieva.jpg',
              stars: '4.5/5',
              text: 'Отличные преподаватели! Находят индивидуальный подход к каждому студенту.',
            },
            {
              name: 'Наталья Лисицина',
              student: 'Выпускник программы “Маркетинг”',
              image: 'about/students/lisitsina.jpg',
              stars: '4.5/5',
              text: 'Сразу после выпуска смогла устроиться в крупную компанию.',
            },
            {
              name: 'Никита Краснов',
              student: 'Выпускник программы “Вычислительные машины, комплексы, системы и сети”',
              image: 'about/students/krasnov.jpg',
              stars: '4.5/5',
              text: 'На учебе были преподаватели, которые делились реальным опытом работы.',
            },
            {
              name: 'Алина Сычева',
              student: 'Выпускник программы “Финансы и кредит”',
              image: 'about/students/sycheva.jpg',
              stars: '4.5/5',
              // eslint-disable-next-line max-len
              text: 'Будущую профессию навязали родители, думала будет сложно, но преподаватели смогли заинтересовать, сейчас работаю по специальности.',
            },
            {
              name: 'Вячеслав Ермолаев',
              student: 'Выпускник программы “Управление рисками”',
              image: 'about/students/ermolaev.jpg',
              stars: '4.5/5',
              // eslint-disable-next-line max-len
              text: 'Уже со второго курса начал проходить стажировки, очень пригодились пройденные практические задания.',
            },
            {
              name: 'Иван Козлов',
              student: 'Студент программы “Бизнес-аналитика”',
              image: 'about/students/kozlov.jpg',
              stars: '4.5/5',
              text: 'Порадовал выбор профильных дисциплин.',
            },
            {
              name: 'Надежда Исаева',
              student: 'Студент программы “Психология и социальная педагогика”',
              image: 'about/students/isaeva.jpg',
              stars: '4.5/5',
              text: 'Заканчиваю в следующем году, уже знаю куда пойду работать.',
            },
            {
              name: 'Александр Бутиков',
              student: 'Студент программы “Энергообеспечение предприятий”',
              image: 'about/students/butikov.jpg',
              stars: '4.5/5',
              text: 'Пишу диплом, научный руководитель очень помогает и поддерживает.',
            },
            {
              name: 'Варий Набиуллин',
              student: 'Выпускник программы “Менеджмент в игровой индустрии и киберспорте”',
              image: 'about/students/nabiullin.jpg',
              stars: '4.5/5',
              // eslint-disable-next-line max-len
              text: 'Выбрал эту программу, потому что в других университетах аналогичных не нашел. Теперь знаю, что когда пойду работать мои знания не устареют.',
            },
            {
              name: 'Валентина Романенко',
              student: 'Студент программы “Теория и история искусств”',
              image: 'about/students/romanenko.jpg',
              stars: '4.5/5',
              text: 'Хожу на учебу с удовольствием. Интересные лекции и много практики.',
            },
          ],
        },
        {
          label: 'вузы',
          images: ['/images/about/1.jpg', '/images/about/2.jpg', '/images/about/3.jpg'],
          names: ['Екатерина Васильева', 'Наталья Лисицина'],
        },
      ],
      swiperOptionTabsContent: {
        direction: 'vertical',
        spaceBetween: 24,
        autoHeight: false,
        loop: true,
        slidesPerView: 'auto',
        speed: 8000,
        grabCursor: true,
        mousewheelControl: true,
        keyboardControl: true,
        reverseDirection: false,
      },
      swiperOptionTabsContent2: {
        direction: 'vertical',
        spaceBetween: 24,
        autoHeight: false,
        loop: true,
        slidesPerView: 'auto',
        speed: 8000,
        grabCursor: true,
        mousewheelControl: true,
        keyboardControl: true,
        reverseDirection: false,
      },
    };
  },

  methods: {
    navigate(e) {
      if (e.target.dataset.show) {
        e.preventDefault();
        this.show = e.target.dataset.show;
      }
      console.log(this.show);
    },
  },
};
</script>
