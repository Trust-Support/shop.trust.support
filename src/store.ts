import { writable, derived } from 'svelte/store'
import { browser } from '$app/environment'
import type { Product, ProductVariation } from '$lib/sanity/queries'

export interface CartProduct extends Product {
	quantity: number
	variation: ProductVariation
}

export type Cart = CartProduct[]

/********************/
/* Data             */
/********************/
export const products = writable([])

export const primaryColor = writable('red')

/********************/
/* Navigation       */
/********************/
export const selectedProductId: Writable<string> = writable('')

export const selectedVariantId: Writable<string> = writable('')

export const selectedProduct = derived(
		[products, selectedProductId],
		([$products, $selectedProductId]) => {
			return $products.filter(({ _id }) => _id == $selectedProductId)[0]
		})

export const selectedVariant = derived(
	[selectedProduct, selectedVariantId],
	([$selectedProduct, $selectedVariantId]) =>
		$selectedProduct.variants
			.filter(({ sku }) => sku == $selectedVariantId)[0]
)

/********************/
/* Session          */
/********************/
export const isCartLoading = writable(false)

export const cart: Writable<Cart> = (() => {
	const { subscribe, set, update } = writable([])

	return {
		subscribe,

		set,

		add: (product: Produt, variant: Variant, price: number) =>
			update((state) => {
				// Universally set price for all parent products

				const index = state.findIndex((item) =>
					item.variant.sku == variant.sku
				)

				if (index !== -1) {
					state[index].count += 1

					if (price !== state[index].price) {
						state[index].price = price
					}
				} else {
					state.push({
						product,
						variant,
						price,
						count: 1
					})
				}

				return state
		}),

		remove: (variant: Variant) =>
			update((state) =>  {
				const index = state.findIndex((item) =>
					item.variant.sku == variant.sku
				)

				if (index !== -1) {
					if (state[index].count > 1) {
						state[index].count -= 1
					} else {
						state.splice(index, 1)
					}
				}

				return state
		}),

		clear: () => set([])
	}
})()

cart.subscribe((val) =>
	browser && val?.length && localStorage.setItem('cart', JSON.stringify(val)))

export const cartCreatedAt = writable(
	(browser && localStorage.getItem('cartCreatedAt')) ||
	undefined
)

cartCreatedAt.subscribe((val) => 
	browser && localStorage.setItem('cartCreatedAt', val)
)

export const isCartIdExpired = derived(cartCreatedAt, ($cartCreatedAt) => {
	if (!$cartCreatedAt) {
		return true
	}

	const rn = Date.now()
	const delta = rn - $cartCreatedAt
	const days = Math.ceil(delta / (1000 * 3600 * 24))

	return days > 6
})

export const cartTotal = derived(cart, ($cart) =>
	$cart.reduce((sum, val) => sum += val.price * val.count, 0)
)

export const checkoutUrl = writable()

/********************/
/* Layout           */
/********************/
export const contentRects = writable([])

export const cartOpen = writable(false)

