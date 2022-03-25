<template>
  <section class="s-search-home s-padding">
    <div class="l-wide l-border-radius">
      <div class="s-search-home__wrapper">
        <div class="s-search-home__infoblock">
          <h1 class="a-font_h1">Образовательная<br />платформа</h1>
          <div class="s-search-home__inputWrapper">
            <input type="text" placeholder="Поиск" v-model="searchData" />
            <nuxt-link :to="{ path: '/', query: { search: searchData } }">
              <button type="fill" class="a-button a-button--small a-button--accent a-button--undefined">
                <i class="a-button__icon a-button__icon--undefined undefined"></i>
                <span class="a-button__label a-font_button">Найти</span>
              </button>
            </nuxt-link>
          </div>
          <div class="s-search-home__tags">
            <span class="a-font_L">Запросы:</span>
            <nuxt-link to="/?search=Управление">
              <ATag label="Управление" />
            </nuxt-link>
            <nuxt-link to="/?search=Дизайн">
              <ATag label="Дизайн" />
            </nuxt-link>
            <nuxt-link to="/?search=Программирование">
              <ATag label="Программирование" />
            </nuxt-link>
            <nuxt-link to="/?search=Маркетинг">
              <ATag label="Маркетинг" />
            </nuxt-link>
            <nuxt-link to="/?search=IT">
              <ATag label="IT" />
            </nuxt-link>
            <nuxt-link to="/?search=Логистика">
              <ATag label="Логистика" />
            </nuxt-link>
            <nuxt-link to="/?search=Финансы">
              <ATag label="Финансы" />
            </nuxt-link>
            <nuxt-link to="/?search=Игры">
              <ATag label="Игры" />
            </nuxt-link>
          </div>
        </div>
        <div class="s-search-home__imageWrapper">
          <img src="@/assets/images/section-search.png" alt="" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import './s_search_home.scss';
import { ATag } from '@cwespb/synergyui';

export default {
  name: 'SSearchHome',
  components: {
    ATag,
  },
  data() {
    return {
      searchData: '',
    };
  },
};
</script>
