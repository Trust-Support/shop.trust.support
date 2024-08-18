export const productQuery = (id: string) => ({ id })
export const productsQuery = (ids: string[]) => ({ ids, limit: 100 })
export const pricesQuery = (productIDs: string[]) => {
	const products = productIDs
		.map(id => `product:"${id}"`)
		.join(' OR ')

	const query = `${products}`

	console.log(query)

	return {
		query,
		expand: ['data.currency_options'],
		limit: 100
	}
}

export const sessionQuery = (cartItems: any[]) => {
	//validate mininmum price?

	console.log(cartItems)

	const lineItems = cartItems
		.map((item) => ({
			price_data: {
				currency: 'EUR',
				unit_amount: item.price,
				tax_behavior: 'exclusive',
				product_data: {
					name: `${item.product.name}	${item.variant.name}`,
				},
			},
			quantity: item.count,
	}))

	return {
		line_items: [...lineItems],
		mode: 'payment',
		success_url: 'https://store.trust.support/success',
		cancel_url: 'https://store.trust.support',
		automatic_tax: {
			enabled: true
		},
		phone_number_collection: { enabled: true },
	}
}

