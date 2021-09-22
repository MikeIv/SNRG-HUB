<template>
  <section class="s-partners">
    <div class="l-default">
      <h2 class="s-partners__title a-font_h5">{{ title }}</h2>
      <div class="s-partners__items">
        <div
          class="s-partners__item"
          v-for="item in items"
          :key="item.id">
          <a-logo type="bordered" :link="item.link"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ALogo } from '@cwespb/synergyui';

// import getPageSectionDetail from '~/api/page_section_detail';

import './s_partners.scss';

export default {
  name: 'SPartners',

  props: ['methods'],

  components: {
    ALogo,
  },

  data() {
    return {
      items: [
        {
          id: 1,
          link: 'https://synergymarket.ru/site/img/svg/companies/alfabank.svg',
        },
        {
          id: 2,
          link: 'https://synergymarket.ru/site/img/svg/companies/akk.svg',
        },
        {
          id: 3,
          link: 'https://synergymarket.ru/site/img/svg/companies/mhat.svg',
        },
        {
          id: 4,
          link: 'https://synergymarket.ru/site/img/svg/companies/vk.svg',
        },
        {
          id: 5,
          link: 'https://synergymarket.ru/site/img/svg/companies/reebok.svg',
        },
        {
          id: 6,
          link: 'https://synergymarket.ru/site/img/svg/companies/mtsbank.svg',
        },
        {
          id: 7,
          link: 'https://synergymarket.ru/site/img/svg/companies/adidas.svg',
        },
        {
          id: 8,
          link: 'https://synergymarket.ru/site/img/svg/companies/samsung.svg',
        },
        {
          id: 9,
          link: 'https://synergymarket.ru/site/img/svg/companies/lego.svg',
        },
        {
          id: 10,
          link: 'https://synergymarket.ru/site/img/svg/companies/tinkof.svg',
        },
      ],
      title: 'Наши выпускники строят карьеру в ведущих компаниях',
    };
  },

  // async fetch() {
  //   const requestData = {
  //     filter: {
  //       section_id: 10,
  //       page: 1,
  //     },
  //   };
  //   this.partnersList = await getPageSectionDetail(requestData);
  // },

};
</script>
