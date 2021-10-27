export default async function ({ route, store }) {
  const utms = {};
  Object.entries(route.query).forEach(([key, value]) => {
    if (key.includes('utm')) {
      utms[key] = value;
    }
  });
  store.commit('setUtms', utms);
  store.commit('setFollowedLink', route.path);
}
