<template>
  <div class="s-program-advantages">
    <h2 class="s-program-advantages__title a-font_h2" v-html="title"></h2>
    <swiper :options="swiperOptionProgramAdvantages">
      <swiper-slide class="s-program-advantages__table">
        <div class="s-program-advantages__table-titles">
          <div class="s-program-advantages__table-title a-font_h6" v-for="(title, id) in titles" :key="id">
            {{ title }}
          </div>
        </div>
        <div class="s-program-advantages__table-row" v-for="(item, id) in items" :key="id">
          <div class="s-program-advantages__item">
            <div class="s-program-advantages__item-title a-font_xxl">
              {{ item.title }}
            </div>
            <div class="s-program-advantages__item-text" v-for="(text, id) in item.texts" :key="id">
              {{ text }}
            </div>
            <div class="s-program-advantages__item-icon" v-for="(icon, id) in item.icons" :key="id">
              <div class="s-program-advantages__icon" :class="{ check: icon.check }" v-if="icon.check">
                <i class="si-done"></i>
              </div>
              <div class="s-program-advantages__icon" :class="{ close: !icon.check }" v-if="!icon.check">
                <i class="si-close"></i>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import './s_program_advantages.scss';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';

export default {
  name: 's_program_advantages',

  data() {
    return {
      title: 'Ваши <span>преимущества</span>',
      titles: ['Опции', 'Школа «Синергия»', 'Обычная школа'],
      swiperOptionProgramAdvantages: {
        slidesPerView: 'auto',
        resistance: true,
        resistanceRatio: 0,
        freeMode: true,
      },
      items: [
        {
          title: 'Аттестат государственного образца',
          icons: [
            {
              check: true,
            },
            {
              check: true,
            },
          ],
        },
        {
          title: 'Информатика с 5 класса',
          icons: [
            {
              check: true,
            },
            {
              check: false,
            },
          ],
        },
        {
          title: 'Второй язык с 5 класса',
          icons: [
            {
              check: true,
            },
            {
              check: false,
            },
          ],
        },
        {
          title: 'Общение с учителем ',
          icons: [
            {
              check: true,
            },
            {
              check: true,
            },
          ],
        },
        {
          title: 'Проверка домашнего задания',
          icons: [
            {
              check: true,
            },
            {
              check: true,
            },
          ],
        },
        {
          title: 'Просмотр всех уроков в записи',
          icons: [
            {
              check: true,
            },
            {
              check: false,
            },
          ],
        },
        {
          title: 'Получение Москвоского образования из любой точки мира',
          icons: [
            {
              check: true,
            },
            {
              check: false,
            },
          ],
        },
        {
          title: 'Дополнительная  бесплатная подготовка к ЕГЭ и ОГЭ стоимостью больше 75 000 рублей ',
          icons: [
            {
              check: true,
            },
            {
              check: false,
            },
          ],
        },
      ],
    };
  },

  components: {
    Swiper,
    SwiperSlide,
  },
};
</script>
