<template>
  <section class="s-footer__wrap">
    <div class="l-wide">
      <s-footer
        socialsTitle="Мы в соцсетях"
        applicationsTitle="Приёмная комиссия в твоем телефоне"
        :linkLogo="logoURL"
        :socials="socials"
        :applications="applications"
        :terms="terms"
        :policy="policy"
      >
        <MenuHorizontal />
      </s-footer>
    </div>
  </section>
</template>

<script>
import { SFooter } from '@cwespb/synergyui';
import MenuHorizontal from '../menu_horizontal/menu_horizontal';
import './s_footer.scss';

export default {
  name: 'Footer',

  data() {
    return {
      socials: [],
      logoURL: '',
      policy: {
        href: "",
        text: "",
      },
      terms: {
        href: "",
        text: "",
      },
      applications: [
        {
          href: '#',
          image: 'https://synergy.ru/assets/template/v5/images/apps/apple_color_ru.png',
          alt: 'Apple Store',
        },
        {
          href: '#',
          image: 'https://synergy.ru/assets/template/v5/images/apps/google_color_ru.png',
          alt: 'Google Play',
        },
      ],
    };
  },

  computed: {
    globalData() {
      return this.$store.state.globalData.globalData;
    },
  },

  created() {
    let globalData = this.$store.state.globalData.globalData.data;
    let socialsItems = globalData.contacts.social_networks;
    this.logoURL = globalData.main.logo;

    this.policy.href = globalData.privacy_policy.link;
    this.policy.text = globalData.privacy_policy.text;

    for (let i = 0; i < socialsItems.length; i++) {
      let item = socialsItems[i];
      let social = {
        href: item.link,
        icon: 'si-social-' + item.name,
      }
      this.socials.push(social);
    }
  },

  components: {
    SFooter,
    MenuHorizontal,
  },
};
</script>
