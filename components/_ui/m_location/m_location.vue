<template>
  <div class="m-location">
    <a-button :label="isCity" bgColor="none" iconType="si-location-city" @click="openPopup"></a-button>
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

  computed: {
    isCity() {
      return this.$store.state.city;
    },
  },

  mounted() {
    if (localStorage.city) {
      this.$store.commit('setCity', localStorage.city);
    }
  },

  methods: {
    openPopup() {
      this.$store.commit('changeIsPopupSelectCity', true);
    },
  },
};
</script>
