export default async function (context) {
  const requestData = {
    filter: {},
  }

  context.route.name === 'index'
    ? (requestData.filter.id = 1)
    : (requestData.filter.slug = context.route.name)

  await context.store.dispatch('getPageInfo', requestData)
}
