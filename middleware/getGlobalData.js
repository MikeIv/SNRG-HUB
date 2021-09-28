export default async function (context) {
  const requestData = {};

  await context.store.dispatch('globalData/getGlobalData', requestData);
}
