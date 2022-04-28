<template>
  <div class="m-usermenu">
    <AUser
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
      <div class="m-usermenu__tooltip-box">
        <div class="m-usermenu__tooltip-title a-font_l">Организации</div>
        <AUser
          class="mb-8"
          :user="{ name: 'ООО Мапр', published: 'Юр.лицо', img: '/about/universities/vepi.jpg' }"
          imageShape="circle"
        />
        <AButton
          class="m-usermenu__tooltip-btn-add"
          label="Добавить организацию"
          bgColor="none"
          iconPosition="left"
          iconType="si-close"
        />
      </div>
    </a-tooltip>
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
    };
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
    },
  },
};
</script>
