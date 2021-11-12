<template>
  <div class="product-ege">
    <div class="l-default">
      <SProgramStart />
      <SProgramCpaLine />
      <SProgramPeople :dataObject="forWhom" />
      <SProgramCourse />
      <SProgramSkills />
      <SProgramTeachers :dataObject="teachers" />
      <SProgramBanner :dataObject="banner" />
      <SProgramCommand :dataObject="why" />
      <SProgramReviews />
      <SProgramDiploma />
      <SProgramForm formClass="bg--red" />
      <SProgramQuestions :dataObject="questions" />
      <SProgramPrice formClass="bg--blue" />
    </div>
  </div>
</template>

<script>
import SProgramStart from '~/components/product_ege/s_program_start/s_program_start';
import SProgramCpaLine from '~/components/product_ege/s_program_cpa_line/s_program_cpa_line';
import SProgramPeople from '~/components/product_ege/s_program_people/s_program_people';
import SProgramCourse from '~/components/product_ege/s_program_course/s_program_course';
import SProgramSkills from '~/components/product_ege/s_program_skills/s_program_skills';
import SProgramTeachers from '~/components/product_ege/s_program_teachers/s_program_teachers';
import SProgramBanner from '~/components/product_ege/s_program_banner/s_program_banner';
import SProgramCommand from '~/components/product_ege/s_program_command/s_program_command';
import SProgramDiploma from '~/components/product_ege/s_program_diploma/s_program_diploma';
import SProgramForm from '~/components/product_ege/s_program_form/s_program_form';
import SProgramQuestions from '~/components/product_ege/s_program_questions/s_program_questions';
import SProgramPrice from '~/components/product_ege/s_program_price/s_program_price';
import SProgramReviews from '~/components/product_ege/s_program_reviews/s_program_reviews';

