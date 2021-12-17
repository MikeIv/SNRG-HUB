<template>
  <div class="popup-location__wrapper">
    {{ IsPopupSelectCity }}
    <div class="l-wide">
      <PopupAnimated
        class="popup-location__dialog popup-location__dialog_question"
        :visible="isPopupQuestionCity"
        @close="hidePopup"
        :title="`Ваш город для поиска <span>${city}</span>?`"
        transition="slideToTop"
      >
        <div class="popup-location__dialog-bottom">
          <a-button label="Да" bgColor="accent" @click="saveCity(city)"></a-button>
          <a-button
            label="Выбрать город"
            bgColor="ghost-primary"
            @click="
              hidePopup();
              isPopupSelectCity = true;
            "
          ></a-button>
        </div>
      </PopupAnimated>

      <PopupAnimated
        class="popup-location__dialog popup-location__dialog_choose"
        :visible="isPopupQuestionCity"
        @close="hidePopup"
        title="Выбор города"
        transition="slideToTop"
      >
        <a-input
          id="search"
          icons="si-search"
          size="medium"
          placeholder="Введите название города"
          v-model="searchCity"
        />
        <div class="popup-location__dialog-list" ref="cities">
          <span class="popup-location__dialog-list-item" v-for="city in citiesList.slice(0, 8)" :key="city.index">
            <input type="radio" name="cityDialog" :value="city.name" v-model="cityPicked" />
            <span>{{ city.name }}</span>
          </span>
        </div>
        <div class="popup-location__dialog-checkbox">
          <AControl typeBtn="checkbox" typeCtrl="checkbox" title="Определять автоматически" labelPosition="right" />
        </div>
        <div class="popup-location__dialog-bottom">
          <a-button label="Сохранить" bgColor="accent" @click="saveCity(cityPicked)"></a-button>
          <a-button label="Отмена" bgColor="ghost-primary" @click="hidePopup"></a-button>
        </div>
      </PopupAnimated>
    </div>
  </div>
</template>

<script>
import { AInput, AButton, AControl } from '@cwespb/synergyui';
import PopupAnimated from '~/components/popup_animated/popup_animated';
import './popup_location.scss';
import getCitiesList from '~/api/citiesList';

export default {
  name: 'PopupLocation',

  components: {
    AInput,
    AButton,
    AControl,
    PopupAnimated,
  },

  data() {
    return {
      city: 'Москва', // Город, который определился
      searchCity: '',
      cityPicked: [], // Город, который выбрал пользователь
      citiesFullList: [],
      isPopupSelectCity: false,
      isPopupQuestionCity: false,
    };
  },

  async fetch() {
    this.citiesFullList = await getCitiesList();
  },

  computed: {
    IsPopupSelectCity() {
      return this.isPopupSelectCity;
    },
    citiesList() {
      const searchCity = this.searchCity.toLowerCase();
      let searchedCities = this.citiesFullList;

      if (searchCity.trim().length) {
        searchedCities = this.citiesFullList.filter((c) => c.name.toLowerCase().indexOf(searchCity) > -1);
      }

      return searchedCities;
    },
  },

  mounted() {
    console.log('mounted', this.isPopupSelectCity, this.$store.state.isPopupSelectCity);
    this.$nextTick(() => {
      this.isCityConfirmed();
    });
  },

  methods: {
    hidePopup() {
      this.isPopupQuestionCity = false;
      this.isPopupSelectCity = false;
      this.cityPicked = [];
    },

    isCityConfirmed() {
      if (localStorage.city) {
        this.city = localStorage.city;
      } else {
        this.isPopupQuestionCity = true;
      }
    },

    saveCity(city) {
      if (city) {
        this.city = city;
        localStorage.city = city;
      }
      this.hidePopup();
    },
  },
};
</script>
