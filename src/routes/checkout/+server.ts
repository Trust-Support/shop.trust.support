import type { RequestHandler } from '@sveltejs/kit'
import { client } from '$lib/stripe/client'
import { sessionQuery } from '$lib/stripe/queries'

/** @type {import('./$types').RequestHandler} */
export async function POST ({ request }) {
	const data = await request.json()

	const session = await client.checkout.sessions.create(sessionQuery(data))

	return new Response(JSON.stringify({ checkoutURL: session.url }))
}

