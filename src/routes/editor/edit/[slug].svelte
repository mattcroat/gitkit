<script lang="ts">
	import Editor from '$root/components/editor/index.svelte'

	export let slug = ''
	export let title = ''
	export let markdown = ''
</script>

<Editor {slug} {title} {markdown} />
