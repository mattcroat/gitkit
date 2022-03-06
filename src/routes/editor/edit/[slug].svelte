<script lang="ts">
	import snarkdown from 'snarkdown'

	export let slug = ''
	export let content = ''

	$: preview = content.replace(/^---[\s\S]*---$/gm, '')
</script>

<h2>Edit post</h2>

<main>
	<form method="post">
		<input type="hidden" name="slug" value={slug} />
		<textarea
			aria-label="Markdown editor"
			class="editor"
			bind:value={content}
			name="content"
			id="content"
		/>
		<button class="save" type="submit">💾 Save</button>
	</form>

	<section class="preview">
		{@html snarkdown(preview)}
	</section>
</main>

<style>
	h2 {
		padding: 1rem 2rem;
	}

	main {
		height: 100%;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}

	form {
		position: relative;
	}

	.editor {
		width: 100%;
		height: 100%;
		padding: 1rem 2rem;
		font-size: 1.8rem;
		font-family: 'Poppins', sans-serif;
		color: hsl(0 0% 98%);
		background-color: hsl(220 20% 8%);
		border: none;
		outline: none;
		resize: none;
	}

	.save {
		position: absolute;
		left: 1rem;
		bottom: 1rem;
	}

	.preview {
		padding: 1rem 2rem;
		background-color: hsl(220 20% 10%);
	}
</style>