export default {
  name: 'product_ege',

  components: {
    SProgramStart,
    SProgramCpaLine,
    SProgramPeople,
    SProgramCourse,
    SProgramSkills,
    SProgramTeachers,
    SProgramBanner,
    SProgramCommand,
    SProgramDiploma,
    SProgramForm,
    SProgramQuestions,
    SProgramPrice,
    SProgramReviews,
  },

  data() {
    return {
      forWhom: {
        title: 'Как устроен <span>образовательный процесс</span>',
        list: [
          {
            title: 'Обучение',
            // eslint-disable-next-line max-len
            text: 'Проверенные и актуальные программы обучения. Преподаватель ведёт занятие в режиме реального времени. Подготовка к поступлению в лучшие вузы страны и сдаче ОГЭ',
            image: '/ege/for-whom/1.jpg',
          },
          {
            title: 'Работа на уроке',
            // eslint-disable-next-line max-len
            text: 'Совместная с классом работа над задачами, вопросами и материалом. Возможность в любой момент задать вопрос учителю',
            image: '/ege/for-whom/2.jpg',
          },
          {
            title: 'Поддержка',
            // eslint-disable-next-line max-len
            text: 'Сохраненная запись вебинара - всегда можно вернуться и посмотреть. По каждому предмету оказывает поддержку наставник, которому можно задать вопросы по учебному материалу и ДЗ',
            image: '/ege/for-whom/3.jpg',
          },
          {
            title: 'Самостоятельная работа',
            // eslint-disable-next-line max-len
            text: 'Совместная с классом работа над задачами, вопросами и материалом. Возможность в любой момент задать вопрос учителю',
            image: '/ege/for-whom/4.jpg',
          },
        ],
        swiperOptions: {
          slidesPerView: 'auto',
          spaceBetween: 20,
          loop: false,
          height: 'auto',
          direction: 'horizontal',
          resistance: true,
          resistanceRatio: 0,
          breakpoints: {
            576: {
              spaceBetween: 16,
              direction: 'horizontal',
            },
            768: {
              spaceBetween: 20,
            },
            991: {
              slidesPerView: 'auto',
            },
            992: {
              slidesPerView: 4,
              direction: 'horizontal',
            },
          },
        },
      },
      teachers: {
        title: '<span>Преподаватели</span> школы',
        list: [
          {
            name: 'Майская Татьяна Владимировна',
            image: '/ege/teachers/1.jpg',
            // eslint-disable-next-line max-len
            description: 'Эксперт ОГЭ и ЕГЭ по русскому языку и литературе',
          },
          {
            name: 'Былинкина Нармина Ильгаровна',
            image: '/ege/teachers/2.jpg',
            description:
              // eslint-disable-next-line max-len
              'Региональный эксперт ОГЭ по английскому языку; Председатель краевой комиссии Всероссийской олимпиады школьников по английскому языку',
          },
          {
            name: 'Модебадзе Мардон Ираклиевич',
            image: '/ege/teachers/3.jpg',
            description:
              // eslint-disable-next-line max-len
              'Преподаватель лицея ГУ-ВШЭ. Эксперт ЕГЭ/ОГЭ. Окончил магистратуру факультета права Высшей школы экономики',
          },
          {
            name: 'Санин Александр Юрьевич',
            image: '/ege/teachers/4.jpg',
            description:
              // eslint-disable-next-line max-len
              'Кандидат географических наук; Окончил с красным дипломом факультет педагогического образования МГУ им. М.В. Ломоносова',
          },
          {
            name: 'Андресюк Елена Андреевна',
            image: '/ege/teachers/5.jpg',
            description:
              // eslint-disable-next-line max-len
              'Автор курсов по подготовке к ЕГЭ и ОГЭ по физике и математике;  Младший научный сотрудник НМИЦ ТПМ',
          },
        ],
        swiperOptions: {
          slidesPerView: 'auto',
          spaceBetween: 20,
          loop: false,
          height: 'auto',
          direction: 'horizontal',
          resistance: true,
          resistanceRatio: 0,
          breakpoints: {
            576: {
              spaceBetween: 16,
              slidesPerView: 'auto',
              direction: 'horizontal',
            },
            768: {
              spaceBetween: 24,
            },
            992: {
              slidesPerView: 4,
              direction: 'horizontal',
            },
          },
        },
      },
      banner: {
        // eslint-disable-next-line max-len
        title: 'Каждый год мы <span>выпускаем 1500+</span> довольных учеников, которые поступают на бюджет!',
        // eslint-disable-next-line max-len
        description: 'Наши выпускники набирают в среднем <span>85+ баллов</span>',
        image: '/ege/banner/1.png',
      },
      why: {
        isMobile: false,
        title: 'Почему Синергия?',
        items: [
          {
            icon: '/ege/why/1.png',
            title: 'Выдающиеся учителя',
            // eslint-disable-next-line max-len
            text: 'Наши учителя постоянно доказывают свой профессионализм и эффективность, любят свою работу и ценят каждого ученика',
          },
          {
            icon: '/ege/why/2.png',
            title: 'Океан знаний',
            // eslint-disable-next-line max-len
            text: 'Записи всех уроков, все нужные материалы, задачи, тесты – всё необходимое для учёбы всегда с вами!',
          },
          {
            icon: '/ege/why/3.png',
            title: 'Интерактивный формат',
            // eslint-disable-next-line max-len
            text: 'Учись в любое время везде, где есть интернет. Наставники ответят на вопросы по предмету даже вне уроков',
          },
          {
            icon: '/ege/why/4.png',
            title: 'Экосистема',
            // eslint-disable-next-line max-len
            text: '«Синергия» – это целая планета образования, а выпускники курсов имеют льготы на поступление в колледж и университет',
          },
          {
            icon: '/ege/why/5.png',
            title: 'Контроль успеваемости',
            // eslint-disable-next-line max-len
            text: 'Домашние задания и тесты с автопроверкой. Проверочные после каждого модуля. Ежемесячные отчёты для родителей',
          },
          {
            icon: '/ege/why/6.png',
            title: 'Поддержка на каждом шагу',
            // eslint-disable-next-line max-len
            text: 'Психологи и профориентологи создадут комфортную обстановку и определят наиболее подходящее направление развития',
          },
        ],
      },
      questions: {
        title: 'Часто задаваемые вопросы',
        list: [
          {
            title: 'Чем онлайн-школа «Синергия» лучше обычной офлайн-школы?',
            // eslint-disable-next-line max-len
            text: 'Мы даём качественное образование, доступное из любой точки мира. И делаем его получение комфортным для ученика и родителей за счёт создания спокойной атмосферы на всех этапах професса, новых методики преподавания и персональная поддержка на всех этапах.',
            isActive: true,
          },
          {
            title: 'Что такое семейная форма обучения? Какой документ получит школьник?',
            // eslint-disable-next-line max-len
            text: 'Семейная форма обучения — это форма получения образования вне школы: полностью дистанционное обучение и аттестация. Личное дело ученика — на руках у родителей, на них же ложится ответственность (перед государством) за качество полученного образования. Мы поможем с переходом на эту форму обучения, а для прохождения промежуточной аттестации зачислим в нашу школу. После прохождения аттестации выдаём аттестационный лист. Полный цикл подготовки к ОГЭ/ЕГЭ входит в программу.',
            isActive: false,
          },
          {
            title: 'Что такое заочная форма обучения?',
            // eslint-disable-next-line max-len
            text: 'Ученик числится в школе, но посещает её только для прохождения проверочных работ и сдачи экзаменов. За качество образования перед государством полную ответственность несём мы — школа. По учебному плану сдаются контрольные, проверочные и другие работы. Ученик участвует во Всероссийских проверочных работах (ВПР), работах Московского центра качества образования (МЦКО) и прочих проводимых школой. Полный цикл подготовки к ОГЭ/ЕГЭ входит в программу. По окончании обучения выдаём аттестата государственного образца.',
            isActive: false,
          },
          {
            title: 'Сколько человек в классе?',
            // eslint-disable-next-line max-len
            text: 'Сейчас в наших классах учится от 4 до 17 человек. Максимальное количество учеников — 30 человек. Учитывая работу команды поддержки (модераторы и наставники по предметам) и продолжительность занятий, каждому ученику отводится столько времени, сколько ему нужно.',
            isActive: false,
          },
          {
            title: 'Живые уроки — или записи занятий?',
            // eslint-disable-next-line max-len
            text: 'Все уроки — живые (в формате онлайн-общения по видео, с чатом, электронной доской и т.д.) Их можно посмотреть и в записи — поэтому не стоит бояться опоздать или пропустить занятие.',
            isActive: false,
          },
        ],
      },
    };
  },
};
</script>
