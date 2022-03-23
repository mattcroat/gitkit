<script lang="ts">
	import { fade } from 'svelte/transition'
	import {
		Listbox,
		ListboxButton,
		ListboxLabel,
		ListboxOption,
		ListboxOptions
	} from '@rgossiaux/svelte-headlessui'

	const themes = [
		{ id: 1, name: '🌛 Night' },
		{ id: 2, name: '☀️ Daylight' },
		{ id: 3, name: '🐺 Night Howl' },
		{ id: 4, name: '🧠 Night Mind' }
	]

	let selectedTheme = themes[0]

	function handleChange(event: CustomEvent) {
		selectedTheme = event.detail
	}
</script>

<div class="listbox">
	<Listbox value={selectedTheme} on:change={handleChange} let:open>
		<ListboxLabel class="sr-only">Theme</ListboxLabel>

		<ListboxButton class="button">
			<span>{selectedTheme.name}</span>
			<span>
				<svg
					width="20"
					height="20"
					class="arrows"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/>
				</svg>
			</span>
		</ListboxButton>

		{#if open}
			<div transition:fade={{ duration: 100 }}>
				<ListboxOptions class="options" static>
					{#each themes as theme (theme.id)}
						<ListboxOption value={theme} let:active let:selected>
							<span class="option" class:active class:selected>
								{theme.name}
							</span>
						</ListboxOption>
					{/each}
				</ListboxOptions>
			</div>
		{/if}
	</Listbox>
</div>

<style>
	.listbox {
		max-width: 20ch;
	}

	.listbox :global(.button) {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem;
		background-color: hsl(220 20% 20%);
		border-radius: 2rem;
		box-shadow: 1px 0px 4px hsl(0 0% 0% / 20%);
	}

	.listbox :global(.arrows) {
		width: 20px;
		height: 20px;
		display: block;
		color: hsl(220 20% 60%);
	}

	.listbox :global(.options) {
		margin-top: 0.4rem;
		background-color: hsl(220 20% 20%);
		border-radius: 2rem;
		box-shadow: 1px 0px 4px hsl(0 0% 0% / 20%);
		list-style: none;
	}

	.listbox :global(.option) {
		display: block;
		padding: 0.8rem 2rem;
		border-radius: 2rem;
		cursor: pointer;
	}

	.listbox :global(.active) {
		color: hsl(220 20% 80%);
		background-color: hsl(220 20% 10%);
	}

	.listbox :global(.selected) {
		font-weight: 700;
	}

	.listbox :global(.sr-only) {
		width: 1px;
		height: 1px;
		position: absolute;
		margin: -1px;
		padding: 0;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
		overflow: hidden;
	}
</style>
