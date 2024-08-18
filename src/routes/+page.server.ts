import { client as sanityClient } from '$lib/sanity/client'
import { client as stripeClient } from '$lib/stripe/client'
import {
	configQuery,
	productsQuery as sanityProductsQuery
} from '$lib/sanity/queries'
import { pricesQuery as stripePricesQuery } from '$lib/stripe/queries'
import { reconcile } from '$lib/helpers/products'
import { error } from '@sveltejs/kit'

/** @type {import('./$types').RequestHandler} */
export async function load () {
  const config = await sanityClient.fetch(configQuery)
  const sanityProducts = await sanityClient.fetch(sanityProductsQuery)
	const productIds = sanityProducts.map((product) =>
		product.variants
			.map((variant) => variant.sku)
	)
	.flat()

	const { data: stripePrices } = await stripeClient.prices
		.search(stripePricesQuery(productIds))

	// Reconcile Sanity data with Stripe
	const products = reconcile(sanityProducts, stripePrices)
		
  if (products?.length > 0) {
		return { products, config }

    throw error(404)
  } else {
    throw error(500)
  }
}

