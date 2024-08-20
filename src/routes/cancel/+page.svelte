<script>
	import { page } from '$app/stores';
</script>

<div class="cancel">
	<p>Order cancelled. </p>
	<p>Back to  <a href="/">front page</a>.</p>
</div>

<style>
	.cancel {
		align-self: center;
		margin: 0 auto;
		display: flex;
		gap: var(--space-row);
		flex-flow: column wrap;
	}
</style>

