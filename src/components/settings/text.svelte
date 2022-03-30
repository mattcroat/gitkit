<script lang="ts">
	import { browser } from '$app/env'

	const rootElement = browser ? document.documentElement : null
	let font = browser ? localStorage.size.replace('px', '') : 18
	let text = browser ? localStorage.text.replace('ch', '') : 60

	function handleFontSizeChange() {
		localStorage.size = `${font}px`
		rootElement.style.setProperty('--post-font-size', `${font}px`)
	}

	function handleTextLengthChange() {
		localStorage.text = `${text}ch`
		rootElement.style.setProperty('--post-reading-length', `${text}ch`)
	}
</script>

<div class="slider">
	<label for="font">
		<span class="unit">{font}px</span> font size
	</label>
	<input
		on:change={handleFontSizeChange}
		bind:value={font}
		type="range"
		name="font"
		id="font"
		min="16"
		max="24"
		step="1"
	/>
</div>

<div class="slider">
	<label for="text">
		<span class="unit">{text}ch</span> text length
	</label>
	<input
		on:change={handleTextLengthChange}
		bind:value={text}
		type="range"
		name="text"
		id="text"
		min="60"
		max="100"
		step="10"
	/>
</div>

<style>
	.slider {
		display: flex;
		flex-direction: column;
	}

	.unit {
		font-weight: 700;
	}
</style>
