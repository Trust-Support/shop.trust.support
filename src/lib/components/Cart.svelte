<script lang="ts">
	import { cart, cartTotal, isCartLoading, shippingRate } from '../../store'
	import { browser } from '$app/environment'
	import Button from '$lib/components/Button.svelte'
	import Select from '$lib/components/Select.svelte'
	import Row from '$lib/components/Row.svelte'
	import { formatPrice } from '$lib/helpers/products'
	import { getCheckoutURL } from '$lib/helpers/cart'

	const countries = [
		{ 'name': 'Germany', 'code': 'DE', 'shipping': 'DE' },

		{ 'name': 'Åland Islands', 'code': 'AX', 'shipping': 'EU' },
		{ 'name': 'Albania', 'code': 'AL', 'shipping': 'EU' },
		{ 'name': 'Andorra', 'code': 'AD', 'shipping': 'EU' },
		{ 'name': 'Austria', 'code': 'AT', 'shipping': 'EU' },
		{ 'name': 'Belgium', 'code': 'BE', 'shipping': 'EU' },
		{ 'name': 'Bosnia and Herzegovina', 'code': 'BA', 'shipping': 'EU' },
		{ 'name': 'Bulgaria', 'code': 'BG', 'shipping': 'EU' },
		{ 'name': 'Croatia', 'code': 'HR', 'shipping': 'EU' },
		{ 'name': 'Cyprus', 'code': 'CY', 'shipping': 'EU' },
		{ 'name': 'Czech Republic', 'code': 'CZ', 'shipping': 'EU' },
		{ 'name': 'Denmark', 'code': 'DK', 'shipping': 'EU' },
		{ 'name': 'Estonia', 'code': 'EE', 'shipping': 'EU' },
		{ 'name': 'Finland', 'code': 'FI', 'shipping': 'EU' },
		{ 'name': 'France', 'code': 'FR', 'shipping': 'EU' },
		{ 'name': 'Greece', 'code': 'GR', 'shipping': 'EU' },
		{ 'name': 'Hungary', 'code': 'HU', 'shipping': 'EU' },
		{ 'name': 'Iceland', 'code': 'IS', 'shipping': 'EU' },
		{ 'name': 'Italy', 'code': 'IT', 'shipping': 'EU' },
		{ 'name': 'Latvia', 'code': 'LV', 'shipping': 'EU' },
		{ 'name': 'Liechtenstein', 'code': 'LI', 'shipping': 'EU' },
		{ 'name': 'Lithuania', 'code': 'LT', 'shipping': 'EU' },
		{ 'name': 'Luxembourg', 'code': 'LU', 'shipping': 'EU' },
		{ 'name': 'Malta', 'code': 'MT', 'shipping': 'EU' },
		{ 'name': 'Monaco', 'code': 'MC', 'shipping': 'EU' },
		{ 'name': 'Montenegro', 'code': 'ME', 'shipping': 'EU' },
		{ 'name': 'Netherlands', 'code': 'NL', 'shipping': 'EU' },
		{ 'name': 'North Macedonia', 'code': 'MK', 'shipping': 'EU' },
		{ 'name': 'Norway', 'code': 'NO', 'shipping': 'EU' },
		{ 'name': 'Poland', 'code': 'PL', 'shipping': 'EU' },
		{ 'name': 'Portugal', 'code': 'PT', 'shipping': 'EU' },
		{ 'name': 'Romania', 'code': 'RO', 'shipping': 'EU' },
		{ 'name': 'San Marino', 'code': 'SM', 'shipping': 'EU' },
		{ 'name': 'Serbia', 'code': 'RS', 'shipping': 'EU' },
		{ 'name': 'Slovakia', 'code': 'SK', 'shipping': 'EU' },
		{ 'name': 'Slovenia', 'code': 'SI', 'shipping': 'EU' },
		{ 'name': 'Spain', 'code': 'ES', 'shipping': 'EU' },
		{ 'name': 'Sweden', 'code': 'SE', 'shipping': 'EU' },
		{ 'name': 'Switzerland', 'code': 'CH', 'shipping': 'EU' },
		{ 'name': 'Vatican City', 'code': 'VA', 'shipping': 'EU' },

		{ 'name': 'United Kingdom', 'code': 'GB', 'shipping': 'UK' },
		{ 'name': 'Ireland', 'code': 'IE', 'shipping': 'UK' },

		{ 'name': 'Antigua and Barbuda', 'code': 'AG', 'shipping': 'Americas' },
		{ 'name': 'Argentina', 'code': 'AR', 'shipping': 'Americas' },
		{ 'name': 'Bahamas', 'code': 'BS', 'shipping': 'Americas' },
		{ 'name': 'Barbados', 'code': 'BB', 'shipping': 'Americas' },
		{ 'name': 'Belize', 'code': 'BZ', 'shipping': 'Americas' },
		{ 'name': 'Bolivia', 'code': 'BO', 'shipping': 'Americas' },
		{ 'name': 'Brazil', 'code': 'BR', 'shipping': 'Americas' },
		{ 'name': 'Canada', 'code': 'CA', 'shipping': 'Americas' },
		{ 'name': 'Chile', 'code': 'CL', 'shipping': 'Americas' },
		{ 'name': 'Colombia', 'code': 'CO', 'shipping': 'Americas' },
		{ 'name': 'Costa Rica', 'code': 'CR', 'shipping': 'Americas' },
		{ 'name': 'Cuba', 'code': 'CU', 'shipping': 'Americas' },
		{ 'name': 'Dominica', 'code': 'DM', 'shipping': 'Americas' },
		{ 'name': 'Dominican Republic', 'code': 'DO', 'shipping': 'Americas' },
		{ 'name': 'Ecuador', 'code': 'EC', 'shipping': 'Americas' },
		{ 'name': 'El Salvador', 'code': 'SV', 'shipping': 'Americas' },
		{ 'name': 'Grenada', 'code': 'GD', 'shipping': 'Americas' },
		{ 'name': 'Guatemala', 'code': 'GT', 'shipping': 'Americas' },
		{ 'name': 'Guyana', 'code': 'GY', 'shipping': 'Americas' },
		{ 'name': 'Haiti', 'code': 'HT', 'shipping': 'Americas' },
		{ 'name': 'Honduras', 'code': 'HN', 'shipping': 'Americas' },
		{ 'name': 'Jamaica', 'code': 'JM', 'shipping': 'Americas' },
		{ 'name': 'Mexico', 'code': 'MX', 'shipping': 'Americas' },
		{ 'name': 'Nicaragua', 'code': 'NI', 'shipping': 'Americas' },
		{ 'name': 'Panama', 'code': 'PA', 'shipping': 'Americas' },
		{ 'name': 'Paraguay', 'code': 'PY', 'shipping': 'Americas' },
		{ 'name': 'Peru', 'code': 'PE', 'shipping': 'Americas' },
		{ 'name': 'Saint Kitts and Nevis', 'code': 'KN', 'shipping': 'Americas' },
		{ 'name': 'Saint Lucia', 'code': 'LC', 'shipping': 'Americas' },
		{ 'name': 'Saint Vincent and the Grenadines', 'code': 'VC', 'shipping': 'Americas' },
		{ 'name': 'Suriname', 'code': 'SR', 'shipping': 'Americas' },
		{ 'name': 'Trinidad and Tobago', 'code': 'TT', 'shipping': 'Americas' },
		{ 'name': 'United States', 'code': 'US', 'shipping': 'Americas' },
		{ 'name': 'Uruguay', 'code': 'UY', 'shipping': 'Americas' },
		{ 'name': 'Venezuela', 'code': 'VE', 'shipping': 'Americas' },

		{ 'name': 'Afghanistan', 'code': 'AF', 'shipping': 'Asia' },
		{ 'name': 'Armenia', 'code': 'AM', 'shipping': 'Asia' },
		{ 'name': 'Azerbaijan', 'code': 'AZ', 'shipping': 'Asia' },
		{ 'name': 'Bahrain', 'code': 'BH', 'shipping': 'Asia' },
		{ 'name': 'Bangladesh', 'code': 'BD', 'shipping': 'Asia' },
		{ 'name': 'Bhutan', 'code': 'BT', 'shipping': 'Asia' },
		{ 'name': 'Brunei Darussalam', 'code': 'BN', 'shipping': 'Asia' },
		{ 'name': 'Burma/Myanmar', 'code': 'MM', 'shipping': 'Asia' },
		{ 'name': 'Cambodia', 'code': 'KH', 'shipping': 'Asia' },
		{ 'name': 'China', 'code': 'CN', 'shipping': 'Asia' },
		{ 'name': 'Georgia', 'code': 'GE', 'shipping': 'Asia' },
		{ 'name': 'India', 'code': 'IN', 'shipping': 'Asia' },
		{ 'name': 'Indonesia', 'code': 'ID', 'shipping': 'Asia' },
		{ 'name': 'Iran', 'code': 'IR', 'shipping': 'Asia' },
		{ 'name': 'Iraq', 'code': 'IQ', 'shipping': 'Asia' },
		{ 'name': 'Japan', 'code': 'JP', 'shipping': 'Asia' },
		{ 'name': 'Jordan', 'code': 'JO', 'shipping': 'Asia' },
		{ 'name': 'Kazakhstan', 'code': 'KZ', 'shipping': 'Asia' },
		{ 'name': 'Kiribati', 'code': 'KI', 'shipping': 'Asia' },
		{ 'name': 'Korea, Democratic People\'s Republic of', 'code': 'KP', 'shipping': 'Asia' },
		{ 'name': 'Korea, Republic of', 'code': 'KR', 'shipping': 'Asia' },
		{ 'name': 'Kuwait', 'code': 'KW', 'shipping': 'Asia' },
		{ 'name': 'Kyrgyzstan', 'code': 'KG', 'shipping': 'Asia' },
		{ 'name': 'Lao People\'s Democratic Republic', 'code': 'LA', 'shipping': 'Asia' },
		{ 'name': 'Lebanon', 'code': 'LB', 'shipping': 'Asia' },
		{ 'name': 'Maldives', 'code': 'MV', 'shipping': 'Asia' },
		{ 'name': 'Marshall Islands', 'code': 'MH', 'shipping': 'Asia' },
		{ 'name': 'Micronesia, Federated States of', 'code': 'FM', 'shipping': 'Asia' },
		{ 'name': 'Mongolia', 'code': 'MN', 'shipping': 'Asia' },
		{ 'name': 'Nauru', 'code': 'NR', 'shipping': 'Asia' },
		{ 'name': 'Nepal', 'code': 'NP', 'shipping': 'Asia' },
		{ 'name': 'Oman', 'code': 'OM', 'shipping': 'Asia' },
		{ 'name': 'Pakistan', 'code': 'PK', 'shipping': 'Asia' },
		{ 'name': 'Palau', 'code': 'PW', 'shipping': 'Asia' },
		{ 'name': 'Papua New Guinea', 'code': 'PG', 'shipping': 'Asia' },
		{ 'name': 'Philippines', 'code': 'PH', 'shipping': 'Asia' },
		{ 'name': 'Qatar', 'code': 'QA', 'shipping': 'Asia' },
		{ 'name': 'Samoa', 'code': 'WS', 'shipping': 'Asia' },
		{ 'name': 'Saudi Arabia', 'code': 'SA', 'shipping': 'Asia' },
		{ 'name': 'Singapore', 'code': 'SG', 'shipping': 'Asia' },
		{ 'name': 'Solomon Islands', 'code': 'SB', 'shipping': 'Asia' },
		{ 'name': 'Sri Lanka', 'code': 'LK', 'shipping': 'Asia' },
		{ 'name': 'Syria', 'code': 'SY', 'shipping': 'Asia' },
		{ 'name': 'Taiwan, Province of China', 'code': 'TW', 'shipping': 'Asia' },
		{ 'name': 'Tajikistan', 'code': 'TJ', 'shipping': 'Asia' },
		{ 'name': 'Thailand', 'code': 'TH', 'shipping': 'Asia' },
		{ 'name': 'Timor-Leste', 'code': 'TL', 'shipping': 'Asia' },
		{ 'name': 'Tonga', 'code': 'TO', 'shipping': 'Asia' },
		{ 'name': 'Turkmenistan', 'code': 'TM', 'shipping': 'Asia' },
		{ 'name': 'Tuvalu', 'code': 'TV', 'shipping': 'Asia' },
		{ 'name': 'United Arab Emirates', 'code': 'AE', 'shipping': 'Asia' },
		{ 'name': 'Uzbekistan', 'code': 'UZ', 'shipping': 'Asia' },
		{ 'name': 'Vanuatu', 'code': 'VU', 'shipping': 'Asia' },
		{ 'name': 'Vietnam', 'code': 'VN', 'shipping': 'Asia' },
		{ 'name': 'Yemen', 'code': 'YE', 'shipping': 'Asia' },

		{ 'name': 'Serbia', 'code': 'RS', 'shipping': 'Serbia' },

		{ 'name': 'Algeria', 'code': 'DZ', 'shipping': 'North Africa' },
		{ 'name': 'Egypt', 'code': 'EG', 'shipping': 'North Africa' },
		{ 'name': 'Libya', 'code': 'LY', 'shipping': 'North Africa' },
		{ 'name': 'Morocco', 'code': 'MA', 'shipping': 'North Africa' },
		{ 'name': 'Sudan', 'code': 'SD', 'shipping': 'North Africa' },
		{ 'name': 'Tunisia', 'code': 'TN', 'shipping': 'North Africa' },
	]

	const shippingRates = {
		'DE': 549,
		'EU': 1449,
		'UK': 2699,
		'Americas': 4799,
		'Asia': 4599,
		'Serbia': 2999,
		'North Africa': 3799,
	}

	let selectedCountry

	if (browser) {
		try {
			const cachedCart = JSON.parse(localStorage.getItem('cart'))

			if (cachedCart?.length) {
				cart.set(cachedCart)
				console.log($cart)
			}
		} catch (err) {
			console.error(err)
		}
	}


	const checkout = async () => {
			$isCartLoading = true

			const checkoutURL = await getCheckoutURL($cart, $shippingRate)

			$isCartLoading = false

			window.location.href = checkoutURL
	p}
