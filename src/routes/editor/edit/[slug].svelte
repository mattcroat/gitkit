<script lang="ts">
	import { setContext } from 'svelte'
	import { writable } from 'svelte/store'

	import Editor from '$root/components/editor/index.svelte'

	export let markdown: string

	const content = writable<string>(markdown)
	setContext('markdown', content)
</script>

<Editor />
