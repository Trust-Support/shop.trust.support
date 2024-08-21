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
		success_url: dev ?
			'http://localhost:5173/success' :
			'https://store.trust.support/success',
		cancel_url: dev ?
			'http://localhost:5173/cancel' :
			'https://store.trust.support/cancel',
		shipping_address_collection: {
			allowed_countries: [
				'AU',
				'AT',
				'BE',
				'BR',
				'BG',
				'CA',
				'HR',
				'CY',
				'CZ',
				'DK',
				'EE',
				'FI',
				'FR',
				'DE',
				'GI',
				'GR',
				'HK',
				'HU',
				'IN',
				'ID',
				'IE',
				'IT',
				'JP',
				'LV',
				'LI',
				'LT',
				'LU',
				'MY',
				'MT',
				'MX',
				'NL',
				'NZ',
				'NO',
				'PL',
				'PT',
				'RO',
				'SG',
				'SK',
				'SI',
				'ES',
				'SE',
				'CH',
				'TH',
				'AE',
				'GB',
				'US'
			],
		},
		shipping_options: [
			{
				shipping_rate: 'shr_1PpH3UEsJX1Xg1qaH2OLxbko',
			},
		],
		//phone_number_collection: {
		//	enabled: true,
		//},
		automatic_tax: {
			enabled: true
		},
		phone_number_collection: { enabled: true },
	}
}

