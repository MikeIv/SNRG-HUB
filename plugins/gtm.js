// eslint-disable-next-line no-empty-pattern
export default ({}, inject) => {
  inject('gtm', () => (function (w, d, s, l, i) {
    // eslint-disable-next-line no-param-reassign
    w[l] = w[l] || [];
    w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    const f = d.getElementsByTagName(s)[0];
    const j = d.createElement(s);
    const dl = l !== 'dataLayer' ? `&l=${l}` : '';
    j.async = true;
    j.src = `https://www.googletagmanager.com/gtm.js?id=${i}${dl}`;
    f.parentNode.insertBefore(j, f);
  }(window, document, 'script', 'dataLayer', 'GTM-T4L85ZG')));
  // Вставка noscript
  const gtmScript = window.document.createElement('noscript');
  // eslint-disable-next-line max-len
  gtmScript.innerHTML = '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T4L85ZG" height="0" width="0"></iframe>';
  window.document.body.appendChild(gtmScript);
};
