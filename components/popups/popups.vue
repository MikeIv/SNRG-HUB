<template>
  <section class="popups">
    <PopupLocation />
  </section>
</template>

<script>
import PopupLocation from '~/components/popup_location/popup_location';

export default {
  name: 'Popups',

  components: {
    PopupLocation,
  },
};
</script>
