import {
	PRIVATE_DISCORD_WEBHOOK_URL
} from '$env/static/private'

export function assertEnvVar<T> (value: T | undefined, name: string): T {
	if (value === undefined) {
		throw new Error(`Missing environment variable: ${name}`)
	}
	return value
}

export const webhookUrl = assertEnvVar(
	PRIVATE_DISCORD_WEBHOOK_URL,
	'PRIVATE_DISCORD_WEBHOOK_URL'
)
