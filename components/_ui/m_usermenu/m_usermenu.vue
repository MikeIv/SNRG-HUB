<template>
  <div class="m-usermenu">
    <template v-if="isMobile">
      <a :href="link.route" class="m-usermenu__item a-font_l" v-for="(link, i) in mobileListItems" :key="i">
        <div class="m-usermenu__item-title">{{ link.title }}</div>
        <i :class="`m-usermenu__item-icon ${link.icon}`"></i>
      </a>
      <div class="m-usermenu__item a-font_l color-red" @click="logout">
        <div class="m-usermenu__item-title">Выйти</div>
        <i class="m-usermenu__item-icon color-red si-entrance"></i>
      </div>
      <!-- <div class="m-usermenu__box">
        <div class="m-usermenu__box-title mb-8 a-font_l">Организации</div>
        <AUser
          class="mb-8"
          :user="{ name: 'ООО Мапр', published: 'Юр.лицо', img: '/about/universities/vepi.jpg' }"
          imageShape="circle"
        />
        <AButton
          class="m-usermenu__btn-add-organization"
          label="Добавить организацию"
          bgColor="none"
          iconPosition="left"
          iconType="si-close"
        />
      </div> -->
    </template>

    <template v-else>
      <AUser
        class="m-usermenu--tablet-short"
        :user="user"
        namePosition="left"
        imageShape="circle"
        @avatar-click="userTooltipVisible = !userTooltipVisible"
      />
      <a-tooltip
        class="m-usermenu__tooltip"
        :visible="userTooltipVisible"
        position="bottom-right"
        @hide-tooltip="userTooltipVisible = false"
      >
        <div class="m-usermenu__tooltip-row bd-bottom p-16">
          <AUser class="m-usermenu__tooltip-user" :user="user" imageShape="circle" />
        </div>
        <a href="https://pass.synergy.ru/" class="m-usermenu__tooltip-row bd-bottom p-16"> Управление аккаунтом </a>
        <nuxt-link to="contacts" class="m-usermenu__tooltip-row p-16">Помощь</nuxt-link>
        <div class="m-usermenu__tooltip-row color-red" @click="logout">Выйти</div>
        <!-- <div class="m-usermenu__box">
          <div class="m-usermenu__box-title mb-8 a-font_l">Организации</div>
          <AUser
            class="mb-8"
            :user="{ name: 'ООО Мапр', published: 'Юр.лицо', img: '/about/universities/vepi.jpg' }"
            imageShape="circle"
          />
          <AButton
            class="m-usermenu__btn-add-organization"
            label="Добавить организацию"
            bgColor="none"
            iconPosition="left"
            iconType="si-close"
          />
        </div> -->
      </a-tooltip>
    </template>
  </div>
</template>

<script>
/* import { AButton } from '@cwespb/synergyui'; */
import AUser from '~/components/_ui/a_user/a_user';
import ATooltip from '~/components/_ui/a_tooltip/a_tooltip';
import './m_usermenu.scss';

export default {
  name: 'MUsermenu',

  components: {
    /* AButton, */
    AUser,
    ATooltip,
  },

  props: {
    tabs: { Array },
    typeContent: { type: String, default: 'default' },
  },

  data() {
    return {
      userTooltipVisible: false,
      isMobile: false,
      mobileListItems: [
        /* { title: 'Избранное', icon: 'si-heart' },
        { title: 'Уведомления', icon: 'si-bell' }, */
        { title: 'Управление аккаунтом', icon: 'si-filter', route: 'https://pass.synergy.ru/' },
        { title: 'Помощь', icon: 'si-info', route: '/contacts' },
      ],
    };
  },
  computed: {
    userData() {
      return this.$store.getters['auth/userInfo'];
    },
    userFullName() {
      const name = this.userData?.account_information?.name || '';
      const surname = this.userData?.account_information?.surname;
      return `${name} ${surname ? `${surname[0]}.` : ''}`;
    },
    user() {
      return {
        name: this.userFullName,
        published: this.userData?.email?.email,
      };
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
    },
  },

  mounted() {
    this.isMobile = window.innerWidth < 768;
  },
};
</script>
