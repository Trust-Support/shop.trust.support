import { Transaction } from '@sanity/client'
import { dev } from '$app/environment'

// Log order
export const createOrderTransaction = ({ id, total, phone, email, address, shipping, name, lineItems }) => {
	const transaction = new Transaction()

	const customerDetails = checkoutSession?.customer_details

	transaction.create({
		_id: checkoutSession?.id,
		_type: 'order',
		phone: phone,
		email: email,
		address: `${address?.name}\n\n` +
		`${address?.city}\n` +
		`${address?.line1}\n` +
		`${address?.line2}\n` +
		`${address?.postal_code}\n` +
		`${address?.state}\n` +
		`${address?.country}\n`,
		stripeLink: `https://dashboard.stripe.com/${dev ? test : ''}/payments/${id}`,
		amount: checkoutSession?.amount,
	})

	// Track inventory
	for (const lineItem of lineItems) {
		const variantId = lineItem.product_data.metadata.variant_id

		const variant = `variants[sku == "${variantId}"].quantity`

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

