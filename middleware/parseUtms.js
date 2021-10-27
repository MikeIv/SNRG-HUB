export default async function ({ route, store }) {
  store.commit('setUtms', route.query);
  store.commit('setFollowedLink', route.path);
}
