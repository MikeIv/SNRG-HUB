export default function ({ route, redirect }) {
  if (route.path !== '/' && !route.path.endsWith('/')) {
    const { path, query, hash } = route;
    const nextPath = `${path}/`;
    const nextRoute = { path: nextPath, query, hash };
    console.log('next', nextRoute);

    redirect(nextRoute);
  }
}
