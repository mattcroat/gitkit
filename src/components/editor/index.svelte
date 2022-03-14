<script lang="ts">
	import Toolbar from './toolbar.svelte'
	import Editor from './editor.svelte'
	import Preview from './preview.svelte'
</script>

<div class="editor">
	<Toolbar />
	<main>
		<Editor />
		<Preview />
	</main>
</div>

<style>
	.editor {
		height: 100%;
		display: grid;
		grid-template-rows: 40px calc(100% - 40px);
	}

	main {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}
</style>
