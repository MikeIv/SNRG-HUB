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
            @click="toggleDialog(btn.click)"
          ></a-button>
        </div>
        <button class="m-location__dialog-close si-close" type="button" @click="hideDialog"></button>
      </div>

      <div class="m-location__dialog-modal m-location__dialog-modal_choose" v-show="cityDialogOpen == 'choose'">
        <h6 class="m-location__dialog-title a-font_h6" v-html="dialogTitle"></h6>
        <a-input id="search" icons="si-search" size="medium" :placeholder="searchPlaceholder" />
        <div class="m-location__dialog-list" ref="citiez">
          <span class="m-location__dialog-list-item" v-for="city in citiesPopular" :key="city.index">
            <input type="radio" name="cityDialog" :value="city" v-model="cityPicked" />
            <span>{{ city }}</span>
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
      city: 'Москва',
      cityPicked: null,
      cityDialogOpen: false,
      citiesPopular: [
        'Москва',
        'Санкт-Петербург',
        'Екатеринбург',
        'Уфа',
        'Краснодар',
        'Тюмень',
        'Казань',
        'Нижний Новгород',
      ],
      questionTitle: 'Ваш город для поиска',
      questionBtns: [
        {
          name: 'Да',
          bgColor: 'accent',
          click: 'hideDialog',
        },
        {
          name: 'Выбрать город',
          bgColor: 'secondary',
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
      dialogShow: false,
    };
  },

  mounted() {
    if (localStorage.city) {
      this.city = localStorage.city;
    }
  },

  methods: {
    showDialog(type) {
      this.cityDialogOpen = type;
      document.documentElement.classList.add('city-dialog-opened');
    },

    hideDialog() {
      this.cityDialogOpen = false;
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
        this.city = city;
        localStorage.city = city;
        this.hideDialog();
      }
    },
  },
};
</script>
