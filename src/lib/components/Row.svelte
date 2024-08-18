<script lang="ts">
</script>

<section class="row">
	<slot/>	
</section>

<style>
	.row {
		display: flex;
		flex-grow: 1;
		gap: 1rem;
		flex-flow: column wrap;
		padding: var(--space-row);
	}
</style>

