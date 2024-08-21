<script lang="ts">
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	// By variant ID
	export let disabled: boolean
	export let toggled: boolean = false
	export let options: string[] | number[]
</script>

<select
	on:change={(e) => {
		!disabled && dispatch('select', e.target.value)
	}}
	disabled={disabled}
	class="select"
	>
	{#each options as { code, name }}
		<option selected disabled hidden>Select country</option>	
		<option value={code}>{name}</option>
	{/each}
</select>

<style>
	.select {
		background: #fff;
		border: none;
		color: var(--upsgray-inv);
		padding: 0;
		font-weight: 300;
		font-size: 1rem;
		cursor: pointer;
		transition: box-shadow linear 0.15s;
		touch-action: manipulation;
	}
</style>

