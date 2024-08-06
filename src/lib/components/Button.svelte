<script lang="ts">
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	// By variant ID
	export let disabled: boolean
	export let on: boolean = false
	export let action: 'toggle' | 'submit' | 'remove' = 'toggle'
</script>

<button
	on:click={(e) => {
		dispatch('push', e)
		on = !on
	}}
	disabled={false}
	class="button"
	class:button--toggle={action == 'toggle'}
	class:button--toggle--on={on}
	class:button--submit={action == 'submit'}
	class:button--remove={action == 'remove'}
	>
	<slot/>
</button>

<style>
	.button {
		box-shadow: none;
		border: none;
		font-weight: 600;
		font-size: 1rem;
		text-align: center;
		cursor: pointer;
		font-weight: normal;
		transition: box-shadow linear 0.15s;
	}

	.button--toggle {
		background: var(--upsgray);
		box-shadow: inset 0 0 5px var(--upsgray-inv-30);
		color: var(--upsgray-inv);
		border-radius: 1px;
		padding: 1.75rem 2rem;
	}

	.button--toggle--on {
		background: var(--trustblau);
	}

	.button--submit {
		border-radius: 0px;
		background: var(--trustblau);
		color: var(--upsgray-inv);
		box-shadow: inset 0 0 5px var(--upsgray-inv-30);
		padding: 0.5rem 2rem;
		width: 100%;
	}

	.button--remove {
		border-radius: 0px;
		background: #ffffff00;
		color: var(--upsgray-inv);
		width: 100%;
	}

	.button[disabled] {
		background: #fff;
		cursor: not-allowed;
	}

	.button--toggle:not([disabled]):hover {
		box-shadow: inset 0 0 0.25px var(--upsgray-30);
	}

	.button--submit:not([disabled]):hover {
		box-shadow: inset 0 0 0.25px var(--upsgray-inv-30);
	}

	/*
	.button--highlighted {
		box-shadow: inset 0 0 15px #0075c4;
		background: var(--trustblau);
		transition: box-shadow 0.5s linear;
		border-radius: 4px;
	}	

	.button--submit.highlighted:not([disabled]):hover {
		background: var(--trustblau);
	}

	.button--submit-highlighted { }

	.button--submit-highlighted:not([disabled]):hover { }
	*/
</style>

