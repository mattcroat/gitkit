<script lang="ts">
	import Editor from '$root/components/editor/index.svelte'

	export let title = ''
	export let markdown = ''
</script>

<Editor {title} {markdown} />
