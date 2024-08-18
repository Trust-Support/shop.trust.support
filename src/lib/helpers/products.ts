export const formatPrice = (price: number) => 
	!isNaN(price) ? (price / 100).toFixed(2) : undefined


export const reconcile = (sanityProducts: Product[], stripePrices: Price[]) => 
	sanityProducts.map((product) => ({
	...product,
	variants: product.variants.map((variant) => {
		const index = stripePrices
		.map((price) => price.product)
		.indexOf(variant.sku)

		if (index > -1) {
			const priceObject = stripePrices[index]

			const minPrice = priceObject?.custom_unit_amount?.minimum ||
				undefined

			const price = !minPrice ?
				priceObject.unit_amount :
				undefined

			return { ...variant, minPrice, price }
		}
	})
	.filter((variant) => variant !== undefined)
}))

