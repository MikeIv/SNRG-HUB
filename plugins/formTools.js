import axios from 'axios';

export default (context, inject) => {

  // eslint-disable-next-line max-len
  const url = 'http://syn.su/lander.php?r=land/index&unit=synergy_marketplace&type=marketplace&land=KD_market&ignore-thanksall=1';

  // Объект набора валидаторов
  const typesValid = {
    email(value) {
      return /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(value);
    },
  };


  // Функции для получения и установки кук
  const cookie = {
    get: function(name) {
      var results = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
      if (results)
        return (decodeURIComponent(results[2]));
      else
        return null;
    },
    set: function(name, value, options) {
      options = options || {};
      var expires = options.expires;
      if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(expires);
        expires = options.expires = d;
      }
      if (expires && expires.toUTCString) {
        options.expires = expires.toGMTString();
      }
      value = encodeURIComponent(value);
      var updatedCookie = name + "=" + value;
      for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
          updatedCookie += "=" + propValue;
        }
      }
      document.cookie = updatedCookie;
    }
  }

  // Сохранение и загрузка данных форм из хранилища
  const storage = {
    save: function(name, data){
      localStorage.setItem(name, data);
    },
    load: function(name){
      return localStorage.getItem(name);
    }
  }


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
  const setingSend = {
    unit: '',
    type: '',
    land: '',
    version: '',
    redirectUrl: '',
  }

  function send(formData, setings) {
    return new Promise((resolve, reject) => {

      // Получение и переназначение настроект
      setings = setings || {};
      let setingsData = setingSend;
      const setingsKeys = Object.keys(setings);
      for (let i = 0; i < setingsKeys.length; i += 1) {
        setingsData[setingsKeys[i]] = setings[setingsKeys[i]];
      }
      

      // Обработка и подготовка данных для отправки
      const data = new FormData();
      const formDataKeys = Object.keys(formData);
      for (let i = 0; i < formDataKeys.length; i += 1) {
        data.append(formDataKeys[i], formData[formDataKeys[i]]);
      }
      data.append('personalDataAgree', 'on');
      data.append('mergelead', `id_${Math.random().toString(36).substr(2, 9)} ${Math.round(new Date().getTime() / 1000)}`);
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
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }


  const formTools = { send, valid, cookie };
  inject('formTools', formTools);
};
