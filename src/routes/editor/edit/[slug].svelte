<script lang="ts">
	export let slug = ''
	export let content = ''
</script>

<h1>Edit post</h1>

<form method="post">
	<div class="field">
		<label for="slug">Slug</label>
		<input type="text" name="slug" value={slug} />
	</div>

	<div class="field">
		<label for="content">Content</label>
		<textarea value={content} name="content" id="content" cols="30" rows="10" />
	</div>

	<button type="submit">Save</button>
</form>

<style>
	form {
		display: grid;
		gap: 1rem;
	}

	.field {
		display: grid;
		gap: 1rem;
	}

	input,
	textarea {
		padding: 1rem;
		border-radius: 4px;
		border: none;
	}

	button {
		padding: 1.4rem;
		font-size: inherit;
		font-weight: 700;
		color: inherit;
		background: black;
		border: none;
		border-radius: 1rem;
		cursor: pointer;
	}
</style>
