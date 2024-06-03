<script lang="ts">
	import Item from '$lib/components/Item.svelte'
	import Buy from '$lib/components/Buy.svelte'
	import Range from '$lib/components/Range.svelte'

	let value = 1
</script>

<div class="item">
	<img class="item__image" srcset="" src="./shirt.png"/>
	<div class="item__actions">
		<Buy/>
	</div>
</div>

<!--<Range on:change={(e) => value = e.detail.value} id="basic-slider" max="{230}" min="{5}" initialValue="{value}"/>-->

<style>
	.item {
		grid-column: span 1;
		display: flex;
		align-self: start;
		flex-flow: column wrap;
		box-shadow: 0 25px 50px #00000050;
		background: #fff;
		padding: 1rem 0.5rem 0.5rem 0.5rem;
	}

	.item__image {
		display: block;
	}
	
	.item__actions {
		padding: 0.25rem;
		display: flex;
		gap: 1rem;
		flex-flow: column wrap;
		align-items: center;
	}

	@media (max-width: 1024px) {
		.item {
			width: 100%;
			grid-row: span 6;
			grid-column: span 6;
			align-self: start;
			justify-self: start;
		}
	}
</style>
