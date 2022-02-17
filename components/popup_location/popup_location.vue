<template>
  <div class="popup-location__dialog">
    <PopupAnimated
      :visible="isPopupSelectCity"
      @close="hidePopups"
      title="Где вы хотите учиться?"
      transition="slideToTop"
    >
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
        v-model.trim="searchCity"
      />
      <div class="popup-location__dialog-list" ref="cities">
        <span class="popup-location__dialog-list-item" v-for="city in cities.slice(0, 8)" :key="city.index">
          <input type="radio" name="cityDialog" :value="city.name" v-model="cityPicked" />
          <span>{{ city.name }}</span>
        </span>
      </div>
      <div class="popup-location__dialog-checkbox">
        <a-control
          typeBtn="checkbox"
          typeCtrl="checkbox"
          title="Определять автоматически"
          labelPosition="right"
          :checked="auto"
          @change="changeAuto"
        >
        </a-control>
      </div>
      <div class="popup-location__dialog-bottom">
        <a-button
          label="Сохранить"
          bgColor="accent"
          @click="saveCity(cityPicked)"
          :disabled="auto || cityPicked ? false : true"
        ></a-button>
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
import getCityByIp from '~/api/personalCity';
import getCityByStr from '~/api/getCityDadata';

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
      cityPicked: '', // Город, который выбрал пользователь
      cityObj: {},
      cities: [], // Сюда записываю города из поиска, либо города из нашего АПИ
      synergyCities: [],
      personalIP: '',
      isPopup: false,
      dadataKey: process.env.DADATA_KEY,
      auto: false,
    };
  },

  async fetch() {
    this.synergyCities = await getCitiesList();
    this.personalIP = await getPersonalIP();
  },

  watch: {
    searchCity() {
      this.getCities();
    },

    focused(val) {
      const aPopup = document.querySelector('.popup-animated .a-popup__container');
      if (val) {
        document.documentElement.classList.add('cityPopupFocused');
        aPopup.classList.add('active');
      } else {
        document.documentElement.classList.remove('cityPopupFocused');
        aPopup.classList.remove('active');
      }
    },

    cityPicked(val) {
      if (val) {
        this.searchCity = val;
        this.saveCityMobile(val);
      }
    },

    isPopup(val) {
      this.cityPicked = null;
      if (val) {
        document.documentElement.classList.add('cityPopupOpened');

        if (!this.cityObj.name) {
          this.cityObj = this.$store.state.cityInfo;
        }

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

  mounted() {
    this.getCity();
  },

  methods: {
    hidePopups() {
      this.$store.commit('changeIsPopupSelectCity', false);
      this.isPopup = false;
      this.searchCity = '';
    },

    saveCity(val) {
      const cityObjIndex = this.cities.findIndex((el) => el.name === val);
      const cityObj = this.cities[cityObjIndex];

      if (!this.auto) {
        this.cityObj = this.getCityObj(cityObj.name, cityObj.geoname_id, cityObj.city_kladr_id);
      } else {
        this.getCity();
      }

      this.$store.commit('setCityInfo', this.cityObj);
      localStorage.cityInfo = JSON.stringify(this.cityObj);

      this.hidePopups();
    },

    saveCityMobile(val) {
      if (val.length && window.innerWidth < 768) {
        this.saveCity(val);
      }
    },

    sortSynergyCities() {
      // При открытии попапа в массив городов первым ставлю город пользователя, для его же удобства
      this.cities = this.synergyCities;
      if (this.cityObj.name) {
        const cityPickedIndex = this.cities.findIndex((el) => el.name === this.cityObj.name);
        const cityPickedObj = this.cities[cityPickedIndex];

        if (cityPickedIndex >= 0) {
          this.cities.splice(cityPickedIndex, 1);
          this.cities.unshift(cityPickedObj);
        } else {
          this.cities.unshift(this.cityObj);
        }
      }
    },

    // Поиск города по строке
    getCities: debounce(async function debounceHandler() {
      const response = await getCityByStr(this.searchCity);
      this.cities = [];
      if (response.suggestions.length) {
        Object.values(response.suggestions).forEach((city) => {
          this.cities.push({
            name: city.data.city,
            geoname_id: city.data.geoname_id,
            city_kladr_id: city.data.city_kladr_id,
          });
        });
      } else {
        this.cities = this.synergyCities;
      }
    }, 700),

    // Поиск города по ip
    getCity() {
      fetch('https://api.ipify.org?format=json')
        .then((x) => x.json())
        .then(({ ip }) => {
          getCityByIp(ip).then((response) => {
            if (response.location) {
              const { data } = response.location;
              this.cityObj = this.getCityObj(data.city, data.geoname_id, data.city_kladr_id);
            }
          });
        });
    },

    // Объект с информацией о городе, который выбрал пользователь
    getCityObj(name, geonameId, cityKladrId) {
      return {
        name,
        geoname_id: geonameId,
        city_kladr_id: cityKladrId,
      };
    },

    changeAuto() {
      this.auto = !this.auto;

      if (this.auto && window.innerWidth < 768) {
        this.getCity();
        this.saveCityMobile(this.cityObj.name);
      }
    },
  },
};
</script>
