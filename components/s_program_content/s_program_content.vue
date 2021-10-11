<template>
  <section class="s-program-content" v-if="programContentList.length">
    <div class="s-program-content__wrapper">
      <div class="s-program-content__top">
        <h2 class="s-program-content__title a-font_h2" v-html="title"></h2>
        <div class="s-program-content__numbs" v-if="programContentRightItems">
          <AFactoid
            v-for="factoid in programContentRightItems"
            :key="factoid.id"
            :type="factoid.type"
            :title="factoid.title"
            :number="factoid.number"
            :color="factoid.color"
          />
        </div>
      </div>
      <div class="s-program-content__body">
        <div class="s-program-content__row" v-for="item in programContentList" :key="item.id" @click="showMore(item)">
          <div class="s-program-content__head">
            <div class="title a-font_xxl">{{ item.title }}</div>
            <div class="s-program-content__icon-wrapper" v-if="item.listItems.length">
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
import { AFactoid, AListElement } from '@cwespb/synergyui';
import './s_program_content.scss';

import getEntitiesSectionsDetail from '~/api/entitiesSectionsDetail';

export default {
  name: 's_program_content',

  components: {
    AFactoid,
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

  async fetch() {
    const expandedMethod = this.methods[0].data;
    const preData = await getEntitiesSectionsDetail(expandedMethod);
    this.programContentList = preData.json.items.data.map((item, index) => ({
      title: item.title.value,
      isActive: !index,
      listItems: item.items.data.map((elem, i) => ({
        id: i,
        type: 'dotted',
        text: elem.item.value,
        number: i + 1,
      })),
    }));
    this.programContentRightItems = preData.json.rightItems.data.map((item, index) => ({
      id: index + 1,
      title: item.description && item.description.value ? item.description.value : '',
      number: item.title && item.title.value ? item.title.value : '',
      type: 'number',
      color: 'color_link',
    }));
  },

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
