import { client as stripeClient } from '$lib/stripe/client'
import { client as sanityClient } from '$lib/sanity/client'
import { client as discordClient } from '$lib/discord/client'
import { orderEmbed } from '$lib/discord/embeds'
// This is your Stripe CLI webhook secret for testing your endpoint locally.
import { endpointSecret } from '$lib/stripe/api'
import { createOrderTransaction } from  '$lib/sanity/transactions'

/** @type {import('./$types').RequestHandler} */
export async function POST ({ request }) {
	const signature = request.headers.get('stripe-signature')

  let event

  try {
		const buffer = Buffer.from(await request.arrayBuffer())

    event = stripeClient.webhooks.constructEvent(
			buffer,
			signature,
			endpointSecret
		)
  } catch (err) {
		console.error(err)

		return new Response({
			status: 400,
			message: `Webhook error: ${err}`
		})
  }

  if (event.type == 'checkout.session.completed') {
		// Unpack
		const checkoutSessionCompleted = event.data.object
		const sessionLineItems = await stripeClient
			.checkout
			.sessions
			.listLineItems(checkoutSessionCompleted.id)

		const lineItems = sessionLineItems.data

		const order = {
			id: checkoutSessionCompleted.id,
			total: checkoutSessionCompleted.amount_total,
			email: checkoutSessionCompleted?.customer_details?.email,
			name: checkoutSessionCompleted?.customer_details?.name,
			address: checkoutSessionCompleted?.customer_details?.address,
			phone: checkoutSessionCompleted?.customer_details?.phone,
			shipping: checkoutSessionCompleted?.shipping,
			lineItems
		}

		console.log('********************')
		console.log(order)
		console.log('********************')
		
		// Submit Sanity transaction
		try {
			const orderTransaction = createOrderTransaction(
					checkoutSessionCompleted,
					lineItems
			)

			await sanityClient.mutate(orderTransaction)
		} catch (err) {
			console.err('********************')
			console.err(err)
			console.err('********************')
		}

		//// Send Discord webhook
		//try {
		//	const embed = orderEmbed(
		//		checkoutSessionCompleted.shipping, 
		//		checkoutSessionCompleted.total,
		//		`https://trust.sanity.studio/structure/orders;${checkout.id}`,
		//		`https://dashboard.stripe.com/payments/${checkout.id}`,
		//		lineItems
		//	)

		//	discordClient.send(embed)
		//} catch (err) {
		//	console.err('********************')
		//	console.err(err)
		//	console.err('********************')
		//}
  } else {
		console.log(`Unhandled event type ${event.type}`)
	}

	return new Response({
		status: 200
	})
}

