<script lang="ts">
	import { getContext } from 'svelte'

	import { enhance } from '$root/lib/form'
	import { fileUrl } from '$root/lib/config'
	import type { EditorPostType } from '$root/types'

	const post: EditorPostType = getContext('post')
	const viewFileUrl = `${fileUrl}/${$post.slug}.md`
</script>

<div class="toolbar">
	<a class="back" href="/editor" sveltekit:prefetch>
		<svg
			width="24"
			height="24"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			stroke-width="2"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M10 19l-7-7m0 0l7-7m-7 7h18"
			/>
		</svg>
	</a>
	<span class="title">{$post.title}</span>
	<form method="post" use:enhance>
		<input type="hidden" name="markdown" value={$post.markdown} />
		<button class="save" type="submit">💾 Save</button>
	</form>
	<a href={viewFileUrl}>👁️ View</a>
</div>

<style>
	.toolbar {
		display: flex;
		align-items: center;
		gap: 1rem;
		background-color: hsl(0 0% 12%);
		border-bottom: 1px solid hsl(0 0% 20%);
	}

	.back {
		margin-left: 2.4rem;
		display: flex;
	}

	.title {
		height: 100%;
		display: flex;
		align-items: center;
		padding: 0 2rem;
		font-size: 2.4rem;
		font-weight: 700;
		border-right: 1px solid hsl(0 0% 20%);
	}

	a,
	button {
		color: hsl(0 0% 40%);
		text-decoration: none;
	}

	button:hover,
	a:hover {
		color: tomato;
	}
</style>
