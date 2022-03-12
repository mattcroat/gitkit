<script lang="ts">
	import Editor from '$root/components/editor.svelte'
	import Preview from '$root/components/preview.svelte'

	export let slug: string
	export let markdown: string
</script>

<div class="toolbar">
	<form method="post">
		<input type="hidden" name="slug" value={slug} />
		<button class="save" type="submit">💾 Save</button>
	</form>
</div>

<main>
	<Editor bind:markdown />
	<Preview bind:markdown />
</main>

<style>
	main {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}

	.toolbar {
		padding: 1rem;
	}
</style>
