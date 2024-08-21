import { dev } from '$app/environment';

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

export const sessionQuery = (cartItems: any[], rate: any) => {
	//validate mininmum price?

	const shippingRates = {
		'DE': 'shr_1Pq18sEsJX1Xg1qaJ8k7hbYk',
		'EU': 'shr_1Pq19FEsJX1Xg1qaI1rdbEi4',
		'UK': 'shr_1Pq19bEsJX1Xg1qaCDqlRJoN',
		'Americas': 'shr_1Pq19xEsJX1Xg1qayS7t3VOj',
		'Asia': 'shr_1Pq1APEsJX1Xg1qakOdv2lc2',
		'Serbia': 'shr_1PqN60EsJX1Xg1qaQ6d8nsPx',
		'North Africa': 'shr_1PqN5REsJX1Xg1qaVy3VJZO1',
	}

	console.log(rate)
	
	const shippingRate = shippingRates[rate.shipping]

	const lineItems = cartItems
		.map((item) => ({
			price_data: {
				currency: 'EUR',
				// :D
				unit_amount: Math.max(item.price, 3500),
					//item.product.slidingScalePricing ?
					//Math.max(item.price, item.product.minPrice) :
					//item.product.price,
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
		success_url: dev ?
			'http://localhost:5173/success' :
			'https://shop.trust.support/success',
		cancel_url: dev ?
			'http://localhost:5173/cancel' :
			'https://shop.trust.support/cancel',
		shipping_address_collection: {
			allowed_countries: [
				rate.code,
			],
		},
		shipping_options: [
			{
				shipping_rate: shippingRate,
			},
		],
		phone_number_collection: {
			enabled: true,
		},
		automatic_tax: {
			enabled: true
		},
		phone_number_collection: { enabled: true },
	}
}

