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
	const shippingRates = {
			'DE': 'shr_1Pq18sEsJX1Xg1qaJ8k7hbYk',
			'EU': 'shr_1Pq19FEsJX1Xg1qaI1rdbEi4',
			'UK': 'shr_1Pq19bEsJX1Xg1qaCDqlRJoN',
			'Americas': 'shr_1Pq19xEsJX1Xg1qayS7t3VOj',
			'Asia': 'shr_1Pq1APEsJX1Xg1qakOdv2lc2',
			'Serbia': 'shr_1PqN60EsJX1Xg1qaQ6d8nsPx',
			'North Africa': 'shr_1PqN5REsJX1Xg1qaVy3VJZO1',
		}

	const shippingRate = shippingRates[rate.shipping]

	const lineItems = cartItems
		.map((item) => {
			const unitAmount = (rate.shipping == 'EU') ?
				Math.max(item.price / 1.19, 3500 / 1.19).toFixed(0) :
				Math.max(item.price, 3500)
						
			const taxRates = (rate.shipping == 'EU') ?
			// 19%
					['txr_1Flc6QEsJX1Xg1qaCAyEcp6X'] :
			// 0%
					['txr_1PrnjnEsJX1Xg1qaVYBHCpJ0']
	
			return {
				price_data: {
					currency: 'EUR',
					unit_amount: unitAmount,
					tax_behavior: 'exclusive',
					product_data: {
						name: `${item.product.name}	${item.variant.name}`,
						metadata: {
							product_id: item.product.id,
							variant_id: item.variant.sku,
						}
					}
				},
				tax_rates: taxRates,
			quantity: item.count,
		}
	})

	return {
		line_items: [...lineItems],
		mode: 'payment',
		payment_method_types: ['card'],
		success_url: dev ?
			'http://localhost:5173/success' :
			'https://shop.trust.support/success',
		cancel_url: dev ?
			'http://localhost:5173/' :
			'https://shop.trust.support/',
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
		//automatic_tax: {
		//	enabled: false
		//},
		phone_number_collection: {
			enabled: true
		}
	}
}

