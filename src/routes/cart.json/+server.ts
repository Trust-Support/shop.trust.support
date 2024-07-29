import {
	createCart,
	fetchCart,
	addToCart,
	updateCart
} from '$lib/utils/shopify'
import { error } from '@sveltejs/kit'

export async function GET ({ url }) {
	const cartId = url.searchParams.get('cartId')

	const response = await fetchCart(cartId)

	if (response.status === 200) {
		return new Response({ data: 'test' })
	} else {
		throw error(response.status)
	}
}

export async function POST () {
	await createCart()

	return new Response({ data: {} })
}

export async function PUT ({ request }) {
	const body = await request.json()
	const response = await updateCart(body)

	if (response.status === 200) {
		return new Response({ data: response.body.data })
	} else {
		throw error(response.status)
	}
}

export async function PATCH ({ request }) {
	const body = await request.json()
	const response = await addToCart(body)

	if (response.status === 200) {
		return new Response({ data: response.body.data })
	} else {
		throw error(response.status)
	}
}

