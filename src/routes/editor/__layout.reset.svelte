<script lang="ts">
	import { SvelteToast } from '@zerodevx/svelte-toast'
</script>

<SvelteToast options={{ duration: 2000, intro: { y: -100 } }} />
<slot />
