<script lang="ts">
	import Settings from '$root/components/settings/index.svelte'
	import '$root/styles/global.css'
	import '$root/styles/post.css'
	import '$root/styles/themes.css'
	import '$root/styles/code.css'
</script>

<nav>
	<a href="/">Home</a>
	<a href="/editor">Editor</a>
	<Settings />
</nav>

<slot />

<style>
	nav {
		display: flex;
		align-items: center;
		gap: var(--spacing-20);
		padding: var(--spacing-16) var(--spacing-20);
	}
</style>
