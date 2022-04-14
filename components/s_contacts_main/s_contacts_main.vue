<template>
  <section class="s-contacts-main s-margin">
    <div class="l-wide l-border-radius">
      <h1 class="s-contacts-main__title a-font_h2" v-html="title"></h1>

      <div class="s-contacts-main__subtitle a-font_xxl" v-html="subtitle"></div>
      <div class="s-contacts-main__phones">
        <template v-for="phone in phones">
          <a
            v-if="phone.number"
            :href="`tel:${phone.number.replace(/[^+\d]/g, '')}`"
            class="s-contacts-main__phone a-font_h4"
            :key="phone.id"
          >
            {{ phone.number }}
          </a>
        </template>
      </div>

      <div class="s-contacts-main__emails">
        <div class="s-contacts-main__email" v-for="item in emails" :key="item.id">
          <div class="s-contacts-main__email-title a-font_xxl" v-html="item.title"></div>
          <a :href="`mailto:${item.email}`" class="s-contacts-main__email-adress a-font_xxl">{{ item.email }}</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import './s_contacts_main.scss';

export default {
  name: 'SContactsMain',

  data() {
    return {
      title: 'Контакты',
      subtitle: 'Свяжитесь с нами',
      phones: [
        { id: 1, number: '+7 (495) 800-10-01' },
        { id: 2, number: '+7 (800) 100-00-11' },
      ],
      emails: [
        { id: 1, title: 'Отдел продаж', email: 'sales@synergyhub.ru' },
        { id: 2, title: 'Служба поддержки', email: 'support@synergyhub.ru' },
        { id: 3, title: 'Пресс-служба', email: 'press@synergyhub.ru' },
        { id: 4, title: 'Партнёрам', email: 'partner@synergyhub.ru' },
      ],
    };
  },

  components: {},
};
</script>
