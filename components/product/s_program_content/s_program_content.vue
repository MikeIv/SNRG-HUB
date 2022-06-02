<template>
  <section class="s-program-content s-margin" v-if="sectionData">
    <div class="l-wide l-border-radius">
      <div class="s-program-content__wrapper">
        <div class="s-program-content__top">
          <h2 class="s-program-content__title a-font_h2" v-html="sectionData.title"></h2>
          <div class="s-program-content__numbs">
            <AFactoids
              v-for="factoid in sectionData.rightItems"
              :key="factoid.id"
              :type="factoid.type"
              :title="factoid.title"
              :number="factoid.number"
              :color="factoid.color"
            />
          </div>
        </div>

        <div class="s-program-content__body">
          <div class="s-program-content__row" v-for="item in sectionData.items" :key="item.id" @click="showMore(item)">
            <div class="s-program-content__head">
              <div class="title a-font_xxl">{{ item.title }}</div>
              <div
                class="s-program-content__icon-wrapper"
                v-if="item.listItems.length && item.listItems[0].text !== null"
              >
                <i class="s-program-content__icon" :class="`si-chevron-${item.isActive ? 'down' : 'up'}`"> </i>
              </div>
            </div>
            <transition name="fadeHeight" v-if="item.listItems.length">
              <div class="s-program-content__info" v-if="item.isActive">
                <AListElement
                  v-for="item in item.listItems"
                  :key="item.id"
                  :type="item.type"
                  :number="item.number"
                  :label="item.text"
                />
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { AListElement } from '@cwespb/synergyui';
import AFactoids from '@/components/_ui/A-factoids/A-factoids';
import './s_program_content.scss';
// import productSectionInfo from '~/api/productSectionInfo';

export default {
  name: 'SProgramContent',

  components: {
    AFactoids,
    AListElement,
  },

  data() {
    return {
      sectionData: {
        title: 'Программа обучения',
        items: [
          {
            id: 1,
            title: 'Базовый курс по PHP',
            isActive: true,
            listItems: [
              {
                id: 1,
                type: 'numbered',
                // eslint-disable-next-line operator-linebreak, max-len
                text: 'Что такое PHP. Установка PHP. Редакторы для работы с кодомЧто такое PHP. Установка PHP. Редакторы для работы с кодомЧто такое PHP. Установка PHP. Редакторы для работы с кодом',
                number: 1,
              },
              {
                id: 2,
                type: 'numbered',
                text: 'Константы, операторы сравнения, ветвления',
                number: 2,
              },
              {
                id: 3,
                type: 'numbered',
                text: 'Массивы, отслеживание потребления памяти',
                number: 3,
              },
              {
                id: 4,
                type: 'numbered',
                // eslint-disable-next-line operator-linebreak, max-len
                text: 'Консольные скрипты, интерактивная консоль, настройка php, потоки ввода-вывода, аргументы запуска скриптов',
                number: 4,
              },
            ],
          },
          {
            id: 2,
            title: 'Продвинутый курс PHP',
            isActive: false,
            listItems: [
              {
                id: 1,
                type: 'numbered',
                // eslint-disable-next-line operator-linebreak, max-len
                text: 'Что такое PHP. Установка PHP. Редакторы для работы с кодомЧто такое PHP. Установка PHP. Редакторы для работы с кодомЧто такое PHP. Установка PHP. Редакторы для работы с кодом',
                number: 1,
              },
              {
                id: 2,
                type: 'numbered',
                text: 'Константы, операторы сравнения, ветвления',
                number: 2,
              },
              {
                id: 3,
                type: 'numbered',
                text: 'Массивы, отслеживание потребления памяти',
                number: 3,
              },
              {
                id: 4,
                type: 'numbered',
                // eslint-disable-next-line operator-linebreak, max-len
                text: 'Консольные скрипты, интерактивная консоль, настройка php, потоки ввода-вывода, аргументы запуска скриптов',
                number: 4,
              },
            ],
          },
          {
            id: 3,
            title: 'GIT и командная работа',
            isActive: false,
            listItems: [
              {
                id: 1,
                type: 'numbered',
                // eslint-disable-next-line operator-linebreak, max-len
                text: 'Что такое PHP. Установка PHP. Редакторы для работы с кодомЧто такое PHP. Установка PHP. Редакторы для работы с кодомЧто такое PHP. Установка PHP. Редакторы для работы с кодом',
                number: 1,
              },
              {
                id: 2,
                type: 'numbered',
                text: 'Константы, операторы сравнения, ветвления',
                number: 2,
              },
              {
                id: 3,
                type: 'numbered',
                text: 'Массивы, отслеживание потребления памяти',
                number: 3,
              },
              {
                id: 4,
                type: 'numbered',
                // eslint-disable-next-line operator-linebreak, max-len
                text: 'Консольные скрипты, интерактивная консоль, настройка php, потоки ввода-вывода, аргументы запуска скриптов',
                number: 4,
              },
            ],
          },
        ],
        rightItems: [
          {
            id: 1,
            title: 'тематических модуля',
            number: 93,
            type: 'number',
            color: 'color_link',
          },
          {
            id: 2,
            title: 'онлайн-уроков',
            number: 280,
            type: 'number',
            color: 'color_link',
          },
        ],
      },
      programContentList: [],
      programContentRightItems: [],
      direction: 'down',
      isActive: true,
    };
  },

  props: ['slug'],

  // async fetch() {
  //   const requestData = { slug: this.slug || this.$route.params.slug, key: 's-program-skills' };
  //   this.sectionData = await productSectionInfo(requestData);
  // },

  methods: {
    showMore(elem) {
      this.sectionData.items.forEach((item, i) => {
        if (item === elem) {
          this.sectionData.items[i].isActive = !this.sectionData.items[i].isActive;
        } else {
          this.sectionData.items[i].isActive = false;
        }
      });
    },
  },
};
</script>
