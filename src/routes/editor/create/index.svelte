<h1>Add Post</h1>

<form action="/editor/create" method="post">
	<div class="field">
		<label for="slug">Slug</label>
		<input type="text" name="slug" />
	</div>

	<div class="field">
		<label for="content">Content</label>
		<textarea
			value="---
title: Test
description: Test
slug: 'test'
published: '2022-1-1'
---"
			name="content"
			id="content"
			cols="30"
			rows="10"
		/>
	</div>

	<button type="submit">+ Add post</button>
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
</style>
