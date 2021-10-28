<template>
  <div class="thanks-lp__wrapper">
    <SHeader />
    <section class="thanks-lp">
      <div class="thanks-lp__content">
        <div class="l-wide">
          <div class="thanks-lp__info">
            <h1 class="thanks-lp__title a-font_h1">Спасибо! Ваша заявка принята</h1>
            <div class="thanks-lp__subtitle a-font_xl-m">
              Скоро специалист приемной комиссии свяжется с вами и ответит на вопросы
            </div>
            <a-button @click="goBack" label="Продолжить просмотр" size="large" bgColor="accent" />
          </div>
          <div class="thanks-lp__img">
            <svg width="140" height="260" viewBox="0 0 140 260" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M140 190.82L74.514 130.007L140 69.1965V0L0 129.993L140 260V190.82Z" fill="#FF0040" />
            </svg>
          </div>
        </div>
      </div>
    </section>
    <SFooter />
  </div>
</template>

<script>
import { AButton } from '@cwespb/synergyui';
import SHeader from '~/components/s_header/s_header';
import SFooter from '~/components/s_footer/s_footer';

export default {
  name: 'thanksLP',

  layout: 'empty',

  components: {
    AButton,
    SHeader,
    SFooter,
  },

  methods: {
    goBack() {
      this.$router.push({ name: 'edu-platform-slug' });
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/styles/tools/mixins';

.thanks-lp {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  width: 100%;
  @media screen and (max-width: 767px) {
    padding: rem(32) 0;
  }
  @media screen and (max-width: 600px) {
    align-items: flex-start;
    padding-bottom: 0;
  }
  .l-wide,
  .a-button {
    width: 100%;
  }
  .l-wide {
    position: relative;
    margin: auto;
  }
  &__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
    min-height: 100vh;
    @media screen and (max-width: 991px) {
      height: 100vh;
      min-height: 0;
    }
  }
  &__content {
    display: flex;
    width: 100%;
    height: 100%;
    @media screen and (max-width: 600px) {
      flex-direction: column;
      justify-content: space-between;
      padding-bottom: 0;
    }
  }
  &__title {
    margin-bottom: rem(24);
    @media screen and (max-width: 600px) {
      margin-bottom: rem(12);
    }
  }
  &__subtitle {
    margin-bottom: rem(52);
    @media screen and (max-width: 600px) {
      margin-bottom: rem(32);
    }
  }
  &__img {
    position: absolute;
    top: 50%;
    right: rem(30);
    bottom: unset;
    display: flex;
    width: unset;
    min-width: unset;
    transform: translateY(-50%);
    @media screen and (max-width: 600px) {
      display: none;
    }
  }
  &__info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 50%;
    @media screen and (max-width: 600px) {
      width: 100%;
    }
  }
  &__button-wrap {
    text-decoration: none;
    @media screen and (max-width: 600px) {
      width: 100%;
    }
  }
}
</style>
