<template>
  <div class="catalog-page__section catalog-page__section-lp">
    <div class="catalog-presets-lp__tags">
      <template v-for="[slug, list] in Object.entries(productList)">
        <a-tag
          v-if="list.length"
          :key="slug"
          @aTagClick="selectPreset(presets.find((preset) => slug === preset.slug))"
          @aTagDelete="activePreset = null"
          :label="presets.find((preset) => slug === preset.slug).name"
          :status="
            activePreset && activePreset.name === presets.find((preset) => slug === preset.slug).name
              ? 'selected'
              : 'default'
          "
        />
      </template>
    </div>
    <div class="" :class="{ 'fixed': menuFixed, 'catalog-page-lp__select-mobile': menuFixed }">
      <a-select
        :key="selectOptionsKey"
        class="catalog-page-lp__select"
        :options="options"
        placeholder="Все направления"
        @change="changeSelectOption"
        @options-visibility-change="changeListVisibility"
      />
      <i v-if="menuFixed" class="si-filter s-header-lp__filters-icon" tabindex="0" @click="filtersMenu = true" />
    </div>

    <div class="catalog-page__section-lp__popup">
      <a-popup :visible="popup" @close="closeMainPopup" ref="popup">
        <div>
          <s-program-start :product="program" :shareIcon="false" />
          <s-program-content :slug="productSlug" />
          <s-program-teachers :slug="productSlug" />
          <s-program-skills :slug="productSlug" />
          <s-program-form
            title="Записаться на программу или получить бесплатную консультацию"
            :formProduct="popupProduct"
          />
          <a-button
            @click="scrollToForm"
            class="catalog-page__section-lp__mobile-btn catalog-page__section-lp__mobile-btn__sign"
            :class="{ invisible: !visibleBtn }"
            label="Записаться"
            bgColor="accent"
            size="large"
          />
        </div>
      </a-popup>
    </div>

    <a-popup :visible="applicationPopup" @close="applicationPopup = false">
      <div class="catalog-page__section-lp__popup">
        <section ref="form" id="form">
          <m-form
            title="Оставьте заявку и мы поможем вам подобрать программу"
            btnText="Подобрать"
            typeBtn="checkbox"
            typeCtrl="checkbox"
            :checked="formChecked"
            :submitDisabled="!validFlag"
            @submit-disabled="validFlag = $event"
            @click="sendForm"
          >
            <template v-slot:inputs>
              <a-input
                class="m-form__input"
                :class="{ 'error-name': !nameErrorFlag }"
                @input="validFormData"
                v-model="fieldsData.name"
                placeholder="Имя"
              />
              <vue-tel-input
                class="m-form__input"
                :class="{ error: !phoneErrorFlag }"
                v-bind="vueTelOpts"
                type="phone"
                placeholder="Телефон"
                v-model="fieldsData.phone"
                @input="validatePhone"
              >
              </vue-tel-input>
              <a-input
                class="m-form__input"
                :class="{ 'error-mail': !emailErrorFlag }"
                @input="validFormData"
                v-model="fieldsData.email"
                placeholder="Почта"
              />
            </template>
          </m-form>
        </section>
      </div>
    </a-popup>

    <a-popup :visible="signUpPopup" @close="signUpPopup = false">
      <div class="catalog-page__section-lp__popup">
        <section ref="form" id="form">
          <m-form
            :title="`Оставить заявку на программу: ${selectedProductTitle}`"
            btnText="Оставить заявку"
            typeBtn="checkbox"
            typeCtrl="checkbox"
            :checked="formChecked"
            :submitDisabled="!validFlag"
            @submit-disabled="validFlag = $event"
            @click="sendForm"
          >
            <template v-slot:inputs>
              <a-input
                class="m-form__input"
                :class="{ 'error-name': !nameErrorFlag }"
                @input="validFormData"
                v-model="fieldsData.name"
                placeholder="Имя"
              />
              <vue-tel-input
                class="m-form__input"
                :class="{ error: !phoneErrorFlag }"
                v-bind="vueTelOpts"
                type="phone"
                placeholder="Телефон"
                v-model="fieldsData.phone"
                @input="validatePhone"
              >
              </vue-tel-input>
              <a-input
                class="m-form__input"
                :class="{ 'error-mail': !emailErrorFlag }"
                @input="validFormData"
                v-model="fieldsData.email"
                placeholder="Почта"
              />
            </template>
          </m-form>
        </section>
      </div>
    </a-popup>

    <a-button
      v-if="mainBtnVisible"
      @click="applicationPopup = true"
      class="catalog-page__section-lp__mobile-btn"
      label="Подобрать программу"
      bgColor="accent"
      size="large"
    />

    <div v-if="filtersMenu">
      <div class="catalog-page__menu" v-if="filterListData">
        <div v-show="!isFilterExpanded">
          <a-title
            :title="`Фильтры (${totalPickedFilters})`"
            :showIcon="false"
            @clickClose="filtersMenuClose"
            class="catalog-page__menu-header"
          />
        </div>
        <div class="catalog-page__menu-contents" ref="menuContent">
          <div v-show="isFilterExpanded" :key="componentExpandedMenuKey">
            <a-title
              :title="filtersTitle[currentExpandedFilter]"
              :showIcon="true"
              @clickClose="filtersMenuClose"
              @click="isFilterExpanded = false"
              class="catalog-page__menu-header"
            />
            <m-filter
              title=""
              passedBtnText=""
              :hasSearch="filterListData[currentExpandedFilter].search"
              :items="filterListData[currentExpandedFilter]"
              :visibleCount="1000"
              class="catalog-page__menu-filter_mfilter"
              @item-click="selectFilter(currentExpandedFilter, ...arguments)"
            />
          </div>

          <div
            v-show="!isFilterExpanded"
            class="catalog-page__menu-filters"
            v-for="filters in Object.entries(filterListData)"
            :key="filters[0]"
          >
            <div
              class="catalog-page__menu-filter"
              :class="{ 'catalog-page__menu-filter-expanded': filters[1].length > 7 }"
              @click="filters[1].length > 7 ? expandedFilterClickHandler(filters[0]) : null"
            >
              <h3 class="a-font_h6">{{ filtersTitle[filters[0]] }}</h3>
              <i v-if="filters[1].length > 7" class="si-chevron-right catalog-page__menu-filter-icon" />
            </div>
            <div v-if="filters[1].length < 7" class="catalog-page__menu-filter_controls">
              <a-control
                v-for="filter in filters[1]"
                :title="filter.abbreviation_name ? filter.abbreviation_name : filter.name"
                :key="`${filter.name}${filter.id}`"
                :checked="filter.isChecked"
                :labelText="filter.abbreviation_name ? filter.name : filter.abbreviation_name"
                labelPosition="left"
                class="catalog-page__menu-filter_control"
                typeBtn="checkbox"
                typeCtrl="checkbox"
                @input="selectControlFilter(filters[0], filter, ...arguments)"
              />
            </div>
          </div>
          <div v-show="!isFilterExpanded">
            <a-control
              v-for="[key, filters] in Object.entries(filterCheckboxData)"
              class="catalog-page__menu-filter_control catalog-page__menu-filter_switch"
              :key="key"
              :title="filters.name"
              typeBtn="checkbox"
              typeCtrl="switch"
              :checked="filters.isChecked"
              labelPosition="left"
              @input="switchClick(filters, ...arguments)"
            />
            <div class="catalog-page__menu-button">
              <a-button label="Показать предложения" bgColor="accent" @click="filtersMenuClose" />
            </div>
          </div>
        </div>
      </div>
      <div class="catalog-page__menu-backdrop" @click="filtersMenuClose" />
    </div>
    <div class="catalog-page__content">
      <div class="catalog-filter__wrapper" :key="componentFilterKey">
        <m-filter
          v-for="[key, filters] in Object.entries(filterListData)"
          class="catalog-filter__filter"
          :hasSearch="key === 'city_ids'"
          :key="key"
          :title="filtersTitle[key]"
          :passedBtnText="filtersText[key]"
          :items="filters"
          @item-click="selectFilter(key, ...arguments)"
        />
        <a-control
          v-for="[key, filters] in Object.entries(filterCheckboxData)"
          class="catalog-filter__checkbox"
          :key="key"
          :title="filters.name"
          :checked="filters.isChecked"
          typeBtn="checkbox"
          typeCtrl="switch"
          labelPosition="left"
          @input="switchClick(filters, ...arguments)"
        />
      </div>
      <div
        v-if="!activePreset"
        class="catalog-product-list-wrapper catalog-product-list-wrapper-lp"
        :key="componentProductsKey"
      >
        <template>
          <i
            id="filtersIcon"
            class="si-filter a-font_button catalog-page__filters-icon catalog-page__filters-icon-lp"
            tabindex="0"
            @click="filtersIconClickHandler"
          >
            <span class="a-font_button">Фильтры ({{ totalPickedFilters }})</span>
          </i>
        </template>
        <template v-for="preset in presets">
          <div
            v-if="productList[preset.slug] && productList[preset.slug].length"
            class="catalog-product-list"
            :key="preset.id"
          >
            <h2 class="a-font_h2 catalog-product-list__title">
              {{ preset.name }}
              <sup class="catalog-page__header-total a-font_L"> {{ totalProducts[preset.slug] }} программ</sup>
            </h2>
            <div class="catalog-product-list__wrapper" v-if="productList[preset.slug]">
              <div
                class="catalog-product-list__item-wrapper-section catalog-product-list__item"
                v-for="product in productList[preset.slug]"
                :key="product.id"
                @click="openPopupHandler(product)"
              >
                <m-card
                  type="program"
                  :btns="btns"
                  :description="product.included.levels[0].name"
                  :title="product.name"
                  :verticalImgSrc="`${baseURL}/${product.preview_image}`"
                  :bottomText="product.included.organization.abbreviation_name"
                  :iconSrc="`${baseURL}${product.included.organization.logo}`"
                  @btn-click="onBtnClickHandler(product, ...arguments)"
                  @organization-click="onOrganizationClick(product)"
                />
              </div>
            </div>
            <a-button
              class="catalog-product-list__button"
              v-if="totalProducts[preset.slug] > 10 && productsPerPage[preset.slug] < totalProducts[preset.slug]"
              bgColor="ghost-primary"
              :label="`Показать еще ${
                totalProducts[preset.slug] - productsPerPage[preset.slug] < 10
                  ? totalProducts[preset.slug] - productsPerPage[preset.slug]
                  : 10
              } программ из ${totalProducts[preset.slug] - productsPerPage[preset.slug]}`"
              size="large"
              @click="onMoreProductsClickHandler(preset)"
            />
          </div>
        </template>
      </div>

      <div v-if="activePreset" class="catalog-product-list" :key="componentProductsKey">
        <template>
          <i
            id="filtersIcon"
            class="si-filter a-font_button catalog-page__filters-icon catalog-page__filters-icon-lp"
            tabindex="0"
            @click="filtersIconClickHandler"
          >
            <span class="a-font_button">Фильтры ({{ totalPickedFilters }})</span>
          </i>
        </template>
        <h2 class="a-font_h2 catalog-product-list__title">
          {{ activePreset.name }}
          <sup class="catalog-page__header-total a-font_L"> {{ totalProducts[activePreset.slug] }} программ</sup>
        </h2>
        <div
          class="catalog-product-list__wrapper catalog-product-list-wrapper-lp"
          v-if="productList[activePreset.slug]"
        >
          <h3 class="catalog-product-list__wrapper-sorry" v-if="!productList[activePreset.slug].length">
            К сожалению, ничего нет
          </h3>
          <div
            class="catalog-product-list__item-wrapper-section catalog-product-list__item"
            v-for="product in productList[activePreset.slug]"
            :key="product.id"
            @click="openPopupHandler(product)"
          >
            <m-card
              type="program"
              :btns="btns"
              :description="product.included.levels[0].name"
              :title="product.name"
              :verticalImgSrc="`${baseURL}/${product.preview_image}`"
              :bottomText="product.included.organization.abbreviation_name"
              :iconSrc="`${baseURL}${product.included.organization.logo}`"
              @btn-click="onBtnClickHandler(product, ...arguments)"
              @organization-click="onOrganizationClick(product)"
            />
          </div>
        </div>
        <a-button
          class="catalog-product-list__button"
          v-if="
            totalProducts[activePreset.slug] > 10 &&
            productsPerPage[activePreset.slug] < totalProducts[activePreset.slug]
          "
          bgColor="ghost-primary"
          :label="`Показать еще ${
            totalProducts[activePreset.slug] - productsPerPage[activePreset.slug] < 10
              ? totalProducts[activePreset.slug] - productsPerPage[activePreset.slug]
              : 10
          } программ из ${totalProducts[activePreset.slug] - productsPerPage[activePreset.slug]}`"
          size="large"
          @click="onMoreProductsClickHandler(activePreset)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { VueTelInput } from 'vue-tel-input';
import { AButton, AControl, AInput, APopup, ASelect, ATag, ATitle, MCard, MFilter } from '@cwespb/synergyui';
import getProductsList from '~/api/products_list';
import '../../s_catalog/s_catalog.scss';
import '../../s_catalog_filter/s_catalog_filter.scss';
import '../../s_catalog_menu/s_catalog_menu.scss';
import '../../s_catalog_presets/s_catalog_presets.scss';
import '../../s_catalog_product_list/s_catalog_product_list.scss';
import '../../s_catalog_section/s_catalog_section.scss';
import '../../s_catalog_tags/s_catalog_tags.scss';
import './s_catalog_landing.scss';
import SProgramStart from '~/components/product/s_program_start/s_program_start';
import SProgramContent from '~/components/product/s_program_content/s_program_content';
import SProgramTeachers from '~/components/product/s_program_teachers/s_program_teachers';
import SProgramSkills from '~/components/product/s_program_skills/s_program_skills';
import SProgramForm from '~/components/s_program_form/s_program_form';
import MForm from '@/components/_ui/m_form/m_form';
import getProductInfo from '~/api/productInfo';

export default {
  name: 'SCatalogSection',

  props: ['filters', 'menu', 'menuFixed'],

  components: {
    SProgramStart,
    SProgramContent,
    SProgramTeachers,
    SProgramSkills,
    SProgramForm,
    ATag,
    ASelect,
    ATitle,
    AControl,
    AInput,
    AButton,
    MCard,
    MForm,
    MFilter,
    APopup,
    VueTelInput,
  },

  data() {
    return {
      visibleBtn: true,
      selectOptionsKey: 123,

      popup: false,
      popupProduct: {},

      applicationPopup: false,
      signUpPopup: false,
      selectedProductTitle: null,
      formChecked: true,
      validFlag: true,
      validName: false,
      nameErrorFlag: true,
      emailErrorFlag: true,
      phoneErrorFlag: true,
      blockYScroll: false,

      maxPhoneLength: 16,
      vueTelOpts: {
        mode: 'international',
        preferredCountries: ['RU', 'US'],
        wrapperClasses: '',
        inputClasses: '',
        autoFormat: true,
        defaultCountry: 'RU',
        inputOptions: {
          inputClasses: 'a-input a-input--large a-input--base',
          showDialCode: false,
          placeholder: 'Телефон',
          maxlength: 14,
        },
      },
      fieldsData: {
        name: '',
        phone: '',
        email: '',
      },
      totalPickedFilters: 0,

      btns: [
        {
          bgColor: 'ghost-accept',
          label: 'Записаться',
        },
        {
          bgColor: 'none',
          label: 'Подробнее',
        },
      ],

      options: [],

      selectedOption: null,
      mainBtnVisible: true,
      validPhone: false,
      currentProduct: null,
      methodsStart: [{}],
      methodsContent: [{}],
      methodsSkills: [{}],
      productSlug: null,
      baseURL: process.env.NUXT_ENV_S3BACKET,
      totalProducts: {},
      productList: {},
      productsPerPage: {},
      filterListData: {},
      filterCheckboxData: {},
      filtersIdsData: null,
      filtersCheckboxDataRequest: null,
      page: {},
      componentProductsKey: 10,
      componentFilterKey: 100,
      componentMenuKey: 1000,

      selectedFilters: [],

      filtersText: {
        direction_ids: 'Все направления',
        format_ids: 'Все форматы',
        level_ids: 'Все уровни',
        city_ids: 'Все города',
        organization_ids: 'Все заведения',
      },
      filtersTitle: {
        direction_ids: 'Направления',
        format_ids: 'Форматы',
        level_ids: 'Уровень образования',
        city_ids: 'Город',
        organization_ids: 'Учебные заведения',
      },
      switchControl: {
        is_employment: false,
        is_installment: false,
      },

      presets: [],
      activePreset: null,

      isFilterExpanded: false,
      currentExpandedFilter: 'direction_ids',
      componentExpandedMenuKey: 3000,
      program: null,
    };
  },

  computed: {
    filtersMenu: {
      get() {
        return this.menu;
      },

      set(state) {
        this.$emit('menu-change', state);
      },
    },
  },

  watch: {
    blockYScroll() {
      this.hideYScroll();
    },

    signUpPopup() {
      this.hideYScroll();
    },

    filtersMenu() {
      this.hideYScroll();
    },

    popup() {
      this.hideYScroll();
    },

    applicationPopup() {
      this.hideYScroll();
    },

    filtersIdsData: {
      deep: true,
      handler(newVal, oldVal) {
        if (oldVal !== null) {
          this.componentProductsKey += 3;
          this.activePreset = null;
          this.fetchProductsList();
          // eslint-disable-next-line max-len
          this.totalPickedFilters = Object.values(this.filtersIdsData).reduce(
            (prevValue, currentValue) => prevValue + currentValue.length,
            0,
          );
        }
      },
    },

    filtersCheckboxDataRequest: {
      deep: true,
      handler(newVal, oldVal) {
        if (oldVal !== null) {
          this.componentProductsKey += 3;
          this.fetchProductsList();
        }
      },
    },
  },

  methods: {
    onBtnClickHandler(product, btn) {
      if (btn === 'Записаться') {
        this.selectedProductTitle = product.name;
        this.signUpPopup = true;
        this.popupProduct = product;
      } else {
        this.openPopupHandler(product);
      }
    },

    scrollToForm() {
      const formBlock = document.getElementById('form');
      formBlock.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    },

    closeMainPopup() {
      this.popup = false;
      this.mainBtnVisible = true;
    },

    sendForm() {
      if (this.popupProduct) {
        this.fieldsData.comments = `Клик из формы попапа продукта: ${this.popupProduct.name}`;
      }

      if (this.checkedValidateError()) {
        this.$lander
          .send(
            this.fieldsData,
            {},
            this.$route.name === 'edu-platform-slug' || this.$route.name === 'edu-platform'
              ? this.$route.path
              : undefined,
          )
          .then(() => {});
      }
    },
    handlerSave() {
      const dataToSend = { ...this.fieldsData };
      delete dataToSend.comments;
      this.$lander.storage.save('programform', dataToSend);
    },
    validatePhone(phone, { valid, number }) {
      if (phone) {
        const telOpts = this.vueTelOpts;
        const inputOpts = telOpts.inputOptions;
        const isLocalCode = phone[0] === '8';

        inputOpts.maxlength = this.maxPhoneLength;
        telOpts.autoFormat = !isLocalCode;

        this.validPhone = valid && isLocalCode ? phone.length === 11 : valid;

        if (valid) {
          telOpts.mode = isLocalCode ? 'auto' : 'international';
          inputOpts.maxlength = isLocalCode ? 11 : number.length;
        } else {
          inputOpts.maxlength = 16;
        }

        this.validFormData();
      }
    },
    validFormData() {
      this.handlerSave();
    },

    checkedValidateError() {
      this.nameErrorFlag = /^([A-ZА-ЯЁ][-,a-z, a-яё. ']+[ ]*)+$/i.test(this.fieldsData.name);
      this.emailErrorFlag = this.$lander.valid([{ value: this.fieldsData.email, type: 'email' }]);
      this.phoneErrorFlag = this.validPhone === true && this.fieldsData.phone !== '';
      return this.nameErrorFlag && this.emailErrorFlag && this.validPhone;
    },

    openPopupHandler(product) {
      this.mainBtnVisible = false;
      this.popupProduct = product;
      this.productSlug = product.slug;
      this.methodsStart[0] = {
        data: {
          filter: {
            slug: product.slug,
          },

          include: ['formats', 'levels', 'directions', 'organization', 'organization.city', 'persons'],
        },
      };

      this.methodsContent[0] = {
        data: {
          filter: {
            entity_id: product.id,
            entity_type: 'product',
            section_id: 12,
          },
        },
      };

      this.methodsSkills[0] = {
        data: {
          filter: {
            entity_id: product.id,
            entity_type: 'product',
            section_id: 10,
          },
        },
      };

      this.popup = true;
      this.$nextTick(() => {
        const popup = document.querySelector('.a-popup');
        const formElement = document.querySelector('#form');
        popup.addEventListener('scroll', () => {
          if (popup.scrollTop >= popup.scrollHeight - (formElement.offsetHeight + popup.offsetHeight)) {
            this.visibleBtn = false;
          } else {
            this.visibleBtn = true;
          }
        });
      });

      this.getProductData(this.productSlug);
    },

    onOrganizationClick(product) {
      this.openPopupHandler(product);
    },

    expandedFilterClickHandler(filterKey) {
      this.$refs.menuContent.scrollIntoView(true);
      this.componentExpandedMenuKey += 1;
      this.currentExpandedFilter = filterKey;
      this.isFilterExpanded = true;
    },

    hideYScroll() {
      const htmlWrapper = document.querySelector('html');
      const bodyWrapper = document.querySelector('body');

      if (this.filtersMenu === true || this.popup || this.applicationPopup || this.signUpPopup || this.blockYScroll) {
        htmlWrapper.style.overflow = 'hidden';
        bodyWrapper.style.overflow = 'hidden';
      } else {
        htmlWrapper.style.overflow = 'initial';
        bodyWrapper.style.overflow = 'initial';
      }
    },

    filtersMenuClose() {
      this.filtersMenu = false;
      this.isFilterExpanded = false;
    },

    onMoreProductsClickHandler(preset) {
      this.productsPerPage[preset.slug] = this.productsPerPage[preset.slug]
        ? this.productsPerPage[preset.slug] + 10
        : 20;

      this.fetchProductsList(preset);
    },

    selectPreset(preset) {
      this.activePreset = preset;
    },

    changeSelectOption(option) {
      this.selectedOption = option;

      this.filterListData.direction_ids.forEach((filter) => {
        this.$set(filter, 'isChecked', false);
      });
      const found = this.filterListData.direction_ids.find((filter) => filter.slug === option);
      this.$set(found, 'isChecked', true);
      this.filtersIdsData.direction_ids = [found.id];

      this.fetchProductsList();
    },

    async fetchFilterData() {
      Object.entries(this.filters).forEach(([key, filterData]) => {
        if (key === 'level') {
          this.presets = filterData;
          this.presets.forEach((preset) => {
            this.productsPerPage[preset.slug] = 10;
          });
        } else {
          filterData.forEach((filter) => {
            if (filter.type === 'list') {
              if (this.filterListData[`${key}_ids`] === undefined) {
                this.filterListData[`${key}_ids`] = [filter];
              } else {
                this.filterListData[`${key}_ids`] = [...this.filterListData[`${key}_ids`], filter];
              }
            }

            if (filter.type === 'checkbox') {
              if (this.filterCheckboxData[`${key}_ids`] === undefined) {
                this.filterCheckboxData[`${key}_ids`] = [filter];
              } else {
                this.filterCheckboxData[`${key}_ids`] = [...this.filterCheckboxData[`${key}_ids`], filter];
              }
            }
          });
        }
      });

      this.filterListData.direction_ids.forEach(({ name, slug }) => {
        this.options.push({ label: name, value: slug });
      });
    },

    async fetchProductsList(presetName) {
      if (presetName) {
        const expandedMoreMethod = {
          filter: { published: true },
        };

        expandedMoreMethod.include = ['organization', 'levels', 'directions'];

        if (this.selectedOption === 'all') {
          expandedMoreMethod.filter.direction_ids = this.filterListData.direction_ids.map((filter) => filter.id);
        }

        if (this.filtersIdsData) {
          // Логика парсинга выбранных фильтров на бэк, для получения отфильрованный товаров
          Object.entries(this.filtersIdsData).forEach((filterData) => {
            if (filterData[1].length === 0) {
              expandedMoreMethod.filter[filterData[0]] = this.filterListData[filterData[0]]?.map((filter) => filter.id);
            } else {
              const [key, value] = filterData;
              expandedMoreMethod.filter[key] = value;
            }
          });
        }

        expandedMoreMethod.filter.level_ids = [presetName.id];

        // Логика парсинга чекбоксов, для получения отфильрованный товаров
        if (this.filtersCheckboxDataRequest) {
          Object.entries(this.filtersCheckboxDataRequest).forEach((checkboxData) => {
            const [key, value] = checkboxData;
            if (value) {
              expandedMoreMethod.filter[key] = value;
            } else {
              delete expandedMoreMethod.filter[[key]];
            }
          });
        }

        expandedMoreMethod.pagination = {
          page: 1,
          page_size: this.productsPerPage[presetName.slug] === undefined ? 10 : this.productsPerPage[presetName.slug],
        };

        // eslint-disable-next-line no-await-in-loop
        const response = await getProductsList(expandedMoreMethod);
        this.totalProducts[presetName.slug] = response.count;
        this.productList[presetName.slug] = response.data;
        this.componentProductsKey += 3;
      } else {
        // eslint-disable-next-line no-restricted-syntax
        for (const preset of this.presets) {
          const expandedMethod = {
            filter: { published: true },
          };

          expandedMethod.include = ['organization', 'levels', 'directions'];

          if (this.selectedOption === 'all') {
            expandedMethod.filter.direction_ids = this.filterListData.direction_ids.map((filter) => filter.id);
          }

          if (this.filtersIdsData) {
            // Логика парсинга выбранных фильтров на бэк, для получения отфильрованный товаров
            Object.entries(this.filtersIdsData).forEach((filterData) => {
              if (filterData[1].length === 0) {
                expandedMethod.filter[filterData[0]] = this.filterListData[filterData[0]]?.map((filter) => filter.id);
              } else {
                const [key, value] = filterData;
                expandedMethod.filter[key] = value;
              }
            });
          }

          expandedMethod.filter.level_ids = [preset.id];

          if (this.filtersCheckboxDataRequest) {
            // Логика парсинга чекбоксов, для получения отфильрованный товаров
            Object.entries(this.filtersCheckboxDataRequest).forEach((checkboxData) => {
              const [key, value] = checkboxData;
              if (value) {
                expandedMethod.filter[key] = value;
              } else {
                delete expandedMethod.filter[[key]];
              }
            });
          }

          expandedMethod.pagination = {
            page: 1,
            page_size: this.productsPerPage[preset.slug] === undefined ? 10 : this.productsPerPage[preset.slug],
          };

          // eslint-disable-next-line no-await-in-loop
          const response = await getProductsList(expandedMethod);
          this.totalProducts[preset.slug] = response.count;
          this.productList[preset.slug] = response.data;

          this.componentProductsKey += 3;
        }
      }
    },

    switchClick(item, isChecked) {
      const selectedSwitch = { ...item, isChecked };
      this.filterCheckboxData[selectedSwitch.filter_by].isChecked = selectedSwitch.isChecked;
      this.$set(this.filtersCheckboxDataRequest, selectedSwitch.filter_by, selectedSwitch.isChecked);
    },

    selectFilter(key, item) {
      const selectedItem = { ...item, key };

      if (selectedItem.isChecked) {
        this.selectedFilters.push(selectedItem);
        this.filtersIdsData[key].push(selectedItem.id);
      } else {
        this.selectedFilters = this.selectedFilters.filter((filter) => filter.name !== item.name);
        this.filtersIdsData[key] = this.filtersIdsData[key].filter((id) => Number(id) !== item.id);
      }

      this.page = {};
      this.componentProductsKey += 3;
    },

    selectControlFilter(key, item, isChecked) {
      const selectedItem = { ...item, key, isChecked };

      if (selectedItem.isChecked) {
        this.selectedFilters.push(selectedItem);
        this.filtersIdsData[key].push(selectedItem.id);
        const found = this.filterListData[selectedItem.key].find((value) => value.name === selectedItem.name);
        this.$set(found, 'isChecked', true);
      } else {
        this.selectedFilters = this.selectedFilters.filter((filter) => filter.name !== item.name);
        this.filtersIdsData[key] = this.filtersIdsData[key].filter((id) => Number(id) !== item.id);
        const found = this.filterListData[selectedItem.key].find((value) => value.name === selectedItem.name);
        this.$set(found, 'isChecked', false);
      }

      this.page = {};
      this.componentProductsKey += 3;
    },

    menuToggle(value) {
      this.filtersMenu = value;
    },

    changeListVisibility(visibility) {
      this.blockYScroll = visibility;
    },

    clearAllFilters() {
      this.selectedFilters.forEach((selected) => {
        const found = this.filterListData[selected.key].find((value) => value.name === selected.name);
        this.$set(found, 'isChecked', false);
      });
      this.$set(this.filtersCheckboxDataRequest, 'is_employment', false);
      this.$set(this.filtersCheckboxDataRequest, 'is_installment', false);
      this.selectedFilters = [];
      Object.values(this.filtersIdsData).forEach((filterIds) => filterIds.splice(0, filterIds.length));
      Object.entries(this.filterCheckboxData).forEach((checkboxData) => {
        this.filterCheckboxData[checkboxData[0]].isChecked = false;
      });

      this.page = {};
      this.componentProductsKey += 3;
      this.componentFilterKey += 1;
      this.componentMenuKey += 1;
    },

    deleteTag(tag) {
      this.selectedFilters = this.selectedFilters.filter((filter) => filter.name !== tag.name);
      this.filtersIdsData[tag.key] = this.filtersIdsData[tag.key].filter((id) => Number(id) !== tag.id);
      const found = this.filterListData[tag.key].find((value) => value.name === tag.name);
      this.$set(found, 'isChecked', false);

      this.componentFilterKey += 1;
    },

    filtersIconClickHandler() {
      this.filtersMenu = true;
    },

    async getProductData(productSlug) {
      const requestData = { slug: productSlug };
      const resp = await getProductInfo(requestData);
      const { id, relationships, attributes, type } = resp.data[0];
      const [level] = relationships?.levels?.data;
      const formats = relationships?.formats?.data;
      const [offers] = relationships?.offers?.data;
      const organization = relationships?.organization?.data;
      const seoTag = relationships?.seoTag?.data;
      const category = relationships?.category?.data;
      this.program = {
        id,
        type,
        ...attributes,
        levels: this.getRelationDetailByIdAndType(level, resp.included),
        formats: this.getRelationListByIdAndType(formats, resp.included),
        organization: this.getRelationDetailByIdAndType(organization, resp.included),
        seoTag: this.getRelationDetailByIdAndType(seoTag, resp.included),
        category: this.getRelationDetailByIdAndType(category, resp.included),
        offers: this.getRelationDetailByIdAndType(offers, resp.included),
      };
    },
    getRelationDetailByIdAndType(searchParams, included) {
      const foundType = included.find(({ id, type }) => searchParams?.id === id && searchParams?.type === type);
      if (foundType) {
        const { id, attributes, type } = foundType;
        return { id, ...attributes, type };
      }
      return null;
    },
    getRelationListByIdAndType(searchList, included) {
      const results = [];
      searchList.forEach((searchParam) => {
        const foundType = included.find(({ id, type }) => searchParam?.id === id && searchParam?.type === type);
        if (foundType) {
          const { id, attributes, type } = foundType;
          results.push({ id, ...attributes, type });
        }
      });
      return results;
    },
  },

  mounted() {
    this.$emit('form-ref', this.$refs.form);

    this.filtersIdsData = {
      direction_ids: [],
      format_ids: [],
      level_ids: [],
      city_ids: [],
      organization_ids: [],
    };

    this.filtersCheckboxDataRequest = {};

    this.fetchFilterData();
    this.fetchProductsList();

    const loadDataForm = this.$lander.storage.load('programform');
    if (loadDataForm) this.fieldsData = loadDataForm;
  },
};
</script>
