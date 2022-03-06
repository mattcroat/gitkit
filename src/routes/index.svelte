<script lang="ts">
	import type { PostItemType } from '$root/types'

	export let posts: PostItemType[] = []
</script>

<h1>Posts</h1>

<section>
	{#each posts as post}
		<a href={post.slug}>{post.title}</a>
	{/each}
</section>

<style>
	section {
		display: grid;
		justify-content: start;
	}
</style>
