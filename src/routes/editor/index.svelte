<script lang="ts">
	import {
		PlusCircleIcon,
		TrashIcon
	} from '@rgossiaux/svelte-heroicons/outline'

	import { enhance } from '$root/lib/form'
	import type { PostItemType } from '$root/types'

	export let drafts: PostItemType[] = []
	export let published: PostItemType[] = []
</script>

<main>
	<section>
		<h2>Create Post</h2>
		<div class="create">
			<a href="/editor/create">Create post</a>
			<PlusCircleIcon width="24" height="24" />
		</div>
	</section>

	<section>
		<h2>Draft</h2>
		<ul>
			{#each drafts as draft}
				<li>
					<a href="/editor/edit/{draft.slug}?draft=true" sveltekit:prefetch>
						{draft.title}
					</a>
					<form action="/editor?_method=delete" method="post" use:enhance>
						<input type="hidden" name="draft" />
						<input type="hidden" name="slug" value={draft.slug} />
						<button type="submit">
							<TrashIcon width="24" height="24" />
						</button>
					</form>
				</li>
			{/each}
		</ul>
	</section>

	<section>
		<h2>Published</h2>
		<ul>
			{#each published as post}
				<li>
					<a href="/editor/edit/{post.slug}" sveltekit:prefetch>{post.title}</a>
					<form action="/editor?_method=delete" method="post" use:enhance>
						<input type="hidden" name="slug" value={post.slug} />
						<button type="submit">
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
									d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
								/>
							</svg>
						</button>
					</form>
				</li>
			{/each}
		</ul>
	</section>
</main>

<style>
	main {
		display: grid;
		gap: 2rem;
		padding: 2rem;
	}

	.create {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	li {
		display: flex;
		align-items: center;
	}
</style>
