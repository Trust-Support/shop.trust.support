
import { WebhookClient } from 'discord.js'
import { webhookUrl as url }  from './api'

export const client = new WebhookClient({ url })

