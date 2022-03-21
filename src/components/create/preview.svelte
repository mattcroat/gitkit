<script lang="ts">
	import { getContext } from 'svelte'
	import { io } from 'socket.io-client'
	import type { EditorPostType } from '$root/types'

	const socket = io()
	const post: EditorPostType = getContext('post')

	let preview = ''

	$: {
		// send message to server
		socket.emit('updatePreview', $post.markdown)
		// receive message from server
		socket.on('previewUpdate', (html) => (preview = html))
	}
</script>

{#if $post.preview}
	<section class="preview">
		<div class="prose">
			{@html preview}
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
