<template>
  <div class="product-school">
    <div class="l-default">
      <SProgramStart />
      <SProgramCpaLine />
      <SProgramPeople :dataObject="forWhom" />
      <SProgramSkills />
      <SProgramAdvantages />
      <SProgramTeachers :dataObject="process" />
      <SProgramTeachers :dataObject="teachers" />
      <SProgramForm formClass="bg--red" />
      <SProgramQuestions :dataObject="program" />
      <SProgramStudies :dataObject="studies" />
      <SProgramCommand />
      <SProgramDiploma />
      <SProgramReviews />
      <SProgramPrice formClass="bg--blue" />
      <SProgramQuestions :dataObject="questions" />
    </div>
  </div>
</template>

<script>
import SProgramStart from '~/components/product_school/s_program_start/s_program_start';
import SProgramCpaLine from '~/components/product_school/s_program_cpa_line/s_program_cpa_line';
import SProgramPeople from '~/components/product_school/s_program_people/s_program_people';
import SProgramSkills from '~/components/product_school/s_program_skills/s_program_skills';
import SProgramAdvantages from '~/components/product_school/s_program_advantages/s_program_advantages';
import SProgramTeachers from '~/components/product_school/s_program_teachers/s_program_teachers';
import SProgramForm from '~/components/product_school/s_program_form/s_program_form';
import SProgramQuestions from '~/components/product_school/s_program_questions/s_program_questions';
import SProgramStudies from '~/components/product_school/s_program_studies/s_program_studies';
import SProgramCommand from '~/components/product_school/s_program_command/s_program_command';
import SProgramDiploma from '~/components/product_school/s_program_diploma/s_program_diploma';
import SProgramReviews from '~/components/product_school/s_program_reviews/s_program_reviews';
import SProgramPrice from '~/components/product_school/s_program_price/s_program_price';

