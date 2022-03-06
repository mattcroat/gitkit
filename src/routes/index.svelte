<script lang="ts">
	import type { PostItemType } from '$root/types'

	export let posts: PostItemType[] = []
</script>

<section>
	<h2>Posts</h2>

	{#each posts as post}
		<a href={post.slug} sveltekit:prefetch>{post.title}</a>
	{/each}
</section>

<style>
	section {
		padding: 1rem 2rem;
		display: grid;
		justify-content: start;
	}
</style>
