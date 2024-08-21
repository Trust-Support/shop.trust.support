import Stripe from 'stripe'
import { secretKey } from '$lib/stripe/api'

export const client = new Stripe(secretKey)

