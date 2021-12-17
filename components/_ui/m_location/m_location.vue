<template>
  <div class="m-location">
    <a-button :label="city" bgColor="none" iconType="si-location-city" @click="openPopup"></a-button>
  </div>
</template>

<script>
import { AButton } from '@cwespb/synergyui';
import './m_location.scss';

export default {
  name: 'mLocation',

  components: {
    AButton,
  },

  data() {
    return {
      city: 'Москва',
    };
  },

  mounted() {
    if (localStorage.city) {
      this.city = localStorage.city;
    }
  },

  watch: {
    city(newCity) {
      localStorage.city = newCity;
      this.city = newCity;
    },
  },

  methods: {
    openPopup() {
      this.$store.commit('changeIsPopupSelectCity', true);
      console.log('openPopup', this.$store.state.isPopupSelectCity);
    },
  },
};
</script>
