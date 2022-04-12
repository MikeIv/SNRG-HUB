import axios from 'axios';

export default (context, inject) => {
  // Объект набора валидаторов
  const typesValid = {
    email(value) {
      return /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(value?.toLowerCase());
    },
  };

  // Функции для получения и установки кук
  const cookie = {
    get(name) {
      const results = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
      if (results) return decodeURIComponent(results[2]);
      return null;
    },
    set(name, valueData, optionsData) {
      const options = optionsData || {};
      let { expires } = options;
      if (typeof expires === 'number' && expires) {
        const d = new Date();
        d.setTime(expires);
        expires = d;
        options.expires = d;
      }
      if (expires && expires.toUTCString) {
        options.expires = expires.toGMTString();
      }
      const value = encodeURIComponent(valueData);
      let updatedCookie = `${name}=${value}`;

      const optionsKeys = Object.keys(options);
      for (let i = 0; i < optionsKeys.length; i += 1) {
        updatedCookie += `; ${optionsKeys[i]}`;
        const propValue = options[optionsKeys[i]];
        if (propValue !== true) {
          updatedCookie += `=${propValue}`;
        }
      }
      document.cookie = updatedCookie;
    },
  };

  // Сохранение и загрузка данных форм из хранилища
  const storage = {
    save(name, data) {
      localStorage.setItem(name, JSON.stringify(data));
    },
    load(name) {
      const value = localStorage.getItem(name);
      return value ? JSON.parse(value) : null;
    },
  };

  // Валидатор для формы
  // formData - массив
  // [ { value: "", type: ""} ]
  function valid(formData) {
    for (let i = 0; i < formData.length; i += 1) {
      if (!('value' in formData[i])) return false; // Проверка на наличие value в объекте данных
      if (formData[i].value === '') return false; // Проверка на пустую строку в value
      if ('type' in formData[i]) {
        // Проверка на наличие type в объекте данных
        if (!(formData[i].type in typesValid)) return false; // Проверка на наличие валидатора из type
        if (!typesValid[formData[i].type](formData[i].value)) return false; // Вызов валидатора, конструкция для eslint
      }
    }
    return true;
  }

  // Функция оправки данных на сервер
  // formData - объект из данных формы
  // setings = объект переопределения настроек

  function getConfig(unit, type, land, partner, version, utms) {
    let url = '';
    if (context.store.state.landerSettings) {
      // eslint-disable-next-line max-len
      url = `https://syn.su/lander.php?r=land/index&unit=${unit}&partner=${partner}&version=${version}${
        type ? `&type=${type}` : ''
      }&land=${land}&ignore-thanksall=1`;

      // Если есть utm метки, то передаем их в урл
      if (Object.keys(utms).length) {
        Object.entries(utms).forEach(([key, value]) => {
          url += `&${key}=${value}`;
        });
      }
    }
    return url;
  }

  function send(formData, setingsData, route) {
    let { unit, type } = context.store.state.landerSettings;
    const { land, partner, version } = context.store.state.landerSettings;

    if (route) {
      unit = 'edu_platform';
      type = undefined;
    }

    const url = getConfig(unit, type, land, partner, version, context.store.state.utms);

    const setingSend = {
      redirectUrl: route ? `${route}thanks` : context.store.state.landerSettings.redirectUrl,
    };

    return new Promise((resolve, reject) => {
      const data = new FormData();

      // Получение и переназначение настроект
      const setings = setingsData || {};
      const setingsSendData = setingSend;
      const setingsKeys = Object.keys(setingsSendData);
      for (let i = 0; i < setingsKeys.length; i += 1) {
        let value;
        if (setingsKeys[i] in setings) value = setings[setingsKeys[i]];
        else value = setingsSendData[setingsKeys[i]];
        data.append(setingsKeys[i], value);
      }

      // Обработка и подготовка данных для отправки

      if (Object.keys(context.store.state.utms).length) {
        if (formData.comments) {
          // eslint-disable-next-line no-param-reassign
          formData.comments = `${formData.comments}. Utm-метки получены по ссылке: ${context.store.state.followedLink}`;
        } else {
          // eslint-disable-next-line no-param-reassign
          formData.comments = `Utm-метки получены по ссылке: ${context.store.state.followedLink}`;
        }
      }

      const formDataKeys = Object.keys(formData);

      for (let i = 0; i < formDataKeys.length; i += 1) {
        data.append(formDataKeys[i], formData[formDataKeys[i]]);
      }
      data.append('personalDataAgree', 'on');
      data.append(
        'mergelead',
        `id_${Math.random().toString(36).substr(2, 9)}${Math.round(new Date().getTime() / 1000)}`,
      );
      data.append('url_location', document.location.href);
      data.append('entry_point', document.location.host);
      data.append('analytics_id', cookie.get('_ga'));
      // Отправка данных
      axios({
        method: 'post',
        url,
        data,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', Accept: '*/*' },
      })
        .then((response) => {
          if (response.status === 200) {
            resolve({
              formData: data,
              response,
            });
            context.app.router.push({ path: setingSend.redirectUrl });
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // Системная информация лендера
  window.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.code === 'KeyI' && context.store.state.landerSettings) {
      event.preventDefault();
      let modal = document.querySelector('.lander-message');

      if (!modal) {
        modal = document.createElement('div');
        const modalClose = document.createElement('div');

        modalClose.classList.add('lander-message-close');
        modal.classList.add('lander-message');
        modal.append(modalClose);

        Object.entries(context.store.state.landerSettings).forEach(([key, value]) => {
          const item = document.createElement('div');
          item.innerHTML = `<strong>${key}</strong>: <span>${value}</span>`;
          item.classList.add('lander-message-item');
          modal.append(item);
        });
        document.body.append(modal);
      }
    }
  });

  // Скрытие системной информации лендера по клику на X
  window.addEventListener('click', (event) => {
    if (event.target.className === 'lander-message-close') {
      const landerMessage = document.querySelector('.lander-message');

      landerMessage.parentNode.removeChild(landerMessage);
    }
  });

  // Скрытие системной информации лендера при переходе на другую страницу
  const closeLanderInfo = () => {
    const landerMessage = document.querySelector('.lander-message');
    if (landerMessage) landerMessage.parentNode.removeChild(landerMessage);
  };

  const lander = {
    send,
    valid,
    closeLanderInfo,
    cookie,
    storage,
  };

  inject('lander', lander);
};
