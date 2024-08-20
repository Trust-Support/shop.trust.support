<script>
	import { page } from '$app/stores'
	import { browser } from '$app/environment'

	// Clear cart
	if (browser) {
		localStorage.setItem('cart', [])
	}
</script>

<div class="success">
	<p>{`Order received`}</p>
	<p>{`Thank you <3`}</p>
</div>

<style>
	.success {
		align-self: center;
		margin: 0 auto;
		display: flex;
		gap: var(--space-row);
		flex-flow: column wrap;
	}
</style>

