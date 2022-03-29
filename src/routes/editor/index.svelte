<script lang="ts">
	import {
		PlusCircleIcon,
		TrashIcon
	} from '@rgossiaux/svelte-heroicons/outline'

	import { enhance } from '$root/lib/form'
	import { failure, success } from '$root/lib/toast'
	import type { PostItemType } from '$root/types'

	export let drafts: PostItemType[] = []
	export let published: PostItemType[] = []
</script>

<main>
	<section>
		<h2>Create Post</h2>
		<div class="create-post">
			<a href="/editor/create">Create post</a>
			<PlusCircleIcon width="24" height="24" />
		</div>
	</section>

	<section>
		<h2>Draft</h2>
		<div class="posts">
			{#each drafts as draft}
				<article class="post">
					<a href="/editor/edit/{draft.slug}?draft=true" sveltekit:prefetch>
						{draft.title}
					</a>
					<form
						action="/editor?_method=delete"
						method="post"
						use:enhance={{
							error: async ({ response }) => {
								const { error } = await response.json()
								failure(error)
							},
							result: async () => success('👻 Post removed.'),
							confirmation: () => {
								const response = confirm('Are you sure?')
								return response
							}
						}}
					>
						<input type="hidden" name="draft" />
						<input type="hidden" name="slug" value={draft.slug} />
						<button type="submit">
							<TrashIcon width="24" height="24" />
						</button>
					</form>
				</article>
			{/each}
		</div>
	</section>

	<section>
		<h2>Published</h2>
		<div class="posts">
			{#each published as post}
				<article class="post">
					<a href="/editor/edit/{post.slug}" sveltekit:prefetch>{post.title}</a>
					<form
						action="/editor?_method=delete"
						method="post"
						use:enhance={{
							error: async ({ response }) => {
								const { error } = await response.json()
								failure(error)
							},
							result: async () => success('👻 Post removed.'),
							confirmation: () => {
								const response = confirm('Are you sure?')
								return response
							}
						}}
					>
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
				</article>
			{/each}
		</div>
	</section>
</main>

<style>
	main {
		display: grid;
		gap: var(--spacing-20);
		padding: var(--spacing-20);
	}

	section {
		display: grid;
		gap: var(--spacing-8);
	}

	.create-post {
		width: max-content;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--spacing-16);
		padding: var(--spacing-20);
		background-color: hsl(220 20% 20%);
		border-radius: var(--radius-1);
		box-shadow: 0px 0px 4px hsl(0 0% 0% / 40%);
	}

	.posts {
		display: grid;
		gap: var(--spacing-16);
		grid-template-columns: repeat(3, 1fr);
	}

	.post {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--spacing-20);
		background-color: hsl(220 20% 20%);
		border-radius: var(--radius-1);
		box-shadow: 0px 0px 4px hsl(220 20% 4% / 40%);
		transition: box-shadow 0.3s;
	}

	.post:hover {
		box-shadow: 0px 0px 10px hsl(220 20% 4% / 80%);
	}
</style>
