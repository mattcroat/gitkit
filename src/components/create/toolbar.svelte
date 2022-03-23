<script lang="ts">
	import { getContext } from 'svelte'
	import { ArrowLeftIcon, SaveIcon } from '@rgossiaux/svelte-heroicons/outline'

	import { enhance } from '$root/lib/form'
	import type { EditorPostType } from '$root/types'

	const post: EditorPostType = getContext('post')

	$: title = $post.markdown.match(/title: (.*)/)[1].trim()
	$: slug = $post.markdown.match(/slug: '(.*)'/)[1].trim()
</script>

<div class="toolbar">
	<a class="back" href="/editor" sveltekit:prefetch>
		<ArrowLeftIcon width="24" height="24" />
	</a>
	<span class="title">{title}</span>
	<form method="post" use:enhance={{ redirect: '/editor' }}>
		<input type="hidden" name="slug" value={slug} />
		<input type="hidden" name="markdown" value={$post.markdown} />
		<button class="save" type="submit">
			<SaveIcon width="24" height="24" />
			<span>Draft</span>
		</button>
	</form>
</div>

<style>
	.toolbar {
		display: flex;
		align-items: center;
		gap: 0.4rem;
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

	.save {
		display: flex;
		gap: 0.4rem;
		align-items: center;
		font-size: 16px;
	}

	.save span {
		padding-top: 0.2rem;
	}

	a,
	button {
		font-weight: 400;
		color: hsl(0 0% 60%);
	}

	button:hover,
	a:hover {
		color: tomato;
		text-decoration: none;
	}
</style>
