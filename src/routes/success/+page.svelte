<script>
	import { page } from '$app/stores'

	const cachedCart = localStorage.setItem('cart', [])
</script>

<div class="success">
	<p>Order complete!</p>
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

