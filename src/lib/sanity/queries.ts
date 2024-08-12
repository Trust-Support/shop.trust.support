import type { PortableTextBlock } from '@portabletext/types'
import type { ImageAsset, Slug } from '@sanity/types'
import groq from 'groq'

/********************/
/* Products         */
/********************/
export const configQuery = groq`*[_type == "config"][0]`

export const productQuery = groq`*[_type == "product" && slug.current == $slug][0]`

export const productsQuery = groq`*[_type == "product" && defined(slug.current)] | order(createdAt desc)`

//export const productVariationQuery = groq`*[_type == "product" && defined(slug.current)] {  }`

//export const productAvailabilityQuery = groq`*[_type == "product" && defined(slug.current)] {  }`


export interface ProductVariation { 
	_type: 'productVariation';
	_createdAt: string;
	name: string;
	sku: string;
	quatnity: number;
}

export interface Product {
	_type: 'product';
	_createdAt: string;
	name?: string;
	slug: Slug;
	description: PortableTextBlock[];
	variations: ProductVariation[];
	images: ImageAsset[];
	//pricePointsEnabled: boolean;
	//pricePoints?: number[];
	price: number;
}

