<template>
  <section class="s-footer__wrap">
    <div class="l-wide">
      <s-footer
        socialsTitle="Мы в соцсетях"
        applicationsTitle="Приёмная комиссия в твоем телефоне"
        linkLogo="https://synergy.ru/assets/template/v5/images/logos/costum_part_dark_ru.svg"
        :socials="socials"
        :applications="applications"
        :accords="accords"
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
      socials: [
        {
          href: 'https://vk.com/synergyuniversity',
          icon: 'si-social-vk',
        },
        {
          href: 'https://www.facebook.com/synergyunivers',
          icon: 'si-social-facebook',
        },
        {
          href: 'https://www.instagram.com/synergyuniversity',
          icon: 'si-social-instagram',
        },
        {
          href: 'https://www.youtube.com/user/synergytvru',
          icon: 'si-social-youtube',
        },
      ],
      applications: [
        {
          link: 'https://synergy.ru/assets/template/v5/images/apps/apple_color_ru.png',
          alt: 'Apple Store',
          href: '',
        },
        {
          link: 'https://synergy.ru/assets/template/v5/images/apps/google_color_ru.png',
          alt: 'Google Play',
          href: '',
        },
      ],
      accords: [
        {
          href: '#',
          title: '© 2021 Synergy. Все права защищены',
        },
        {
          href: 'https://synergy.ru/lp/_chunk/privacy.php?lang=ru',
          title: 'Политика конфиденциальности',
        },
        {
          href: '#',
          title: 'Пользовательское соглашение',
        },
      ],
    };
  },
  components: {
    SFooter,
    MenuHorizontal,
  },
};
</script>
