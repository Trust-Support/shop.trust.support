import { cart, isCartLoading } from '../../store'

export const addToCart = async (
	product: Product,
	variantID: string,
	price: string
) => {
	isCartLoading.set(true)

	cart.add(product, variantID, price)

	// Fetch products
	// products.set()

	isCartLoading.set(false)
}


export const getCheckoutURL = async (cart, rate) => {
	try {
		const res = await fetch('/checkout', {
			method: 'POST',
			body: JSON.stringify({ cart, rate }),
			headers: {
				'Content-Type': 'application/json',
			}
		})

		const data = await res.json()

		return data.checkoutURL
	} catch (err) {
		console.error(err)
	}
}

