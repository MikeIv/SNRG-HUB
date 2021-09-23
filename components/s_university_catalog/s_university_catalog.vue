<template>
  <section class="s-university-catalog">
    <div class="s-university-catalog__header">
      <h2 class="s-program-timeline__title a-font_h2" v-html="title"></h2>
    </div>

    <div class="s-university-catalog__cards">
      <nuxt-link to="/">
        <m-card
          v-for="item in items"
          :key="item.id"
          :title="item.title"
          :type="item.type"
          :description="item.description"
          :bottomText="item.bottomText"
          :iconSrc="item.iconSrc"
          @onLikeClick="onLikeClickHandler"
        />
      </nuxt-link>
    </div>

    <div class="s-university-catalog__pagination">
      <MPagination
        :totalItems="pagination.totalItems"
        :perPage="pagination.perPage"
        :currentPage="pagination.currentPage"
        :prevText="pagination.prevText"
        :nextText="pagination.nextText"
      />
    </div>
  </section>
</template>

<script>
import { MCard, MPagination } from '@cwespb/synergyui';
import './s_university_catalog.scss';

export default {
  name: 's_university_catalog',

  components: {
    MCard,
    MPagination,
  },

  data() {
    return {
      title: 'У нас есть все для <span>построения успешной карьеры</span>',
      items: [
        {
          id: 1,
          type: 'program',
          title: 'Title',
          description: 'Label',
          iconSrc: 'https://sys3.ru/marketplace/uploads/organizations/yuIYPVAzTpYhkDo2acWAZAMLpIh4LiRGttzzlyFs.svg',
          bottomText: 'Университет Синергия',
        },
        {
          id: 2,
          type: 'program',
          title: 'Title',
          description: 'Label',
          iconSrc: 'https://sys3.ru/marketplace/uploads/organizations/yuIYPVAzTpYhkDo2acWAZAMLpIh4LiRGttzzlyFs.svg',
          bottomText: 'Университет Синергия',
        },
        {
          id: 3,
          type: 'program',
          title: 'Title',
          description: 'Label',
          iconSrc: 'https://sys3.ru/marketplace/uploads/organizations/yuIYPVAzTpYhkDo2acWAZAMLpIh4LiRGttzzlyFs.svg',
          bottomText: 'Университет Синергия',
        },
        {
          id: 4,
          type: 'program',
          title: 'Title',
          description: 'Label',
          iconSrc: 'https://sys3.ru/marketplace/uploads/organizations/yuIYPVAzTpYhkDo2acWAZAMLpIh4LiRGttzzlyFs.svg',
          bottomText: 'Университет Синергия',
        },
        {
          id: 5,
          type: 'program',
          title: 'Title',
          description: 'Label',
          iconSrc: 'https://sys3.ru/marketplace/uploads/organizations/yuIYPVAzTpYhkDo2acWAZAMLpIh4LiRGttzzlyFs.svg',
          bottomText: 'Университет Синергия',
        },
      ],
      pagination: {
        totalItems: 20,
        perPage: 6,
        currentPage: 4,
        prevText: 'Prev',
        nextText: 'Next',
      },
    };
  },
};
</script>
