<template>
  <section class="s-program-content s-margin" v-if="sectionData">
    <div class="l-wide l-border-radius">
      <div class="s-program-content__wrapper">
        <div class="s-program-content__top">
          <h2 class="s-program-content__title a-font_h2" v-html="sectionData.title"></h2>
          <div class="s-program-content__numbs" v-if="rightItemsFilled">
            <AFactoids
              v-for="factoid in sectionData.rightItems"
              :key="factoid.id"
              :type="factoid.type"
              :title="factoid.title || ''"
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
            <transition name="fadeHeight" v-if="dropdownISFilled(item.listItems)">
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
import productSectionInfo from '~/api/productSectionInfo';

export default {
  name: 'SProgramContent',

  components: {
    AFactoids,
    AListElement,
  },

  data() {
    return {
      sectionData: null,
    };
  },

  props: ['slug'],

  computed: {
    rightItemsFilled() {
      return this.sectionData.rightItems.some(({ title, number }) => title && number);
    },
  },

  methods: {
    showMore(elem) {
      this.sectionData.items.forEach((item) => {
        const currentItem = item;
        currentItem.isActive = item === elem ? !currentItem.isActive : false;
      });
    },
    dropdownISFilled(listItems) {
      return listItems.every(({ text }) => text);
    },
  },

  async fetch() {
    const requestData = { slug: this.slug || this.$route.params.slug, key: 's-program-content' };
    this.sectionData = await productSectionInfo(requestData);
  },
};
</script>
