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
			'EU': 'shr_1PrqIyEsJX1Xg1qaR5Pe1m6v',
			'UK': 'shr_1Pq19bEsJX1Xg1qaCDqlRJoN',
			'Americas': 'shr_1PrqI1EsJX1Xg1qagnVuPCC7',
			'Asia': 'shr_1Pq1APEsJX1Xg1qakOdv2lc2',
			'Serbia': 'shr_1PqN60EsJX1Xg1qaQ6d8nsPx',
			'North Africa': 'shr_1Q3IadEsJX1Xg1qaoEMkWGiL',
			'Australia': 'shr_1Ps4CuEsJX1Xg1qa36uXvIL6',
		}

	const shippingRatesUntracked = {
			'DE': 'shr_1Q3Ib3EsJX1Xg1qafYWPGpJf',
			'EU': 'shr_1Q3IbeEsJX1Xg1qaRMulSkEy',
			'UK': 'shr_1Q3IPIEsJX1Xg1qagtRULgYE',
			'Americas': 'shr_1Q3IPoEsJX1Xg1qakdiTukg5',
			'Asia': 'shr_1Q3IQ4EsJX1Xg1qajsnHSi8N',
			'Serbia': 'shr_1Q3IQzEsJX1Xg1qalLK3sGBe',
			'North Africa': 'shr_1Q3IiVEsJX1Xg1qa04YF37iP',
		}

	const shippingRate = shippingRates[rate.shipping]
	const shippingRateUntracked = shippingRatesUntracked[rate.shipping]

	const collectVat = rate.shipping == 'EU' ||
		rate.shipping == 'DE' ||
		rate.shipping == 'Serbia' ||
		rate.shipping == 'Australia'

	const lineItems = cartItems
		.map((item) => {
			const unitAmount = collectVat ?
				Math.max(item.price / 1.19, 3500 / 1.19).toFixed(0) :
				Math.max(item.price, 3500)
						
			const taxRates = collectVat ?
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
		shipping_options: rate.shipping == 'DE' ? [
			{
				shipping_rate: shippingRate,
			},
			{
				shipping_rate: 'shr_1Ps4qXEsJX1Xg1qarvzcqOOy',
			},
			{
				shipping_rate: 'shr_1Q3Ib3EsJX1Xg1qafYWPGpJf',
			}
		] :
		[
			{
				shipping_rate: shippingRate
			},
			{
				shipping_rate: shippingRateUntracked
			}
		],
		phone_number_collection: {
			enabled: true
		}
	}
}

