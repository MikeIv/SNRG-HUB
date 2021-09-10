import { getPageInfo } from '~/api/getPageInfo'

export default async function (context) {
  // const pageName = context.route.name
  // const id = 3

  const dataRaw = {
    filter: {
      slug: 'product',
    },
  }

  const response = await getPageInfo(dataRaw)
  context.store.commit('setPageInfo', response.data)
}
