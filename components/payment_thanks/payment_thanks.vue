<template>
  <section class="payment-thanks">
    <div class="l-wide payment-thanks__content">
      <div class="payment-thanks__box">
        <h2 class="payment-thanks__title a-font_h1">Оплата прошла успешно!</h2>
        <div class="payment-thanks__cards">
          <div class="payment-thanks__card lms">
            <div class="payment-thanks__card-preloader" v-if="!linkLMS">
              <h3 class="payment-thanks__card-title">Создаём личный кабинет<br />подождите немного</h3>
              <m-loader type="basic" />
            </div>
            <h3 class="payment-thanks__card-title">Доступ в Synergy LMS</h3>
            <p class="payment-thanks__card-text">Начните обучение прямо сейчас</p>
            <a-button class="payment-thanks__card-button" label="Начать учиться" bgColor="accent" @click="toLMS" />
          </div>
          <div class="payment-thanks__card docs" v-if="!isRegistrationCompleted">
            <h3 class="payment-thanks__card-title">Завершите регистрацию</h3>
            <p class="payment-thanks__card-text">И подайте документы, чтобы открыть доступ к полному функционалу</p>
            <a-button
              class="payment-thanks__card-button"
              label="Завершить"
              bgColor="ghost-accept"
              @click="onButtonClickHandler"
            />
          </div>
          <div class="payment-thanks__card docs" v-else>
            <h3 class="payment-thanks__card-title">Подайте документы</h3>
            <p class="payment-thanks__card-text">Чтобы открыть доступ к полному функционалу</p>
            <a-button
              class="payment-thanks__card-button"
              label="Подать документы"
              bgColor="ghost-accept"
              @click="onButtonClickHandler"
            />
          </div>
        </div>
        <img class="payment-thanks__img" src="/payment-thanks/payment-thanks.png" alt="thanks" />
        <div class="payment-thanks__svg">
          <svg viewBox="0 0 699 485" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M172.569 307.353L225.471 307.353L225.471 228L172.569 307.353Z" fill="#FF0040" />
            <path d="M172.569 386.706L225.471 386.706L225.471 307.353L172.569 386.706Z" fill="#A64DCF" />
            <path d="M172.569 465.302L225.471 465.302L225.471 386.705L172.569 465.302Z" fill="#A64DCF" />
            <path d="M67.2349 464.95L120.137 464.95L120.137 386.353L67.2349 464.95Z" fill="#A64DCF" />
            <path d="M119.667 307.255L172.397 307.255L172.397 228L119.667 307.255Z" fill="#FF0040" />
            <path d="M119.668 386.706L172.569 386.706L172.569 307.353L119.668 386.706Z" fill="#FF0040" />
            <path d="M66.9996 386.353L119.901 386.353L119.901 307L66.9996 386.353Z" fill="#FF0040" />
            <path d="M119.667 465.302L172.568 465.302L172.568 386.705L119.667 465.302Z" fill="#A64DCF" />
            <path d="M14.3326 464.95L67.2344 464.95L67.2344 386.353L14.3326 464.95Z" fill="#A64DCF" />
            <rect
              x="343.654"
              y="465.673"
              width="118.949"
              height="237.898"
              transform="rotate(180 343.654 465.673)"
              fill="#A64DCF"
            />
            <path d="M343.336 583.5L580.639 583.5L580.639 228.302L343.336 228.302L343.336 583.5Z" fill="#37B4A5" />
            <path d="M501.176 583.5L580.112 583.5L580.112 405.814L501.176 405.814L501.176 583.5Z" fill="white" />
            <path d="M105.862 583.5L224.426 583.5L224.426 464.936L105.862 464.936L105.862 583.5Z" fill="#FF0040" />
            <path
              d="M122.475 524.057C122.475 547.706 141.65 566.562 164.979 566.562C188.628 566.562 207.483 547.387 207.483 524.057C207.483 500.728 188.309 481.553 164.979 481.553C141.65 481.553 122.475 500.728 122.475 524.057Z"
              fill="#FFD300"
            />
            <path d="M342.986 227.809L461.55 227.809L461.55 109.245L342.986 109.245L342.986 227.809Z" fill="#FF0040" />
            <path
              d="M342.986 109.565L461.55 109.565L461.55 228.128L342.986 228.128L342.986 109.565ZM362.161 210.871L444.932 210.871L444.932 126.502L362.161 126.502L362.161 210.871Z"
              fill="#FFA800"
            />
            <path
              d="M373.03 137.687L434.069 137.687L434.069 200.005L373.03 200.005L373.03 137.687ZM381.978 190.738L425.441 190.738L425.441 146.316L381.978 146.316L381.978 190.738Z"
              fill="#FFA800"
            />
            <path
              d="M461.549 227.809L580.112 227.809L580.112 109.245L461.549 109.245L461.549 227.809Z"
              fill="#FF0040"
            />
            <path
              d="M461.549 109.565L580.112 109.565L580.112 228.128L461.549 228.128L461.549 109.565ZM480.723 210.871L563.494 210.871L563.494 126.502L480.723 126.502L480.723 210.871Z"
              fill="#FFD300"
            />
            <path
              d="M491.589 137.688L552.629 137.688L552.629 200.006L491.589 200.006L491.589 137.688ZM500.538 190.738L544 190.738L544 146.317L500.538 146.317L500.538 190.738Z"
              fill="#FFD300"
            />
            <path d="M580.116 227.809L698.68 227.809L698.68 109.245L580.116 109.245L580.116 227.809Z" fill="#FF0040" />
            <path
              d="M580.436 109.565L699 109.565L699 228.128L580.436 228.128L580.436 109.565ZM599.291 210.871L682.062 210.871L682.062 126.502L599.291 126.502L599.291 210.871Z"
              fill="#FFA800"
            />
            <path
              d="M610.477 137.688L671.517 137.688L671.517 200.006L610.477 200.006L610.477 137.688ZM619.106 190.738L662.568 190.738L662.568 146.317L619.106 146.317L619.106 190.738Z"
              fill="#FFA800"
            />
            <path
              d="M698.68 228.128L698.68 405.814C650.423 405.814 611.115 366.186 611.115 316.971C611.435 267.756 650.423 228.128 698.68 228.128Z"
              fill="#FF0040"
            />
            <path
              d="M698.68 274.466L698.68 359.155C675.031 359.155 656.176 340.3 656.176 316.651C656.176 293.322 675.35 274.466 698.68 274.466Z"
              fill="#00BDFF"
            />
            <path d="M698.68 405.495L639.558 405.495L639.558 494.338L698.68 405.495Z" fill="#37B4A5" />
            <path d="M639.559 405.495L580.436 405.495L580.436 494.338L639.559 405.495Z" fill="#37B4A5" />
            <path d="M499.251 227.78L342.813 227.78L342.813 465.083L499.251 227.78Z" fill="#A64DCF" />
            <path d="M224.422 583.5L342.985 583.5L342.985 464.936L224.422 464.936L224.422 583.5Z" fill="#FFA800" />
            <path
              d="M262.452 487.626L283.545 503.285L304.637 487.626L325.729 503.285L342.986 490.822L342.986 477.399L325.729 489.863L304.637 474.203L283.545 489.863L262.452 474.203L241.041 489.863L224.423 477.399L224.423 491.141L241.041 503.285L262.452 487.626Z"
              fill="#FFD300"
            />
            <path d="M257.338 464.937L225.06 464.937L241.039 476.761L257.338 464.937Z" fill="#FFD300" />
            <path d="M299.844 464.937L267.247 464.937L283.545 476.761L299.844 464.937Z" fill="#FFD300" />
            <path d="M342.026 464.937L309.749 464.937L325.728 476.761L342.026 464.937Z" fill="#FFD300" />
            <path
              d="M34.1666 487.521L52.9889 503.392L71.811 487.521L90.6332 503.392L106.033 490.76L106.033 477.157L90.6332 489.788L71.811 473.918L52.9889 489.788L34.1666 473.918L15.3444 489.788L0.22965 477.157L0.229651 491.084L15.3444 503.392L34.1666 487.521Z"
              fill="#FF0040"
            />
            <path d="M29.7031 464.849L0.229274 464.849L15.1121 476.94L29.7031 464.849Z" fill="#FF0040" />
            <path d="M67.4902 464.849L38.7721 464.849L53.1312 476.94L67.4902 464.849Z" fill="#FF0040" />
            <path d="M106.033 464.849L76.5594 464.849L91.1504 476.94L106.033 464.849Z" fill="#FF0040" />
            <path
              d="M472.418 452.792L520.035 452.792L520.035 445.123L472.418 445.123L472.418 452.792Z"
              fill="#FFA800"
            />
            <path d="M472.418 438.73L520.035 438.73L520.035 431.06L472.418 431.06L472.418 438.73Z" fill="#FFA800" />
            <path d="M472.418 424.669L520.035 424.669L520.035 417L472.418 417L472.418 424.669Z" fill="#FFA800" />
            <path
              d="M342.669 228.128L342.669 405.814C293.454 405.814 253.826 366.186 253.826 316.971C253.826 267.756 293.773 228.128 342.669 228.128Z"
              fill="#00BDFF"
            />
            <path
              d="M342.669 277.982L342.669 360.753C319.659 360.753 301.124 342.217 301.124 319.208C301.443 296.518 319.979 277.982 342.669 277.982Z"
              fill="#FFD300"
            />
            <path
              d="M342.23 277.982L342.23 360.753C365.24 360.753 383.775 342.217 383.775 319.208C383.456 296.518 364.92 277.982 342.23 277.982Z"
              fill="#FFD300"
            />
            <path
              d="M177.82 210.274L191.881 210.274L181.974 220.181L186.129 224.336L196.036 214.429L196.036 228.17L201.788 228.17L201.788 214.429L211.695 224.336L215.85 220.181L205.943 210.274L219.685 210.274L219.685 204.522L205.943 204.522L215.85 194.615L211.695 190.46L201.788 200.367L201.788 186.306L196.036 186.306L196.036 200.367L186.129 190.46L181.974 194.615L191.881 204.522L177.82 204.522L177.82 210.274Z"
              fill="#FFD81A"
            />
            <path
              d="M381.903 74.2183L395.964 74.2183L386.057 84.1253L390.212 88.2799L400.119 78.3729L400.119 92.1147L405.871 92.1147L405.871 78.3729L415.778 88.2799L419.933 84.1253L410.026 74.2183L423.768 74.2183L423.768 68.4659L410.026 68.4659L419.933 58.559L415.778 54.4045L405.871 64.3114L405.871 50.2499L400.119 50.2499L400.119 64.3114L390.212 54.4045L386.057 58.559L395.964 68.4659L381.903 68.4659L381.903 74.2183Z"
              fill="#FF0040"
            />
            <path
              d="M640.298 91.9445C665.744 91.9445 685.833 71.1861 685.833 46.4098C685.833 20.964 665.074 0.875 640.298 0.875C615.522 0.875 594.764 21.6336 594.764 46.4098C594.764 71.1861 615.522 91.9445 640.298 91.9445Z"
              fill="#9020C3"
            />
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
/* eslint-disable max-len */

