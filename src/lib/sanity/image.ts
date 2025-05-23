import imageUrlBuilder from '@sanity/image-url'
import type { Image } from '@sanity/types'
import { client } from './client'

const builder = imageUrlBuilder(client)

export function urlFor (source: Image): string {
	return builder.image(source)
}
