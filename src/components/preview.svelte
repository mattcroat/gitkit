<script lang="ts">
	import snarkdown from 'snarkdown'

	export let markdown: string

	$: markdownPreview = markdown.replace(/^---[\s\S]*---$/gm, '')
</script>

<section class="preview">
	{@html snarkdown(markdownPreview)}
</section>

<style>
	.preview {
		padding: 1rem 2rem;
		background-color: hsl(220 20% 10%);
	}
</style>
