<template>
  <section v-if="organizationData.map_link" class="s-contacts-address s-margin">
    <div class="l-wide l-border-radius">
      <h2 class="s-contacts-address__title a-font_h2" v-html="title" />

      <div class="s-contacts-address__map">
        <iframe class="s-contacts-address__frame" :src="organizationData.map_link" frameborder="0" />
      </div>
      <MContacts :adress="organizationData.address" />
    </div>
  </section>
</template>

<script>
import { MContacts } from '@cwespb/synergyui';
import './s_contacts_address.scss';

export default {
  name: 'SContactsAddress',

  components: { MContacts },

  props: {
    organizationData: {
      type: Object,
    },
  },

  data() {
    return {
      title: 'Адрес',
    };
  },
};
</script>
