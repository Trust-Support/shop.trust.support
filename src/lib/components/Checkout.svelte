<script lang="ts">
</script>

<div class="checkout">
	Checkout
		<div class="checkout__counter">
		2
	</div>
</div>

<style>
	.checkout {
		justify-self: end;
		align-self: start;
		grid-column: span 5;
		display: flex;
		flex-flow: column wrap;
		box-shadow: 0 25px 50px #00000050;
		background: #fff;
		padding: 1rem;
		position: relative;
	}

	.checkout__counter {
		position: absolute;
		left: -1rem;
		top: -0.5rem;
		padding: 0.5rem;
		border-radius: 100px;
		background: #fff;
	}

	@media (max-width: 1024px) {
		.checkout {
			width: 100%;
			grid-column: span 6;
			align-self: start;
			justify-self: start;
		}
	}
</style>
