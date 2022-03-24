<script lang="ts">
	import { page } from '$app/stores'
	import { getContext } from 'svelte'
	import {
		ArrowLeftIcon,
		EyeIcon,
		SaveIcon,
		SpeakerphoneIcon
	} from '@rgossiaux/svelte-heroicons/outline'

	import { enhance } from '$root/lib/form'
	import { draftFileUrl, fileUrl } from '$root/lib/config'
	import type { EditorPostType } from '$root/types'

	const post: EditorPostType = getContext('post')
	const draft = $page.url.searchParams.has('draft')
	const url = draft ? draftFileUrl : fileUrl
	const viewUrl = `${url}/${$post.slug}.md`
</script>

<div class="toolbar">
	<a class="back" href="/editor" sveltekit:prefetch>
		<ArrowLeftIcon width="24" height="24" />
	</a>

	<span class="title">{$post.title}</span>

	<form method="post" use:enhance>
		<input type="hidden" name="save" />
		<input type="hidden" name="markdown" value={$post.markdown} />
		<button class="save" type="submit">
			<SaveIcon width="24" height="24" />
			<span>Save</span>
		</button>
	</form>

	{#if draft}
		<form method="post" use:enhance={{ redirect: `/editor` }}>
			<input type="hidden" name="publish" />
			<input type="hidden" name="markdown" value={$post.markdown} />
			<button class="save" type="submit">
				<SpeakerphoneIcon width="24" height="24" />
				<span>Publish</span>
			</button>
		</form>
	{/if}

	<a class="view" href={viewUrl}>
		<EyeIcon width="24" height="24" />
		<span>View</span>
	</a>
</div>

<style>
	.toolbar {
		display: flex;
		align-items: center;
		gap: var(--spacing-16);
		background-color: hsl(0 0% 12%);
		border-bottom: 1px solid hsl(0 0% 20%);
	}

	.back {
		margin-left: var(--spacing-24);
		display: flex;
	}

	.title {
		height: 100%;
		display: flex;
		align-items: center;
		padding: 0 var(--spacing-20);
		font-size: var(--spacing-24);
		font-weight: 700;
		border-right: 1px solid hsl(0 0% 20%);
	}

	.save,
	.view {
		display: flex;
		gap: var(--spacing-4);
		align-items: center;
		font-size: var(--font-16);
	}

	.save span,
	.view span {
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
