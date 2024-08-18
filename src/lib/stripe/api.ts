import {
	PUBLIC_STRIPE_PUBLIC_KEY,
} from '$env/static/public'
import {
	PRIVATE_STRIPE_SECRET,
	PRIVATE_STRIPE_ENDPOINT_SECRET
} from '$env/static/private'
import { assertEnvVar } from '$lib/sanity/api'

export const publicKey = assertEnvVar(PUBLIC_STRIPE_PUBLIC_KEY)
export const secretKey = assertEnvVar(PRIVATE_STRIPE_SECRET)
export const endpointSecret = assertEnvVar(PRIVATE_STRIPE_ENDPOINT_SECRET)

