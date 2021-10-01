/**
 * Парсинг даты формата "4y-6m-5d" в объект
 * @param {*} date
 */
export default function getParseDate(date) {
  const datesArr = date.split('-'),
    datesArrLen = datesArr.length,
    datesObj = {};

  for (let i = 0; i < datesArrLen; i++) {
    if (datesArr[i].includes('d')) {
      datesObj.days = parseInt(datesArr[i]);
    }
    if (datesArr[i].includes('m')) {
      datesObj.months = parseInt(datesArr[i]);
    }
    if (datesArr[i].includes('y')) {
      datesObj.years = parseInt(datesArr[i]);
    }
  }
  return datesObj;
}