</script>

{#if $cart?.length > 0}
<Row>
	<table class="cart__table">
		{#each $cart as { product, variant, price, count }}
			<tr>
				<td>
					{count}x {product.name} {variant.name}
				</td>
				<td>
					{formatPrice(price)} EUR
				</td>
				<td>
					<Button
						style="remove"
						on:push={() => {
							cart.remove(variant)
						}}
						>
							-
						</Button>
				</td>	
			</tr>
		{/each}

			<tfoot>
				<tr>
					<td>Shipping</td>
					<td>
					<Select
						options={countries}
						on:select={(e) => {
							const index = countries.findIndex(({ code }) => code == e.detail)

							if (index > -1) {
								selectedCountry = countries[index]
								$shippingRate = {
									code: selectedCountry.code,
									shipping: selectedCountry.shipping,
									rate: shippingRates[selectedCountry?.shipping],
								}
							}
						}}
						/>
					</td>
				</tr>
				<tr>
					<td>
						Total
					</td>
					<td>
						<b>{formatPrice($cartTotal)} EUR</b>
						{#if $shippingRate !== undefined}
							<span class="note">+ {formatPrice($shippingRate.rate)} EUR shipping (tracked)</span>
						{/if}
					</td>
				</tr>
			</tfoot>
	</table>
</Row>

<Button
	style="submit"
	on:push={checkout}
	disabled={!selectedCountry}
	>
	Checkout
</Button>
{:else}
	<Row>
		<p>Cart empty</p>
	</Row>
{/if}
<style>
	.cart {
		background: #fff;
		align-self: stretch;
	}

	.cart__row {
		padding: var(--space-row);
	}

	.cart__table {
		border-collapse: collapse;
    table-layout : fixed;
		width: 100%;
	}

	.cart__table td {
		padding: var(--space-row) 0;
		vertical-align: middle;
	}


	.cart__table > tr:first-child td {
		padding-top: 0;
	}

	.cart__table select {
		border: 1px solid var(--trustblau);
		background: #fff;
		font-size: 1rem;
		padding: var(--space-row);
	}
	
	tfoot {
		border-top: 1px solid var(--trustblau);
		width: 100%;
	}

	tfoot tr:last-child td {
		padding-bottom: 0;
	}
</style>

