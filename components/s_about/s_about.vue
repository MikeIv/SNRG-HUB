<template>
  <section class="s-about">
    <div class="l-wide">
      <div class="s-about__box">
        <div class="s-about__wrapper">
          <div class="s-about__info">
            <div class="s-about__title">{{ title }}</div>
            <div class="s-about__tabs">
              <div
                class="s-about__tabs-item"
                v-for="(tab, index) in tabs"
                :key="index"
                :class="{ 'is-active': show == index }"
                @click.prevent="
                  show = index;
                  changeContent();
                "
              >
                {{ tab.label }}
              </div>
            </div>
          </div>
          <div class="s-about__content" v-if="isActive">
            <div
              v-for="(tab, index) in tabs"
              :key="index"
              class="s-about__tabs-item__content"
              :class="{ 'is-active': show == index }"
            >
              <div class="s-about__tabs__swiper">
                <swiper ref="awesomeSwiperTabsContent" :options="swiperOptionTabsContent">
                  <swiper-slide v-for="(item, index) in tab.items_1" :key="index" class="s-about__tabs-content__slides">
                    <div class="s-about__tabs-content__slide">
                      <div class="s-about__tabs-content__top">
                        <div class="s-about__tabs-content__img"><img :src="item.image" alt="" /></div>
                        <div class="s-about__tabs-content__info">
                          <div class="s-about__tabs-content__info-title">{{ item.name }}</div>
                          <div class="s-about__tabs-content__info-subtitle">{{ item.student }}</div>
                        </div>
                      </div>
                      <div class="s-about__tabs-content__text">
                        {{ item.text }}
                      </div>
                      <div class="s-about__tabs-content__stars">
                        {{ item.stars }}
                      </div>
                    </div>
                  </swiper-slide>
                </swiper>
                <swiper ref="awesomeSwiperTabsContent2" :options="swiperOptionTabsContent2">
                  <swiper-slide v-for="(item, index) in tab.items_2" :key="index" class="s-about__tabs-content__slides">
                    <div class="s-about__tabs-content__slide">
                      <div class="s-about__tabs-content__top">
                        <div class="s-about__tabs-content__img"><img :src="item.image" alt="" /></div>
                        <div class="s-about__tabs-content__info">
                          <div class="s-about__tabs-content__info-title">{{ item.name }}</div>
                          <div class="s-about__tabs-content__info-subtitle">{{ item.student }}</div>
                        </div>
                      </div>
                      <div class="s-about__tabs-content__text">
                        {{ item.text }}
                      </div>
                      <div class="s-about__tabs-content__stars">
                        {{ item.stars }}
                      </div>
                    </div>
                  </swiper-slide>
                </swiper>
              </div>
            </div>
          </div>

          <div class="s-about__content--universities" v-else>
            <div
              v-for="(tab, index) in tabs"
              :key="index"
              class="s-about__tabs-item__content"
              :class="{ 'is-active': show == index }"
            >
              <div class="s-about__tabs__swiper">
                <swiper ref="awesomeSwiperTabsContent" :options="swiperOptionTabsContent">
                  <swiper-slide v-for="(item, index) in tab.items_3" :key="index" class="s-about__tabs-content__slides">
                    <div class="s-about__tabs-content__slide">
                      <div class="s-about__tabs-content__top">
                        <div class="s-about__tabs-content__img"><img :src="item.image" alt="" /></div>
                        <div class="s-about__tabs-content__info">
                          <div class="s-about__tabs-content__info-title">{{ item.name }}</div>
                        </div>
                      </div>
                      <div class="s-about__tabs-content__text">
                        {{ item.text }}
                      </div>
                      <div class="s-about__tabs-content__stars">
                        {{ item.stars }}
                      </div>
                    </div>
                  </swiper-slide>
                </swiper>
                <swiper ref="awesomeSwiperTabsContent2" :options="swiperOptionTabsContent2">
                  <swiper-slide v-for="(item, index) in tab.items_4" :key="index" class="s-about__tabs-content__slides">
                    <div class="s-about__tabs-content__slide">
                      <div class="s-about__tabs-content__top">
                        <div class="s-about__tabs-content__img"><img :src="item.image" alt="" /></div>
                        <div class="s-about__tabs-content__info">
                          <div class="s-about__tabs-content__info-title">{{ item.name }}</div>
                        </div>
                      </div>
                      <div class="s-about__tabs-content__text">
                        {{ item.text }}
                      </div>
                      <div class="s-about__tabs-content__stars">
                        {{ item.stars }}
                      </div>
                    </div>
                  </swiper-slide>
                </swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import './s_about.scss';

