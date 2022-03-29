<template>
  <section class="s-contacts-about s-margin" itemscope itemtype="https://schema.org/LocalBusiness">
    <div class="l-wide l-border-radius">
      <h2 class="s-contacts-address__title a-font_h2" v-html="title"></h2>

      <div class="s-contacts-about__items">
        <div class="s-contacts-about__item" v-for="item in requisites" :key="item.id">
          <div class="s-contacts-about__item-pretitle a-font_xxl">{{ item.pretitle }}</div>
          <div class="s-contacts-about__item-title a-font_h4">{{ item.title }}</div>
        </div>
        <meta itemprop="@id" :content="localBusinessUrl" />
        <meta itemprop="name" :content="localBusinessName" />
        <meta itemprop="description" :content="localBusinessDescription" />
        <meta itemprop="telephone" :content="localBusinessPhone" />
        <meta itemprop="telephone" :content="localBusinessPhone2" />
        <meta itemprop="email" :content="localBusinessEmail" />
        <meta itemprop="email" :content="localBusinessEmail2" />
        <meta itemprop="email" :content="localBusinessEmail3" />
        <meta itemprop="email" :content="localBusinessEmail4" />
        <meta itemprop="url" :content="localBusinessUrl" />
        <meta itemprop="image" :content="localBusinessLogo" />
        <meta itemprop="openingHours" :content="localBusinessOpeningHours" />
        <span itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
          <meta itemprop="postalCode" :content="localBusinessPostalCode" />
          <meta itemprop="addressCountry" :content="localBusinessAddressCountry" />
          <meta itemprop="addressRegion" :content="localBusinessAddressRegion" />
          <meta itemprop="addressLocality" :content="localBusinessAddressLocality" />
          <meta itemprop="streetAddress" :content="localBusinessStreetAddress" />
        </span>
        <span itemprop="geo" itemscope itemtype="https://schema.org/GeoCoordinates">
          <meta itemprop="latitude" content="57.700742" />
          <meta itemprop="longitude" content="39.761752" />
        </span>
      </div>
    </div>
  </section>
</template>

<script>
import './s_contacts_about.scss';

export default {
  name: 'SContactsAbout',

  data() {
    return {
      title: 'О компании',
      requisites: [
        { id: 1, pretitle: 'Наименование', title: 'ООО «Синерджи Юниверсити»' },
        { id: 2, pretitle: 'ИНН', title: '7743361338' },
        { id: 3, pretitle: 'ОГРН', title: '121700233002' },
      ],
      localBusinessName: 'ООО «Синерджи Юниверсити»',
      localBusinessDescription: 'ООО «Синерджи Юниверсити»',
      localBusinessPhone: '+7 (495) 800-10-01',
      localBusinessPhone2: '+7 (800) 100-00-11',
      localBusinessEmail: 'sales@synergyhub.ru',
      localBusinessEmail2: 'support@synergyhub.ru',
      localBusinessEmail3: 'press@synergyhub.ru',
      localBusinessEmail4: 'partner@synergyhub.ru',
      localBusinessUrl: 'https://synergyhub.ru/',
      localBusinessLogo: 'https://dev.sys3.ru/marketplace/uploads/synergy-desktop-3.svg',
      localBusinessOpeningHours: 'Mo-Fr 09:00-18:00',
      localBusinessPostalCode: '125315',
      localBusinessAddressCountry: 'Российская Федерация',
      localBusinessAddressRegion: 'Московская область',
      localBusinessAddressLocality: 'Москва',
      localBusinessStreetAddress: 'Ленинградский пр-кт, дом 80, корпус К. Г, этаж 6, помещение VIII, часть ком. 14',
    };
  },
};
</script>
