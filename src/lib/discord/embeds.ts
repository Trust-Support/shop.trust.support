import { dev } from '$app/environment'
import{ EmbedBuilder } from 'discord.js'

export const orderEmbed = ({ id, total, phone, email, shipping, lineItems }) => {
	const description = `Received an order for:` + 
		`${lineItems.map((amount, name) => `\n${amount}x ${name}`)}`

	const fields = [{
		name: 'Total',
		value: total,
		inline: true,
	},
	{
		name: 'Shipping',
		value: shipping,
		inline: true,
	}]

	const embed = new EmbedBuilder()
		//.setColor()
		//.setTimestamp()
		.setTitle('New order received')
		.setURL(`https://trust.sanity.studio/structure/orders;${id}`)
		.setDescription(description)
		.addFields(fields)
		.setFooter(`https://dashboard.stripe.com/${dev ? test : ''}/payments/${id}`)

	return {
		embeds: [embed]
	}
}

