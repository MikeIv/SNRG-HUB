<template>
  <div class="container test">
    <div>
      <h1 class="title">{{ pageInfo.name }}</h1>
    </div>
    <nuxt-link to="/product">TO PRODUCT PAGE</nuxt-link>
    <br />
    <a-button label="TEST UI KIT" bgColor="accent" size="xlarge" iconType="si-chevron-down" />
    <a-select :options="options" />
    <h2>DATA FROM EXAMPLE:</h2>
    <example />
    <br />
    <h2>PAGE INFO:</h2>
    <component :is="section" v-for="section in sections" :key="section"></component>
    <!--    <component-->
    <!--      :is="section.key"-->
    <!--      v-for="section in pageInfo.components"-->
    <!--      :key="section"-->
    <!--      :section.methods-->
    <!--    ></component>-->
    <pre>
      {{ pageInfo }}
    </pre>
  </div>
</template>

<script>
import '@cwespb/synergyui/lib/synergyui.css';
import { AButton, ASelect } from '@cwespb/synergyui';
import Example from '~/components/Example';

export default {
  components: { Example, AButton, ASelect },

  middleware: 'getPageInfo',

  asyncData() {
    // Массив имен для component :is будет формироваться от бэка
    // На данный момент там имена неправильные, поэтому хардкод
    // А так мы их будем брать из pageInfo.components и у объекта ключ "key"
    const sections = [
      's-main-topics',
      's-main-statistics',
      's-main-programs',
      's-main-search',
      's-main-university',
      's-main-success',
      's-main-banners',
      's-main-banners-narrow',
      's-banner',
    ];

    const options = [
      {
        label: 'label',
        value: 'value',
      },
      {
        label: 'label2',
        value: 'value2',
      },
      {
        label: 'label3',
        value: 'value3',
      },
    ];

    return {
      sections,
      options,
    };
  },

  computed: {
    pageInfo() {
      return this.$store.state.pageInfo;
    },
  },

  mounted() {
    window.addEventListener('resize', () => {
      // something
    });
  },
};
</script>

<style>
.test {
  font-family: 'TT Norms', sans-serif;
  font-weight: 600;
}
</style>
