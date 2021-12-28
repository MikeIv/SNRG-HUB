<template>
  <div class="popup-location__dialog">
    <PopupAnimated :visible="isPopupSelectCity" @close="hidePopups" title="Выбор города" transition="slideToTop">
      <p class="popup-location__dialog-note a-font_xl">
        Каталог образовательных программ будет отфильтрован по&nbsp;выбранному Вами городу
      </p>
      <a-input
        id="search"
        icons="si-search"
        size="medium"
        placeholder="Введите название города"
        @focus="focused = true"
        @blur="focused = false"
        v-model="searchCity"
      />
      <div class="popup-location__dialog-list" ref="cities">
        <span class="popup-location__dialog-list-item" v-for="city in cities.slice(0, 8)" :key="city.index">
          <input type="radio" name="cityDialog" :value="city.name" v-model="cityPicked" />
          <span>{{ city.name }}</span>
        </span>
      </div>
      <div class="popup-location__dialog-checkbox">
        <AControl typeBtn="checkbox" typeCtrl="checkbox" title="Определять автоматически" labelPosition="right" />
      </div>
      <div class="popup-location__dialog-bottom">
        <a-button label="Сохранить" bgColor="accent" @click="saveCity(cityPicked)"></a-button>
        <a-button label="Отмена" bgColor="ghost-primary" @click="hidePopups"></a-button>
      </div>
    </PopupAnimated>
  </div>
</template>

<script>
import { AInput, AButton, AControl } from '@cwespb/synergyui';
import { debounce } from '~/assets/js/debounce';
import PopupAnimated from '~/components/popup_animated/popup_animated';
import './popup_location.scss';
import getCitiesList from '~/api/citiesList';
import getPersonalIP from '~/api/personalIP';

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
      searchCity: '',
      focused: false,
      cityPicked: {}, // Город, который выбрал пользователь
      cityObj: {},
      cities: [], // Сюда записываю города из поиска, либо города из нашего АПИ
      synergyCities: [],
      personalIP: '',
      isPopup: false,
      dadataKey: process.env.DADATA_KEY,
    };
  },

  async fetch() {
    this.synergyCities = await getCitiesList();
    this.personalIP = await getPersonalIP();
  },

  watch: {
    searchCity() {
      this.debounceSearchListener();
    },

    focused(val) {
      if (val) {
        document.documentElement.classList.add('cityPopupFocused');
      } else {
        document.documentElement.classList.remove('cityPopupFocused');
      }
    },

    cityPicked(val) {
      if (val) {
        this.saveCityMobile(val);
      }
    },

    isPopup(val) {
      if (val) {
        document.documentElement.classList.add('cityPopupOpened');

        if (!this.cityPicked) {
          this.cityPicked = this.$store.state.cityInfo.city;
        }

        if (!this.cityObj) {
          this.cityObj = this.$store.state.cityInfo;
        }

        this.getCityInfo();
        this.sortSynergyCities();
      } else {
        document.documentElement.classList.remove('cityPopupOpened');
      }
    },

    isPopupSelectCity(val) {
      if (val) {
        this.isPopup = val;
      }
    },
  },

  computed: {
    isPopupSelectCity() {
      return this.$store.state.isPopupSelectCity;
    },
  },

  methods: {
    hidePopups() {
      this.$store.commit('changeIsPopupSelectCity', false);
      this.isPopup = false;
    },

    saveCity(val) {
      if (this.cityObj.city !== val) {
        const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
        const token = this.dadataKey;
        const query = val;

        const options = {
          method: 'POST',
          mode: 'cors',
          count: 1,
          from_bound: { value: 'city' },
          to_bound: { value: 'city' },
          restrict_value: true,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({ query }),
        };

        fetch(url, options)
          .then((response) => response.text())
          .then((result) => {
            const resultObj = JSON.parse(result);
            const resultData = resultObj.suggestions[0].data;

            if (resultData) {
              this.cityObj = {
                city: resultData.city,
                geoname_id: resultData.geoname_id,
                city_kladr_id: resultData.city_kladr_id,
              };
              this.$store.commit('setCityInfo', this.cityObj);
              console.log(this.$store.state.cityInfo.city);
            }
          })
          .catch((error) => console.log('error', error));
        localStorage.city = val;
      }

      this.hidePopups();
    },

    saveCityMobile(val) {
      if (val.length && window.innerWidth < 768) {
        this.saveCity(val);
      }
    },

    sortSynergyCities() {
      // В массив городов первым ставлю город пользователя
      if (this.cityPicked) {
        const cityPickedIndex = this.synergyCities.findIndex((el) => el.name === this.cityPicked);
        const cityPickedObj = this.synergyCities[cityPickedIndex];

        if (cityPickedIndex >= 0) {
          this.synergyCities.splice(cityPickedIndex, 1);
          this.synergyCities.unshift(cityPickedObj);
        }
      }
      this.cities = this.synergyCities;
    },

    // Поиск города по строке поиска
    debounceSearchListener: debounce(function debounceHandler() {
      if (this.searchCity.trim().length) {
        const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
        const token = this.dadataKey;
        const query = this.searchCity;

        const options = {
          method: 'POST',
          mode: 'cors',
          count: 8,
          from_bound: { value: 'city' },
          to_bound: { value: 'city' },
          restrict_value: true,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({ query }),
        };

        fetch(url, options)
          .then((response) => response.text())
          .then((result) => {
            const resultObj = JSON.parse(result);
            const resultData = resultObj.suggestions;

            this.cities = [];
            if (resultData.length) {
              Object.values(resultData).forEach((val) => {
                if (!val.data.city) return;

                this.cities.push({
                  name: val.data.city,
                  geoname_id: val.data.geoname_id,
                  city_kladr_id: val.data.city_kladr_id,
                });
              });
            } else {
              this.cities = this.synergyCities;
            }
          })
          .catch((error) => console.log('error', error));
      } else {
        this.cities = this.synergyCities;
      }
    }, 700),

    // Поиск города по ip
    getCityInfo() {
      if (!this.cityPicked && this.personalIP.ip) {
        const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=';
        const token = this.dadataKey;
        const query = this.personalIP.ip;

        const options = {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Token ${token}`,
          },
        };

        fetch(url + query, options)
          .then((response) => response.text())
          .then((result) => {
            const resultObj = JSON.parse(result);
            const resultData = resultObj.location.data;

            if (resultData) {
              this.cityObj = {
                ip: this.personalIP.ip,
                city: resultData.city,
                geoname_id: resultData.geoname_id,
                city_kladr_id: resultData.city_kladr_id,
              };
              this.$store.commit('setCityInfo', this.cityObj);
              this.cityPicked = resultData.city;
            }
          })
          .catch((error) => console.log('dadata-error', error));
      }
    },
  },
};
</script>
