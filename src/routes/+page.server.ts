//import { getAllProducts } from '$lib/utils/shopify'
import { client } from '$lib/sanity/client'
import { configQuery, productsQuery } from '$lib/sanity/queries'
import { error } from '@sveltejs/kit'

/** @type {import('./$types').RequestHandler} */
export async function load({ url }) {
  const config = await client.fetch(configQuery)
  const products = await client.fetch(productsQuery)

  if (products?.length > 0) {
		return { products, config }

    throw error(404)
  } else {
    throw error(res.status)
  }
}

