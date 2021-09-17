<template>
  <div>
    <h2>S-main-topics</h2>
  </div>
</template>

<script>
import getDirectionsList from '~/api/dicrectionsList';

export default {
  name: 'SMainTopics',
  data() {
    return {
      directionsList: null,
    };
  },
  components: {},
  props: {},

  async fetch() {
    const requestData = {
      filter: {
        published: true,
        show_main: true,
      },
      sort: 'sort',
    };
    this.directionsList = await getDirectionsList(requestData);
  },
};
</script>
