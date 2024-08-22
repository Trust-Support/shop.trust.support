import { Transaction } from '@sanity/client'

// Log order + bump stock down
export const createOrderTransaction = (checkoutSession, lineItems) => {
	const transaction = new Transaction()

	
	//transaction.create({
	//	_id: checkoutSession.id,
	//	_type: 'order',
	//	email: checkoutSession.customer.email,
	//	link: 'https://dashboard.stripe.com/test/payments/${id}'
	//})

	for (const lineItem of lineItems) {
		const variant = `variants[sku == "${lineItem.product_data.metadata.variant_id}"].quantity`

		transaction
			.patch(lineItem.product_data.metadata.product_id, patch => 
				patch.setIfMissing({ variants: [] })
				.dec({
					[variant]: lineItem.quantity
				})
		)
	}

	return transaction
}

