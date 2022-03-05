<script lang="ts">
	export let posts = []
</script>

<main>
	<section>
		<h1>Create Post</h1>
		<a href="/editor/create">+ Create Post</a>
	</section>

	<section class="posts">
		<h2>Posts</h2>
		<ul class="posts">
			{#each posts as post}
				<li>
					<a href="/editor/{post}">{post}</a>
					<form action="/editor?_method=delete" method="post">
						<input type="hidden" name="slug" value={post} />
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
