<script lang="ts">
	import { DocumentTextIcon } from '@rgossiaux/svelte-heroicons/outline'
	import type { PostItemType } from '$root/types'

	export let posts: PostItemType[] = []
</script>

<section>
	<h2>Posts</h2>
	<div class="posts">
		{#each posts as post}
			<article class="post">
				<DocumentTextIcon width="24" height="24" />
				<a href={post.slug} sveltekit:prefetch>{post.title}</a>
			</article>
		{/each}
	</div>
</section>

<style>
	section {
		display: grid;
		gap: 1rem;
		justify-content: start;
		padding: 1rem 2rem;
	}

	.posts {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(3, 1fr);
	}

	.post {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 2rem;
		background-color: hsl(220 20% 20%);
		border-radius: 1rem;
		box-shadow: 0px 0px 4px hsl(220 20% 4% / 40%);
		transition: box-shadow 0.3s;
	}

	.post:hover {
		box-shadow: 0px 0px 10px hsl(220 20% 4% / 80%);
	}
</style>
