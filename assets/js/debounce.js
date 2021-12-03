/* eslint-disable prefer-rest-params */
/* eslint-disable import/prefer-default-export */
/* eslint-disable func-names */
export function debounce(fn, delay) {
  let timeoutID = null;
  return function () {
    clearTimeout(timeoutID);
    const args = arguments;
    const that = this;
    timeoutID = setTimeout(() => {
      fn.apply(that, args);
    }, delay);
  };
}
