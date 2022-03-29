<script lang="ts">
	import type { RateAPIResponseType } from '$root/types'

	async function rate(): Promise<RateAPIResponseType> {
		const response = await fetch('/api/measure')
		const { limit } = await response.json()
		return limit
	}
</script>

<div class="rate">
	{#await rate()}
		<p>⏳️</p>
	{:then rate}
		<p><span>{rate.limit}</span> limit</p>
		<p><span>{rate.used}</span> used</p>
		<p><span>{rate.resetTimeLocale}</span> reset</p>
		<p><span>{rate.remainingMinutes}</span> minutes until reset</p>
	{:catch}
		<p>💩</p>
	{/await}
</div>

<style>
	.rate {
		--space: 20px;

		position: absolute;
		bottom: var(--space);
		left: var(--space);
		z-index: 1;
	}

	span {
		font-weight: 700;
	}
</style>
