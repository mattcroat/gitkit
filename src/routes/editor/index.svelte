<script lang="ts">
	import { enhance } from '$root/lib/form'
	import type { PostItemType } from '$root/types'

	export let drafts: PostItemType[] = []
	export let published: PostItemType[] = []
</script>

<main>
	<section>
		<h2>Create Post</h2>
		<a href="/editor/create">+ Create Post</a>
	</section>

	<section>
		<h2>Draft</h2>
		<ul>
			{#each drafts as draft}
				<li>
					<a href="/editor/edit/{draft.slug}" sveltekit:prefetch>
						{draft.title}
					</a>
					<form action="/editor?_method=delete" method="post" use:enhance>
						<input type="hidden" name="slug" value={draft.slug} />
						<button type="submit">Remove</button>
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
						<button type="submit">Remove</button>
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

	li {
		display: flex;
		gap: 2rem;
	}
</style>
