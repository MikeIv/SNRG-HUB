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

  data() {
    return {
      personalIP: '',
    };
  },

  computed: {
    isCity() {
      return this.$store.state.cityInfo.name || 'Настроить по городу';
    },
  },

  mounted() {
    if (localStorage.cityInfo) {
      this.$store.commit('setCityInfo', JSON.parse(localStorage.cityInfo));
    }
  },

  methods: {
    openPopup() {
      this.$store.commit('changeIsPopupSelectCity', true);
    },
  },
};
</script>
