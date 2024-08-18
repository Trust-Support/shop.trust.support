<script lang="ts">
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
</script>

<div
	class="block"
	>
	<!--transition:scale={{
		delay: 0,
		duration: 750,
		x: 100,
		y: 500,
		opacity: 0.5,
		easing: quintOut
	}}-->
	<slot/>	
</div>

<style>
	.block {
		display: flex;
		flex-flow: column wrap;
		align-self: stretch;
		gap: var(--space-row);
		background: #fff;
	}
</style>

