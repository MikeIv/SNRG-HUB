<template>
  <div class="proftest">
    <SProftest />
  </div>
</template>

<script>
import SProftest from '~/components/s_proftest/s_proftest';

export default {
  components: {
    SProftest,
  },
  head() {
    return {
      bodyAttrs: {
        class: 'bg-gray',
      },
    };
  },
};
</script>
