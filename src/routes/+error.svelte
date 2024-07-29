<script>
	import { page } from '$app/stores';
</script>

<div class="error">
	<img src="./404.gif"/>
	<p>The page you are looking for does not exist. Try our <a href="/">front page</a>.</p>
</div>

<style>
	.error {
		align-self: center;
		margin: 0 auto;
		display: flex;
		gap: var(--space-row);
		flex-flow: column wrap;
	}

	.error img {
		align-self: center;
	}
</style>

