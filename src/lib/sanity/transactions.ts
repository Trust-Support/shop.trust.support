import { Transaction } from '@sanity/client'

// Log order + bump stock down
export const createOrderTransaction = (checkoutSession, lineItems) => {
	const transaction = new Transaction()

	console.log(lineItems)
		
	transaction.create({
		_id: checkoutSession.id,
		_type: 'order',
		email: checkoutSession.customer.email,
		link: 'https://dashboard.stripe.com/test/payments/${id}'
	})

	for (const lineItem of lineItems) {
		//const variantIndex = lineItem.variants.findIndex(variant => variant.sku === lineItem.sku)

		transaction
			.patch(lineItem.id, {
				dec: {
					quantity: lineItem.quantity
				}
			})
	}

	return transaction
}

