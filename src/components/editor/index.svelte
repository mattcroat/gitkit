<script lang="ts">
	import { setContext } from 'svelte'
	import { writable } from 'svelte/store'

	import Toolbar from './toolbar.svelte'
	import Editor from './editor.svelte'
	import Preview from './preview.svelte'

	export let title: string
	export let markdown: string

	const post = writable({ title, markdown })
	setContext('post', post)
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
		grid-template-rows: 60px calc(100% - 60px);
		overflow: hidden;
	}

	main {
		display: grid;
		grid-template-columns: repeat(2, 50%);
	}
</style>
