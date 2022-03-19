<script lang="ts">
	import { getContext } from 'svelte'
	import type { EditorPostType } from '$root/types'

	const post: EditorPostType = getContext('post')

	async function showPreview(postMarkdown) {
		await fetch('/api/preview', {
			method: 'post',
			headers: { accept: 'application/json' },
			body: JSON.stringify(postMarkdown)
		})
		const result = await fetch('/api/preview')
		const data = await result.json()
		return data
	}
</script>

{#if $post.preview}
	<section class="preview">
		<div class="prose">
			{#await showPreview($post.markdown)}
				<p>Processing...</p>
			{:then data}
				{@html data.content.content}
			{:catch error}
				<p>{error.message}</p>
			{/await}
		</div>
	</section>
{/if}

<style>
	.preview {
		padding: 1rem 2rem;
		background-color: hsl(0 0% 12%);
		overflow: auto;
		scrollbar-width: thin;
	}

	.preview::-webkit-scrollbar {
		width: 2px;
		background-color: transparent;
	}

	.preview:hover::-webkit-scrollbar-thumb {
		background-color: hsl(0, 0%, 60%);
	}
</style>
