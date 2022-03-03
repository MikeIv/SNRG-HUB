<template>
  <section class="s-program-content" v-if="programContentList.length">
    <div class="s-program-content__wrapper">
      <div class="s-program-content__top">
        <h2 class="s-program-content__title a-font_h2" v-html="title"></h2>
      </div>
      <div class="s-program-content__body">
        <div class="s-program-content__row" v-for="item in programContentList" :key="item.id" @click="showMore(item)">
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
  </section>
</template>

<script>
import { AListElement } from '@cwespb/synergyui';
import './s_program_content.scss';

export default {
  name: 's_program_content',

  components: {
    AListElement,
  },

  data() {
    return {
      programContentList: [],
      programContentRightItems: [],
      direction: 'down',
      isActive: true,
    };
  },

  props: ['methods', 'title'],

  methods: {
    showMore(elem) {
      this.programContentList.forEach((item, i) => {
        if (item === elem) {
          this.programContentList[i].isActive = !this.programContentList[i].isActive;
        } else {
          this.programContentList[i].isActive = false;
        }
      });
    },
  },
};
</script>
