<script lang="ts">
	import { enhance } from '$root/lib/form'
	import type { PostItemType } from '$root/types'

	export let posts: PostItemType[] = []
</script>

<main>
	<section>
		<h2>Create Post</h2>
		<a href="/editor/create">+ Create Post</a>
	</section>

	<section class="posts">
		<h2>Posts</h2>
		<ul class="posts">
			{#each posts as post}
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
