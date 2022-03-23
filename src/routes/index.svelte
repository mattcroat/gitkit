<script lang="ts">
	import { DocumentTextIcon } from '@rgossiaux/svelte-heroicons/outline'
	import type { PostItemType } from '$root/types'

	export let posts: PostItemType[] = []
</script>

<section>
	<h2>Posts</h2>
	{#each posts as post}
		<article class="post">
			<DocumentTextIcon width="24" height="24" />
			<a href={post.slug} sveltekit:prefetch>{post.title}</a>
		</article>
	{/each}
</section>

<style>
	section {
		display: grid;
		gap: 1rem;
		justify-content: start;
		padding: 1rem 2rem;
	}

	.post {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
</style>