import { AButton } from '@cwespb/synergyui';
import './payment_thanks.scss';
import MLoader from '~/components/ui/m_loader/m_loader';

export default {
  name: 'PaymentThankPage',

  components: {
    AButton,
    MLoader,
  },
  data() {
    return {
      isRegistrationCompleted: true,
      name: null,
      surname: null,
      patronymic: null,
      phone: null,
      email: null,
      linkLMS: null,
    };
  },
  async mounted() {
    if (window.localStorage.getItem('fieldsData')) {
      const fieldsData = JSON.parse(window.localStorage.getItem('fieldsData'));
      this.name = fieldsData.name;
      this.surname = fieldsData.surname;
      this.patronymic = fieldsData.patronymic;
      this.phone = fieldsData.phone;
      this.email = fieldsData.email;
      this.isRegistrationCompleted = true;
    } else this.isRegistrationCompleted = false;
    if (this.$route.query.uuid) {
      const request = async () => {
        await this.$axios
          .get(
            `https://rc.lms.synergy.ru/api/exchange/getLink?key=1029-xosJp-5820-Posm&synergyId=${this.$route.query.uuid}`,
          )
          .then(async (response) => {
            let timeout;
            if (response.data.status === 1) {
              this.linkLMS = response.data.link;
              clearTimeout(timeout);
            } else {
              timeout = setTimeout(async () => {
                await request();
              }, 3000);
            }
          });
      };

      await request();
    }
  },
  methods: {
    onButtonClickHandler() {
      window.location.href = this.isRegistrationCompleted
        ? 'https://release-v1-2640.c4.syndev.ru/'
        : `https://release-v1-2640.c4.syndev.ru/registration?name=${this.name}&surname=${this.surname}&patronymic=${this.patronymic}&email=${this.email}&phone=${this.phone}&registrationType=academic`;
    },
    toLMS() {
      if (this.linkLMS) {
        window.location.href = this.linkLMS;
      }
    },
  },
};
</script>
