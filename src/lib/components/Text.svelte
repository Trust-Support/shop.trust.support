<script lang="ts">
	import { selectedProduct } from '../../store'
</script>

<div class="text">
	{@html $selectedProduct?.descriptionHtml}
</div>

<style>
	.text {
		padding: var(--space-row);
		background: #fff;
		align-self: stretch;
	}
</style>

