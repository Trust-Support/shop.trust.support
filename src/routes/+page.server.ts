import { getAllProducts } from '$lib/utils/shopify'
import { error } from '@sveltejs/kit'

const stripGid = (gid: string) => gid //gid.split('/').pop()

/** @type {import('./$types').RequestHandler} */
export async function load({ url }) {
  const res = await getAllProducts()

  if (res.status === 200) {
    const products = res.body?.data?.products?.edges
			.map(({ node }) => ({
				...node,
				id: stripGid(node.id),
				variants: node?.variants.edges
					.map(({ node }) => ({
						...node,
						id: stripGid(node.id)
					})),
				images: node?.images.edges
				.map(({ node }) => node.url)
			}))

		if (products) {
      return { products }
    }
    throw error(404)
  } else {
    throw error(res.status)
  }
}

