<script>
	import { csv_headers_s } from '$lib/stores.js';
	import Header from './Header.svelte';
	// logic goes here
</script>

<div>
	{#each $csv_headers_s as header}
		<Header {header} />
	{/each}
</div>

<style>
	/* styles go here */
</style>
