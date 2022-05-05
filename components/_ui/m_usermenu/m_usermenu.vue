<template>
  <div class="m-usermenu">
    <template v-if="isMobile">
      <div class="m-usermenu__item a-font_l" v-for="(link, i) in mobileListItems" :key="i">
        <div class="m-usermenu__item-title">{{ link.title }}</div>
        <i :class="`m-usermenu__item-icon ${link.icon}`"></i>
      </div>
      <div class="m-usermenu__item a-font_l color-red">
        <div class="m-usermenu__item-title">Выйти</div>
        <i class="m-usermenu__item-icon color-red si-entrance"></i>
      </div>
      <div class="m-usermenu__box">
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
      </div>
    </template>

    <template v-else>
      <AUser
        class="m-usermenu--tablet-short"
        :user="{
          name: 'Алексей О.',
          img: '/ege/teachers/3.jpg',
        }"
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
          <AUser
            :user="{
              name: 'Алексей О.',
              published: 'mail@yandex.ru',
              img: '/ege/teachers/3.jpg',
            }"
            imageShape="circle"
          />
        </div>
        <div class="m-usermenu__tooltip-row bd-bottom p-16">Управление аккаунтом</div>
        <div class="m-usermenu__tooltip-row p-16">Помощь</div>
        <div class="m-usermenu__tooltip-row" @click="logout">Выйти</div>
        <div class="m-usermenu__box">
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
        </div>
      </a-tooltip>
    </template>
  </div>
</template>

<script>
import { AButton } from '@cwespb/synergyui';
import AUser from '~/components/_ui/a_user/a_user';
import ATooltip from '~/components/_ui/a_tooltip/a_tooltip';
import './m_usermenu.scss';

export default {
  name: 'MUsermenu',

  components: {
    AButton,
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
        { title: 'Избранное', icon: 'si-heart' },
        { title: 'Уведомления', icon: 'si-bell' },
        { title: 'Управление аккаунтом', icon: 'si-filter' },
        { title: 'Помощь', icon: 'si-info' },
      ],
    };
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
