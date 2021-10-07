<template>
  <section class="s-contacts-about">
    <h2 class="s-contacts-address__title a-font_h2" v-html="title"></h2>

    <div class="s-contacts-about__items">
      <div class="s-contacts-about__item" v-for="item in requisites" :key="item.id">
        <div class="s-contacts-about__item-pretitle a-font_xxl">{{ item.pretitle }}</div>
        <div class="s-contacts-about__item-title a-font_h4">{{ item.title }}</div>
      </div>
    </div>

  </section>
</template>

<script>
import './s_contacts_about.scss';

export default {
  name: 'SContactsMain',

  data() {
    return {
      title: 'О компании',
      requisites: [
        { id: 1, pretitle: 'Наименование', title: 'ООО «Синерджи Юниверсити»' },
        { id: 2, pretitle: 'ИНН', title: '7743361338' },
        { id: 3, pretitle: 'ОГРН', title: '121700233002' },
      ],
    };
  },
};
</script>
