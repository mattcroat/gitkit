<script lang="ts">
	import type { PostItemType } from '$root/types'

	export let posts: PostItemType[] = []
</script>

<section>
	<h2>Posts</h2>
	{#each posts as post}
		<article class="post">
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
					d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
				/>
			</svg>
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
