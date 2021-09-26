<template>
  <section class="s-lp-address">
    <h2 class="s-lp-address__title a-font_h2">{{ title }}</h2>
    <iframe class="s-lp-address__map" :src="iframeSrc" frameborder="0"></iframe>
    <MContacts
      :adress="adress"
      :metro="metro"
      :backgroundColor="backgroundColor"
      :tel="tel"
      :email="email"
      :site="site"
      :direction="direction"
      @showContacts="showContacts"
    />
  </section>
</template>

<script>
import { MContacts } from '@cwespb/synergyui';
import './s_lp_address.scss';

export default {
  name: 's_lp_address',

  components: { MContacts },

  data() {
    return {
      title: 'Адрес',
      adress: 'Москва, Ленинградский проспект, дом 80, корпус 5',
      metro: 'Сокол',
      tel: '0 (000) 000 00 00',
      email: 'moi.edu@com',
      site: 'www.moi.edu.ru',
      backgroundColor: '#4BAF4F',
      isVisible: true,
      direction: true,
      iframeSrc:
        // eslint-disable-next-line max-len
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2242.0410345360833!2d37.50397731609034!3d55.80988799505497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54835df569257%3A0x2dbb97ba87459d!2z0JvQtdC90LjQvdCz0YDQsNC00YHQutC40Lkg0L_RgC3Rgi4sIDgwINC60L7RgNC_0YPRgSA1LCDQnNC-0YHQutCy0LAsIDEyNTA4MA!5e0!3m2!1sru!2sru!4v1632483216680!5m2!1sru!2sru" width="1140" height="286" style="border: 0;" allowfullscreen="" loading="lazy"',
    };
  },

  methods: {
    showContacts() {},
  },
};
</script>
