export default async function ({ route, store, redirect }) {
  const requestData = {
    filter: {},
    params: {},
  };

  // Когда мы заходим на любую страницу, нам нужно сделать запрос, передам объект параметров
  // Мы знаем, что для главной страницы нужно передать id = 1
  // Здесь мы проверяем, что если главная страница, то добавляем id = 1
  // если другая, то добавляем route.name
  // Для этой реализации нам нужно, чтобы названия роутов совпадали со слагом на бэке
  if (route.name === 'index') {
    requestData.filter.id = 1;
  } else {
    requestData.filter.slug = route.name;
  }

  if (route.name === 'catalog-all') {
    requestData.filter.slug = 'catalog';
  }

  if (route.name === 'product-slug') {
    requestData.filter.slug = 'product';
    requestData.params.slug = route.params.slug;
  }

  if (route.name === 'organization-slug' || route.name === 'organization-slug-all') {
    requestData.filter.slug = 'organization';
    requestData.params.slug = route.params.slug;
  }

  await store.dispatch('getPageInfo', { requestData, redirect });

  if (process.client) {
    // eslint-disable-next-line no-undef
    $nuxt.context.$lander.closeLanderInfo();
  }
}
