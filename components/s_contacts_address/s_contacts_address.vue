<template>
  <section class="s-contacts-address">
    <h2 class="s-contacts-address__title a-font_h2" v-html="title"></h2>

    <div class="s-contacts-address__map">
      <iframe class="s-contacts-address__frame" :src="iframeSrc" frameborder="0"></iframe>
    </div>
    <MContacts
      :adress="adress"
      :metro="metro"
      :backgroundColor="backgroundColor"
    />

  </section>
</template>

<script>
import { MContacts } from '@cwespb/synergyui';
import './s_contacts_address.scss';

export default {
  name: 'SContactsMain',

  components: { MContacts },

  data() {
    return {
      title: 'Адрес',
      adress: '125315, Москва г., Ленинградский пр-кт, дом 80, корпус К. Г, этаж 6, помещение VIII, часть ком. 14',
      metro: 'Сокол',
      backgroundColor: '#4BAF4F',
      iframeSrc:
        // eslint-disable-next-line max-len
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2242.0410345360833!2d37.50397731609034!3d55.80988799505497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54835df569257%3A0x2dbb97ba87459d!2z0JvQtdC90LjQvdCz0YDQsNC00YHQutC40Lkg0L_RgC3Rgi4sIDgwINC60L7RgNC_0YPRgSA1LCDQnNC-0YHQutCy0LAsIDEyNTA4MA!5e0!3m2!1sru!2sru!4v1632483216680!5m2!1sru!2sru" width="100%" height="286" style="border: 0;" allowfullscreen="" loading="lazy"',
    };
  },
};
</script>
