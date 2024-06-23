<script lang="ts">
	export let disabled: boolean
</script>

<button {disabled}>
	<slot/>
</button>

<style>
	button {
		border-radius: 1px;
		box-shadow: none;
		border: none;
		padding: 0.5rem 1rem;
		color: var(--upsgray);
		background: var(--trustblau);
		font-weight: 600;
		font-size: 1rem;
		text-align: center;
		cursor: pointer;
		/* Better transition */
		transition: color background 0.5s linear;
	}

	button[disabled] {
		background: #fff;
		cursor: not-allowed;
	}

	button:not([disabled]):hover {
		background: var(--trustblau);
	}

	button.highlight {
		background: var(--trustblau);
	}

	button.highlight:not([disabled]):hover {
		/* Glare anim? */
		/* Glow anim? */
	}
</style>
