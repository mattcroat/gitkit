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
		<h2>Create post</h2>
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
					<a href="/edit/{post.slug}">{post.title}</a>
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
		gap: var(--spacing-64);
		padding: var(--spacing-24) var(--spacing-32);
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
		background-color: hsl(220 20% 16%);
		border-radius: var(--radius-1);
		box-shadow: 0px 2px 4px hsl(0 0% 0% / 4%);
	}

	.post {
		display: flex;
		justify-content: space-between;
		padding: 2rem;
		border-bottom: 1px solid hsl(220 20% 24%);
	}

	.post:nth-child(odd) {
		background: hsl(220 20% 16%);
	}
</style>
