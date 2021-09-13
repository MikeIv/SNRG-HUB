export default async function (context) {
  const requestData = {
    filter: {},
  }

  // Когда мы заходим на любую страницу, нам нужно сделать запрос, передам объект параметров
  // Мы знаем, что для главной страницы нужно передать id = 1
  // Здесь мы проверяем, что если главная страница, то добавляем id = 1
  // если другая, то добавляем route.name
  // Для этой реализации нам нужно, чтобы названия роутов совпадали со слагом на бэке

  context.route.name === 'index'
    ? (requestData.filter.id = 1)
    : (requestData.filter.slug = context.route.name)

  await context.store.dispatch('getPageInfo', requestData)
}
