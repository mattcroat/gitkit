<script lang="ts">
	import { getContext } from 'svelte'
	import type { EditorPostType } from '$root/types'

	const post: EditorPostType = getContext('post')
</script>

<div class="toolbar">
	<span class="title">{$post.title}</span>
	<form method="post">
		<button class="save" type="submit">💾 Save</button>
	</form>
</div>

<style>
	.toolbar {
		display: flex;
		align-items: center;
		gap: 1rem;
		background-color: hsl(0 0% 12%);
		border-bottom: 1px solid hsl(0 0% 20%);
	}

	.title {
		height: 100%;
		display: flex;
		align-items: center;
		padding: 0 2rem;
		font-size: 2.4rem;
		font-weight: 700;
		border-right: 1px solid hsl(0 0% 20%);
	}

	form {
		color: hsl(0 0% 40%);
	}
</style>
