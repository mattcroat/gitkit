<script lang="ts">
	import Settings from '$root/components/settings/index.svelte'
	import '$root/styles/global.css'
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
		gap: 2rem;
		padding: 1rem 2rem;
	}
</style>
