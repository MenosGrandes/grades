<script>
	import Header from './Header.svelte';
	export let header_data;
</script>

	{#each header_data as _header}
		<Header header={_header} />
	{/each}

<style>
	/* styles go here */
</style>
