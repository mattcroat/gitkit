<script lang="ts">
	import { getContext } from 'svelte'
	import type { EditorPostType } from '$root/types'

	const post: EditorPostType = getContext('post')

	function togglePreview() {
		$post.preview = !$post.preview
	}
</script>

<button class="toggle" on:click={togglePreview}>
	<svg
		width="28"
		height="28"
		class:show={$post.preview}
		class:hide={!$post.preview}
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		stroke-width="2"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M13 5l7 7-7 7M5 5l7 7-7 7"
		/>
	</svg>
</button>

<style>
	.toggle {
		position: absolute;
		top: 10px;
		right: 10px;
	}

	svg {
		color: hsl(0 0% 40%);
		transition: color 0.3s;
	}

	svg:hover {
		color: hsl(0 0% 98%);
	}

	.show {
		animation: rotate-inverse 0.2s linear reverse;
	}

	.hide {
		animation: rotate 0.2s linear;
		animation-fill-mode: forwards;
	}

	@keyframes rotate {
		to {
			transform: rotate(-180deg);
		}
	}

	@keyframes rotate-inverse {
		to {
			transform: rotate(-180deg);
		}
	}
</style>
