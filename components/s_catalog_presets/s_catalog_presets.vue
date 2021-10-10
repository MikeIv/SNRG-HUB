<template>
  <swiper class="catalog-presets__tags" :options="$options.swiperOption" v-if="hasPresets">
    <swiper-slide v-for="(preset, index) in presets" :key="index" class="catalog-presets__swiper-slide">
      <nuxt-link :to="`${buildPresetUrl(preset.filter)}`">
        <a-tag :label="preset.name" :class="{ 'catalog-presets__tags_active': isPresetMatched(preset.filter) }" />
      </nuxt-link>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { ATag } from '@cwespb/synergyui';
import './s_catalog_presets.scss';

export default {
  name: 'SCatalogPresets',

  props: ['filtersIdsData', 'hasPresets', 'presets'],

  components: {
    Swiper,
    SwiperSlide,
    ATag,
  },

  swiperOption: {
    slidesPerView: 'auto',
    spaceBetween: 8,
  },

  methods: {
    buildPresetUrl(preset) {
      let url = '/catalog?page=1';
      Object.entries(preset).forEach(([key, ids]) => {
        if (key !== 'published') {
          url = url.concat(`&${key}=${ids}`);
        }
      });
      return url;
    },

    isPresetMatched(preset) {
      const matchedArray = [];

      Object.entries(this.filtersIdsData).forEach(([key, ids]) => {
        if (Object.keys(preset).includes(key)) {
          const filterIds = ids.map((id) => Number(id)).sort((a, b) => a - b);
          if (filterIds.toString() === preset[key].toString()) {
            matchedArray.push(true);
          } else {
            matchedArray.push(false);
          }
        } else if (ids.length) {
          matchedArray.push(false);
        }
      });

      return !matchedArray.includes(false);
    },
  },
};
</script>
