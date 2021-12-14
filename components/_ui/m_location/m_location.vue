<template>
  <div class="m-location">
    <span class="m-location__city">
      <a-button :label="city" bgColor="none" iconType="si-location-city" @click="showDialog('question')"></a-button>
    </span>

    <div :class="['m-location__dialog', { active: cityDialogOpen }]">
      <div class="m-location__dialog-modal m-location__dialog-modal_question" v-show="cityDialogOpen == 'question'">
        <h6 class="m-location__dialog-title a-font_h6">
          {{ questionTitle }} <span>{{ city }}</span
          >?
        </h6>
        <div class="m-location__dialog-bottom">
          <a-button
            v-for="btn in questionBtns"
            :key="btn.index"
            :label="btn.name"
            :bgColor="btn.bgColor"
            @click="toggleDialog(btn.click, city)"
          ></a-button>
        </div>
        <button class="m-location__dialog-close si-close" type="button" @click="hideDialog"></button>
      </div>

      <div class="m-location__dialog-modal m-location__dialog-modal_choose" v-show="cityDialogOpen == 'choose'">
        <h6 class="m-location__dialog-title a-font_h6" v-html="dialogTitle"></h6>
        <a-input id="search" icons="si-search" size="medium" :placeholder="searchPlaceholder" v-model="searchCity" />
        <div class="m-location__dialog-list" ref="cities">
          <span class="m-location__dialog-list-item" v-for="city in citiesList" :key="city.index">
            <input type="radio" name="cityDialog" :value="city.name" v-model="cityPicked" />
            <span>{{ city.name }}</span>
          </span>
        </div>
        <div class="m-location__dialog-checkbox">
          <AControl typeBtn="checkbox" typeCtrl="checkbox" :title="dialogCheckbox" labelPosition="right" />
        </div>
        <div class="m-location__dialog-bottom">
          <a-button
            v-for="btn in dialogBtns"
            :key="btn.index"
            :label="btn.name"
            :bgColor="btn.bgColor"
            @click="toggleDialog(btn.click, cityPicked)"
          ></a-button>
        </div>
        <button class="m-location__dialog-close si-close" type="button" @click="hideDialog"></button>
      </div>

      <span class="m-location__dialog-bg" @click="hideDialog"></span>
    </div>
  </div>
</template>

<script>
import { AInput, AButton, AControl } from '@cwespb/synergyui';
import getCitiesList from '~/api/citiesList';
import './m_location.scss';

export default {
  name: 'mLocation',

  components: {
    AButton,
    AInput,
    AControl,
  },

  data() {
    return {
      cityDialogOpen: false,

      city: 'Москва', // Город, который определился
      cityPicked: null, // Город, который выбрал пользователь

      citiesFullList: [],
      citiesPopular: [
        { name: 'Москва' },
        { name: 'Санкт-Петербург' },
        { name: 'Екатеринбург' },
        { name: 'Уфа' },
        { name: 'Краснодар' },
        { name: 'Тюмень' },
        { name: 'Казань' },
        { name: 'Нижний Новгород' },
      ],

      questionTitle: 'Ваш город для поиска',
      questionBtns: [
        {
          name: 'Да',
          bgColor: 'accent',
          click: 'saveCity',
        },
        {
          name: 'Выбрать город',
          bgColor: 'ghost-primary',
          click: 'showDialog',
        },
      ],

      dialogTitle: 'Выбор города',
      dialogCheckbox: 'Определять автоматически',
      dialogBtns: [
        {
          name: 'Сохранить',
          bgColor: 'accent',
          click: 'saveCity',
        },
        {
          name: 'Отмена',
          bgColor: 'ghost-primary',
          click: 'hideDialog',
        },
      ],
      searchPlaceholder: 'Введите название города',
      searchCity: '',
    };
  },

  computed: {
    citiesList() {
      const searchCity = this.searchCity.toLowerCase();
      let searchedCities = this.citiesPopular;
      if (searchCity.length) {
        searchedCities = this.citiesFullList.filter((c) => c.name.toLowerCase().indexOf(searchCity) > -1);
      }

      if (!searchedCities.length) searchedCities = this.citiesPopular;
      return searchedCities;
    },
  },

  mounted() {
    if (localStorage.city) {
      this.city = localStorage.city;
    }
  },

  async fetch() {
    this.citiesFullList = await getCitiesList();
  },

  methods: {
    showDialog(type) {
      this.cityDialogOpen = type;
      document.documentElement.classList.add('city-dialog-opened');
    },

    hideDialog() {
      this.cityDialogOpen = false;
      this.cityPicked = null;
      document.documentElement.classList.remove('city-dialog-opened');
    },

    toggleDialog(e, city) {
      if (e === 'hideDialog') {
        this.hideDialog();
      }
      if (e === 'showDialog') {
        this.showDialog('choose');
      }
      if (e === 'saveCity') {
        this.saveCity(city);
        this.hideDialog();
      }
    },

    saveCity(city) {
      this.city = city;
      localStorage.city = city;
    },
  },
};
</script>
