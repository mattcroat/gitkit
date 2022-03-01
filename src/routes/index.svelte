<script lang="ts">
	export let slugs: string[]
</script>

<h1>Posts</h1>

<section>
	{#each slugs as slug}
		<a href={slug}>Link</a>
	{/each}
</section>

<style>
	section {
		display: grid;
		justify-content: start;
	}
</style>
