import Stripe from 'stripe'
import { secretKey } from '$lib/stripe/api'

export const client = new Stripe('sk_test_bsfMNN7eEoK9SrRj8YtNbOKp')