export default {
  name: 'SAbout',

  components: {
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      title: 'Что говорят о нас',
      isActive: true,
      show: 0,
      tabs: [
        {
          label: 'студенты',
          items_1: [
            {
              name: 'Екатерина Васильева',
              student: 'Студент программы “Ландшафтная архитектура”',
              image: 'about/students/vasilieva.jpg',
              stars: '4.5/5',
              text: 'Отличные преподаватели! Находят индивидуальный подход к каждому студенту.',
            },
            {
              name: 'Наталья Лисицина',
              student: 'Выпускник программы “Маркетинг”',
              image: 'about/students/lisitsina.jpg',
              stars: '4.5/5',
              text: 'Сразу после выпуска смогла устроиться в крупную компанию.',
            },
            {
              name: 'Никита Краснов',
              student: 'Выпускник программы “Вычислительные машины, комплексы, системы и сети”',
              image: 'about/students/krasnov.jpg',
              stars: '4.5/5',
              text: 'На учебе были преподаватели, которые делились реальным опытом работы.',
            },
            {
              name: 'Алина Сычева',
              student: 'Выпускник программы “Финансы и кредит”',
              image: 'about/students/sycheva.jpg',
              stars: '4.5/5',
              // eslint-disable-next-line max-len
              text: 'Будущую профессию навязали родители, думала будет сложно, но преподаватели смогли заинтересовать, сейчас работаю по специальности.',
            },
            {
              name: 'Вячеслав Ермолаев',
              student: 'Выпускник программы “Управление рисками”',
              image: 'about/students/ermolaev.jpg',
              stars: '4.5/5',
              // eslint-disable-next-line max-len
              text: 'Уже со второго курса начал проходить стажировки, очень пригодились пройденные практические задания.',
            },
            {
              name: 'Иван Козлов',
              student: 'Студент программы “Бизнес-аналитика”',
              image: 'about/students/kozlov.jpg',
              stars: '4.5/5',
              text: 'Порадовал выбор профильных дисциплин.',
            },
            {
              name: 'Надежда Исаева',
              student: 'Студент программы “Психология и социальная педагогика”',
              image: 'about/students/isaeva.jpg',
              stars: '4.5/5',
              text: 'Заканчиваю в следующем году, уже знаю куда пойду работать.',
            },
            {
              name: 'Александр Бутиков',
              student: 'Студент программы “Энергообеспечение предприятий”',
              image: 'about/students/butikov.jpg',
              stars: '4.5/5',
              text: 'Пишу диплом, научный руководитель очень помогает и поддерживает.',
            },
            {
              name: 'Варий Набиуллин',
              student: 'Выпускник программы “Менеджмент в игровой индустрии и киберспорте”',
              image: 'about/students/nabiullin.jpg',
              stars: '4.5/5',
              // eslint-disable-next-line max-len
              text: 'Выбрал эту программу, потому что в других университетах аналогичных не нашел. Теперь знаю, что когда пойду работать мои знания не устареют.',
            },
            {
              name: 'Валентина Романенко',
              student: 'Студент программы “Теория и история искусств”',
              image: 'about/students/romanenko.jpg',
              stars: '4.5/5',
              text: 'Хожу на учебу с удовольствием. Интересные лекции и много практики.',
            },
          ],
          items_2: [
            {
              name: 'Тимур Нуров',
              // eslint-disable-next-line max-len
              student:
                'Автономная некоммерческая образовательная организация высшего образования «Воронежский экономико-правовой институт»',
              image: 'about/students/nurov.jpg',
              stars: '4.5/5',
              text: 'Выбрал программу на этом сайте. Смог сравнить ВУЗы в своем регионе и выбрать подходящий.',
            },
            {
              name: 'Анастасия Чкалова',
              student: 'Рыбинский государственный авиационный технический университет имени П.А.Соловьева',
              image: 'about/students/chkalova.jpg',
              stars: '4.5/5',
              text: 'Очень радует, что в университете большой выбор дополнительных занятий.',
            },
            {
              name: 'Валерия Шумова',
              student: 'Костромская государственная сельскохозяйственная академия',
              image: 'about/students/shumova.jpg',
              stars: '4.5/5',
              text: 'Довольна, что общежитие находится рядом с университетом, выхожу за 5 минут до начала пар. ',
            },
            {
              name: 'Геннадий Аксенов',
              student: 'Выпускник программы “Финансы и кредит”',
              image: 'about/students/aksenov.jpg',
              stars: '4.5/5',
              // eslint-disable-next-line max-len
              text: 'Уже 3 год хожу в студенческий спортзал, каждый год обновляют тренажеры.',
            },
            {
              name: 'Федор Степаненко',
              student: 'Томский институт бизнеса',
              image: 'about/students/stepanenko.jpg',
              stars: '4.5/5',
              // eslint-disable-next-line max-len
              text: 'Нет возможности учиться очно, университет составил для меня индивидуальный план учебы. ',
            },
            {
              name: 'Лидия Володина',
              student: 'Нижегородская государственная сельскохозяйственная академия',
              image: 'about/students/volodina.jpg',
              stars: '4.5/5',
              text: 'Увлекла научная жизнь ВУЗа. Выступаю со своими докладами на студенческих конференциях.',
            },
            {
              name: 'Азат Ахметов',
              student: 'МИРЭА - Российский технологический университет',
              image: 'about/students/akhmetov.jpg',
              stars: '4.5/5',
              text: 'На 2 курсе узнала, что университет занимается волонтерством. Ездим и помогаем нуждающимся. ',
            },
            {
              name: 'Александр Бутиков',
              student: 'Студент программы “Энергообеспечение предприятий”',
              image: 'about/students/butikov.jpg',
              stars: '4.5/5',
              text: 'Пишу диплом, научный руководитель очень помогает и поддерживает.',
            },
            {
              name: 'Татьяна Нестерова',
              student: 'Выпускник программы “Менеджмент в игровой индустрии и киберспорте”',
              image: 'about/students/nesterova.jpg',
              stars: '4.5/5',
              // eslint-disable-next-line max-len
              text: 'Нравится возможность заниматься студенческой жизнью, прошла в студсовет и помогаю организовывать мероприятия для всех студентов своего ВУЗа.',
            },
            {
              name: 'Елена Тихомирова',
              student: 'Московский технологический институт',
              image: 'about/students/tikhomirova.jpg',
              stars: '4.5/5',
              // eslint-disable-next-line max-len
              text: 'При выборе института для меня было важно иметь возможность совмещать работу и учебу. Очень удобно, что можно выбрать подходящую форму обучения.',
            },
          ],
          items_3: [
            {
              name: 'Омский автотранспортный колледж',
              // eslint-disable-next-line max-len
              image: 'about/universities/oatk.jpg',
              stars: '4.5/5',
              // eslint-disable-next-line max-len
              text: 'Страница колледжа на Synergy Hub стала для нас полноценной рекламной кампанией. Сами публикуем нужную информацию и управляем ей. Абитуриенты находят ответы на многие вопросы и сразу подают документы без лишних консультаций.',
            },
            {
              name: 'Восточно-Сибирский государственный институт культуры',
              image: 'about/universities/vsgik.jpg',
              stars: '4.5/5',
              text: 'Как только опубликовали свою организацию на Synergy Hub, многие абитуриенты заинтересовались ',
            },
            {
              name: 'Воронежский экономико-правовой институт',
              image: 'about/universities/vepi.jpg',
              stars: '4.5/5',
              // eslint-disable-next-line max-len
              text: 'Очень понравился подход сотрудничества. Быстро подписали соглашение и приступили к работе: опубликовали информацию об институте и программах. Уже есть первые заявки.',
            },
            {
              name: 'Рыбинский государственный авиационный технический университет...',
              image: 'about/universities/rsatu.jpg',
              stars: '4.5/5',
              // eslint-disable-next-line max-len
              text: 'Уже 3 год хожу в студенческий спортзал, каждый год обновляют тренажеры.',
            },
          ],
          items_4: [
            {
              name: 'Алтайский бизнес-колледж',
              // eslint-disable-next-line max-len
              image: 'about/universities/altaycollege.jpg',
              stars: '4.5/5',
              // eslint-disable-next-line max-len
              text: 'Была проблема привлечения абитуриентов. Команда Synergy Hub помогла усилить торговое предложение, сделала акцент на преимуществах организации в текстах и настроила рекламную кампанию.',
            },
            {
              name: 'Нижегородская государственная сельскохозяйственная академия',
              image: 'about/universities/nnsaa.jpg',
              stars: '4.5/5',
              // eslint-disable-next-line max-len
              text: 'Рады, что у нас появилась возможность продвигать свои программы не только в рамках региона, но и всей страны.',
            },
            {
              name: 'Государственный аграрный университет Северного Зауралья ',
              image: 'about/universities/tsaa.jpg',
              stars: '4.5/5',
              // eslint-disable-next-line max-len
              text: 'В нашем университете очень много образовательных направлений, которые нужно всегда актуализировать. Контент-менеджеры Synegry Hub всегда помогают публиковать новые программы и обновлять информацию в текущих карточках.',
            },
            {
              name: 'Пензенский государственный аграрный университет',
              image: 'about/universities/pgau.jpg',
              stars: '4.5/5',
              // eslint-disable-next-line max-len
              text: 'Как и все, наше учебное заведение заинтересовано в развитии. На сервисах Synergy мы смогли найти весь нужных функционал: продвижение, информаирование поступающих и удобный интерфейс для управления всеми направлениями университета.',
            },
          ],
        },
        {
          label: 'вузы',
        },
      ],
      swiperOptionTabsContent: {
        direction: 'vertical',
        spaceBetween: 24,
        autoHeight: false,
        loop: true,
        slidesPerView: 'auto',
        speed: 8000,
        grabCursor: true,
        mousewheelControl: true,
        keyboardControl: true,
        autoplay: {
          delay: 1,
          disableOnInteraction: true,
          reverseDirection: false,
        },
      },
      swiperOptionTabsContent2: {
        direction: 'vertical',
        spaceBetween: 24,
        autoHeight: false,
        loop: true,
        slidesPerView: 'auto',
        speed: 8000,
        grabCursor: true,
        mousewheelControl: true,
        keyboardControl: true,
        autoplay: {
          delay: 1,
          disableOnInteraction: false,
          reverseDirection: true,
        },
      },
    };
  },

  methods: {
    navigate(e) {
      if (e.target.dataset.show) {
        e.preventDefault();
        this.show = e.target.dataset.show;
      }
      console.log(this.show);
    },
    changeContent() {
      this.isActive = !this.isActive;
      console.log('test');
    },
  },
};
</script>