export default {
  name: 'product_school',

  components: {
    SProgramStart,
    SProgramCpaLine,
    SProgramPeople,
    SProgramSkills,
    SProgramAdvantages,
    SProgramTeachers,
    SProgramForm,
    SProgramQuestions,
    SProgramStudies,
    SProgramCommand,
    SProgramDiploma,
    SProgramReviews,
    SProgramPrice,
  },

  data() {
    return {
      forWhom: {
        title: 'Для кого подойдёт <span>онлайн-школа</span>',
        list: [
          {
            title: 'Для семейного обучения',
            // eslint-disable-next-line max-len
            text: 'Онлайн-школа подойдет вам, если вашему ребёнку некомфортно в школе или вас не устраивает качество образования в доступных территориально школах',
            image: '/school/for-whom/1.jpg',
          },
          {
            title: 'Для тех, кто часто пропускает школу',
            // eslint-disable-next-line max-len
            text: 'Если ваш ребенок занимается спортом, музыкой или другим профессиональным увлечением и часто пропускает школу',
            image: '/school/for-whom/2.jpg',
          },
          {
            title: 'Для проживающих заграницей',
            // eslint-disable-next-line max-len
            text: 'Если вы живете за рубежом, но планируете вернуться на родину и продолжить обучение здесь. Если школьник — гражданин другой страны',
            image: '/school/for-whom/3.jpg',
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
              slidesPerView: 3,
              direction: 'horizontal',
            },
          },
        },
      },
      process: {
        // eslint-disable-next-line max-len
        title: 'Как устроен <span>образовательный процесс</span>',
        list: [
          {
            name: 'Обучение',
            description:
              // eslint-disable-next-line max-len
              'Проверенные и актуальные программы обучения. Преподаватель ведёт занятие в режиме реального времени. Подготовка к поступлению в лучшие вузы страны и сдаче ОГЭ.',
            image: '/school/process/1.jpg',
          },
          {
            name: 'Работа на уроке',
            description:
              // eslint-disable-next-line max-len
              'Совместная с классом работа над задачами, вопросами и материалом. Возможность в любой момент задать вопрос учителю.',
            image: '/school/process/2.jpg',
          },
          {
            name: 'Поддержка',
            description:
              // eslint-disable-next-line max-len
              'Сохраненная запись вебинара - всегда можно вернуться и посмотреть. По каждому предмету оказывает поддержку наставник, которому можно задать вопросы по учебному материалу и ДЗ',
            image: '/school/process/3.jpg',
          },
          {
            name: 'Самостоятельная работа',
            description:
              // eslint-disable-next-line max-len
              'Совместная с классом работа над задачами, вопросами и материалом. Возможность в любой момент задать вопрос учителю.',
            image: '/school/process/3.jpg',
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
      teachers: {
        title: '<span>Преподаватели</span> школы',
        list: [
          {
            name: 'Меринова Диана Ивановна',
            description:
              // eslint-disable-next-line max-len
              'Эксперт ЕГЭ по русскому языку. Опыт преподавания в школе более 5 лет и более 3 лет на онлайн-платформах',
            image: '/school/teachers/1.jpg',
          },
          {
            name: 'Осипов Никита Юрьевич',
            description:
              // eslint-disable-next-line max-len
              'Призер математических олимпиад «Физтех» и «Звезда»; Автор более 10 электронных курсов по подготовке к ЕГЭ и ОГЭ',
            image: '/school/teachers/2.jpg',
          },
          {
            name: 'Модебадзе Мардон Ираклиевич',
            description:
              // eslint-disable-next-line max-len
              'Преподаватель лицея ГУ-ВШЭ. Эксперт ЕГЭ/ОГЭ. Окончил магистратуру факультета права Высшей школы экономики',
            image: '/school/teachers/3.jpg',
          },
          {
            name: 'Андрей Борю',
            description:
              // eslint-disable-next-line max-len
              'В разработке более 12 лет, изначально программировал на php, потом освоил Golang, java, python. Последние несколько лет активно занимается devops',
            image: '/school/teachers/4.jpg',
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
      program: {
        title: 'Программа классов',
        list: [
          {
            title: '5 класс',
            // eslint-disable-next-line max-len
            text: '5-й класс — плавное продолжение пятого. В этом учебном году программа почти не изменится, зато вас ждёт более глубокое изучение предметов. Занятий по одним дисциплинам станет больше, а по другим — меньше. Профильные преподаватели и ваш личный куратор всегда ответят на любые вопросы, которые могут возникнуть по учёбе. Спокойно и уверенно идем дальше!',
            isActive: true,
            timetable: {
              title: 'Пример расписания',
              time: {
                title: 'Время',
                items: ['09.00-10.00', '10.00-11.00', '11.00-12.00', '12.00-13.00', '13.00-14.00', '15.00-16.00'],
              },
              days: [
                {
                  title: 'Понедельник',
                  subjects: ['Биология', 'Ин яз', 'Русский', 'Математика', 'География', 'Технология'],
                },
                {
                  title: 'Вторник',
                  subjects: ['Биология', 'Ин яз', 'Русский', 'Математика', 'География', 'Технология'],
                },
                {
                  title: 'Среда',
                  subjects: ['Биология', 'Ин яз', 'Русский', 'Математика', 'География', 'Технология'],
                },
                {
                  title: 'Черверг',
                  subjects: ['Биология', 'Ин яз', 'Русский', 'Математика', 'География', 'Технология'],
                },
                {
                  title: 'Пятница',
                  subjects: ['Биология', 'Ин яз', 'Русский', 'Математика', 'География', 'Технология'],
                },
              ],
            },
          },
          {
            title: '6 класс',
            // eslint-disable-next-line max-len
            text: '6-й класс — плавное продолжение пятого. В этом учебном году программа почти не изменится, зато вас ждёт более глубокое изучение предметов. Занятий по одним дисциплинам станет больше, а по другим — меньше. Профильные преподаватели и ваш личный куратор всегда ответят на любые вопросы, которые могут возникнуть по учёбе. Спокойно и уверенно идем дальше!',
          },
          {
            title: '7 класс',
            // eslint-disable-next-line max-len
            text: '7-й класс — плавное продолжение пятого. В этом учебном году программа почти не изменится, зато вас ждёт более глубокое изучение предметов. Занятий по одним дисциплинам станет больше, а по другим — меньше. Профильные преподаватели и ваш личный куратор всегда ответят на любые вопросы, которые могут возникнуть по учёбе. Спокойно и уверенно идем дальше!',
          },
          {
            title: '8 класс',
            // eslint-disable-next-line max-len
            text: '8-й класс — плавное продолжение пятого. В этом учебном году программа почти не изменится, зато вас ждёт более глубокое изучение предметов. Занятий по одним дисциплинам станет больше, а по другим — меньше. Профильные преподаватели и ваш личный куратор всегда ответят на любые вопросы, которые могут возникнуть по учёбе. Спокойно и уверенно идем дальше!',
          },
          {
            title: '9 класс',
            // eslint-disable-next-line max-len
            text: '9-й класс — плавное продолжение пятого. В этом учебном году программа почти не изменится, зато вас ждёт более глубокое изучение предметов. Занятий по одним дисциплинам станет больше, а по другим — меньше. Профильные преподаватели и ваш личный куратор всегда ответят на любые вопросы, которые могут возникнуть по учёбе. Спокойно и уверенно идем дальше!',
          },
        ],
      },
      studies: {
        title: 'Форма <span>обучения</span>',
        subtitle:
          // eslint-disable-next-line max-len
          'Наша школа предлагает две формы обучения. Проконсультируйтесь с нами - мы расскажем об их особенностях и различиях.',
        items: [
          {
            imgTop: 'pink',
            title: 'Семейная',
            // eslint-disable-next-line max-len
            list: [
              'Доступно для 5, 6, 7, 8, 10 классов',
              'Полностью дистанционное обучение и аттестация',
              'Ответственность за обучение на родителях',
              'Аттестационный лист об окончания класса',
              'Образовательный процесс, соответствующий ФГОС, и аккредитованые программы обучения',
              'Помощь с переходом на семейную форму обучения',
              'Зачисление в школу на время прохождени промежуточной аттестации',
            ],
            message:
              'Для получения аттестата и сдачи ОГЭ/ЕГЭ необходим переход на заочную форму обучения в 9 и 11 классе',
          },
          {
            imgTop: 'blue',
            title: 'Заочная',
            // eslint-disable-next-line max-len
            list: [
              'Доступно для 5-11 классов',
              'Выдача аттестата государственного образца',
              'Зачисление в контингент школы',
              'Вступительное тестирование по основным предметам',
              // eslint-disable-next-line max-len
              'Образовательный процесс, соответствующий ФГОС,  и аккредитованые программы обучения',
              'Полный цикл подготовки к ОГЭ/ЕГЭ',
              // eslint-disable-next-line max-len
              'Прохождение МЦКО и ВПР,  текущая и промежуточная аттестации',
            ],
            // eslint-disable-next-line max-len
            message: 'Для зачисления и начала обучения необходимо предоставить полный пакет документов!',
          },
        ],
      },
      questions: {
        title: 'Часто задаваемые вопросы',
        list: [
          {
            title: 'Как проходит обучение?',
            // eslint-disable-next-line max-len
            text: 'Для тех, кто не смог вовремя присутствовать на уроке, мы записываем каждое занятие. Видеозаписи всегда доступны в разделе обучения. Также к каждому уроку мы разработали методички, с помощью которых можно лучше подготовиться к занятиям и получить дополнительные знания1',
            isActive: true,
          },
          {
            title: 'Что делать, если я не могу учиться Online?',
            // eslint-disable-next-line max-len
            text: 'Для тех, кто не смог вовремя присутствовать на уроке, мы записываем каждое занятие. Видеозаписи всегда доступны в разделе обучения. Также к каждому уроку мы разработали методички, с помощью которых можно лучше подготовиться к занятиям и получить дополнительные знания2',
          },
          {
            title: 'Что делать, если у меня проблема или срочный вопрос?',
            // eslint-disable-next-line max-len
            text: 'Для тех, кто не смог вовремя присутствовать на уроке, мы записываем каждое занятие. Видеозаписи всегда доступны в разделе обучения. Также к каждому уроку мы разработали методички, с помощью которых можно лучше подготовиться к занятиям и получить дополнительные знания3',
          },
          {
            title: 'Я никогда не работал с кодом. У меня получится?',
            // eslint-disable-next-line max-len
            text: 'Для тех, кто не смог вовремя присутствовать на уроке, мы записываем каждое занятие. Видеозаписи всегда доступны в разделе обучения. Также к каждому уроку мы разработали методички, с помощью которых можно лучше подготовиться к занятиям и получить дополнительные знания4',
          },
          {
            title: 'Сколько часов в неделю мне нужно будет уделять учёбе?',
            // eslint-disable-next-line max-len
            text: 'Для тех, кто не смог вовремя присутствовать на уроке, мы записываем каждое занятие. Видеозаписи всегда доступны в разделе обучения. Также к каждому уроку мы разработали методички, с помощью которых можно лучше подготовиться к занятиям и получить дополнительные знания5',
          },
          {
            title: 'А я точно трудоустроюсь?',
            // eslint-disable-next-line max-len
            text: 'Для тех, кто не смог вовремя присутствовать на уроке, мы записываем каждое занятие. Видеозаписи всегда доступны в разделе обучения. Также к каждому уроку мы разработали методички, с помощью которых можно лучше подготовиться к занятиям и получить дополнительные знания6',
          },
        ],
      },
    };
  },
};
</script>
