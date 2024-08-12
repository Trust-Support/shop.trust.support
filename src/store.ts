import { writable, derived } from 'svelte/store'
import { browser } from '$app/environment'

/********************/
/* Data             */
/********************/
export const products = writable([])

/********************/
/* Navigation       */
/********************/
export const selectedProductId = writable('')

export const selectedVariantId = writable('')

export const selectedProduct = derived(
		[products, selectedProductId],
		([$products, $selectedProductId]) => {
			console.log('********************')
			console.log($products)
			console.log($selectedProductId)
			console.log('********************')
			return $products.filter(({ _id }) => _id == $selectedProductId)[0]
		})

export const selectedVariant = writable('0')

//export const selectedVariant = derived(
//	[selectedProduct, selectedVariantId],
//	([$selectedProduct, $selectedVariantId]) =>
//		$selectedProduct.variants.filter(({ id }) =>
//			id == $selectedVariantId)[0])

/********************/
/* Session          */
/********************/
export const isCartLoading = writable(false)

//export const cartId = writable(
//	(browser && localStorage.getItem('cartId')) ||
//	undefined
//)

export const cart = writable([])

cart.subscribe((val) => 
	browser && localStorage.setItem('cart', JSON.stringify(val))
)

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

export const cartTotal = derived(cart, ($cart) => $cart.reduce((sum, val) => sum += val, 0))

export const checkoutUrl = derived(cart, ($cart) => {})
	//$cart?.body?.data?.cartCreate?.cart?.checkoutUrl)

//export const cartItems = derived(cart, ($cart) =>
//	$cart.lines.edges)

/********************/
/* Layout           */
/********************/
export const contentRects = writable([])

