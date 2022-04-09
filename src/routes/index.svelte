<script lang="ts">
	import {
		PlusCircleIcon,
		TrashIcon
	} from '@rgossiaux/svelte-heroicons/outline'

	import { enhance } from '$root/lib/form'
	import { failure, success } from '$root/lib/toast'
	import type { PostItemType } from '$root/types'

	export let posts: PostItemType[] = []
</script>

<svelte:head>
	<title>Editor</title>
</svelte:head>

<main>
	<section>
		<h2>Create Post</h2>
		<div class="create-post">
			<a href="/create">Create post</a>
			<PlusCircleIcon width="24" height="24" />
		</div>
	</section>

	<section>
		<h2>Posts</h2>
		<div class="posts">
			{#each posts as post}
				<article class="post">
					<a href="/edit/{post.slug}" sveltekit:prefetch>{post.title}</a>
					<form
						action="?_method=delete"
						method="post"
						use:enhance={{
							pending: async () => success(`👻 ${post.slug}.md removed`),
							error: async ({ response }) => {
								const { error } = await response.json()
								failure(error)
							},
							confirmation: () => {
								const response = confirm('Are you sure?')
								return response
							}
						}}
					>
						<input type="hidden" name="slug" value={post.slug} />
						<button type="submit">
							<TrashIcon width="24" height="24" />
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
