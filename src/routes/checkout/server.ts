import { client } from '$lib/stripe/client'
import type { RequestHandler } from '@sveltejs/kit'
import { client } from '$lib/stripe/client'
import { sessionQuery } from '$lib/stripe/queries'

/** @type {import('./$types').RequestHandler} */
export async function POST ({ request }) {
	//const data = await request.json()
	console.log(request)

	//console.log(data)

	//const session = await client.checkout.sessions.create(sessionQuery(data))

	//console.log(session)

	//return session
	return new Response({
		status: 200
	})
}

