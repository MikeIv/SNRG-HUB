/**
 * Проверка на существование значения
 */
function isExistValue(value) {
  let result = false;
  if (typeof value !== 'undefined' && value !== '' && value != null) {
    result = true;
  }
  return result;
}
/**
 * Склонение числа
 */
export function declOfNum(number, titles) {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
}

/**
 * Возврат даты в нужном формате (x года x месяцев x дней х часов)
 */
export default function getDateFromDatesObj(datesObj) {
  let result = '';
  if (isExistValue(datesObj.years)) {
    result += `${datesObj.years} ${declOfNum(datesObj.years, ['год', 'года', 'лет'])} `;
  }
  if (isExistValue(datesObj.months)) {
    result += `${datesObj.months + declOfNum(datesObj.months, ['&nbsp;месяц', '&nbsp;месяца', '&nbsp;месяцев'])} `;
  }
  if (isExistValue(datesObj.days)) {
    result += `${datesObj.days} ${declOfNum(datesObj.days, ['&nbsp;день', '&nbsp;дня', '&nbsp;дней'])}`;
  }

  if (isExistValue(datesObj.hours)) {
    result += `${datesObj.hours} ${declOfNum(datesObj.hours, ['&nbsp;час', '&nbsp;часа', '&nbsp;часов'])}`;
  }

  return result;
}
