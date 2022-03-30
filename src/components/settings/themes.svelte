<script lang="ts">
	import { browser } from '$app/env'
	import { fade } from 'svelte/transition'
	import {
		Listbox,
		ListboxButton,
		ListboxLabel,
		ListboxOption,
		ListboxOptions
	} from '@rgossiaux/svelte-headlessui'

	const themes = {
		'🌛 Night': { name: '🌛 Night' },
		'☀️ Daylight': { name: '☀️ Daylight' },
		'🐺 Night Howl': { name: '🐺 Night Howl' },
		'🧠 Night Mind': { name: '🧠 Night Mind' }
	}

	let selectedTheme = getTheme() ?? themes['🌛 Night']

	function getTheme() {
		if (!browser) return

		const htmlElement = document.documentElement
		const userTheme = localStorage.theme
		const prefersDarkMode = window.matchMedia(
			'prefers-color-scheme: dark'
		).matches
		const prefersLightMode = window.matchMedia(
			'prefers-color-scheme: light'
		).matches

		// check if the user set a theme
		if (userTheme) {
			htmlElement.dataset.theme = userTheme
			return themes[userTheme]
		}

		// otherwise check for user preference
		if (!userTheme && prefersDarkMode) {
			htmlElement.dataset.theme = '🌛 Night'
			localStorage.theme = '🌛 Night'
		}

		if (!userTheme && prefersLightMode) {
			htmlElement.dataset.theme = '☀️ Daylight'
			localStorage.theme = '☀️ Daylight'
		}

		// if nothing is set default to dark mode
		if (!userTheme && !prefersDarkMode && !prefersLightMode) {
			htmlElement.dataset.theme = '🌛 Night'
			localStorage.theme = '🌛 Night'
		}

		return themes[userTheme]
	}

	function handleChange(event: CustomEvent) {
		selectedTheme = themes[event.detail.name]

		const htmlElement = document.documentElement
		htmlElement.dataset.theme = selectedTheme.name
		localStorage.theme = selectedTheme.name
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
					{#each Object.entries(themes) as [key, theme] (key)}
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
		--width: 184px;
	}

	.listbox :global(.button) {
		width: var(--width);
		position: relative;
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
		width: var(--width);
		position: absolute;
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
</style>
