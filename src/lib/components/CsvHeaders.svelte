<script>
	import Header from './Header.svelte';
	export let header_data;
</script>

<h1>Headers: </h1>
<ul>
	{#each header_data as _header}
		<Header header={_header} />
	{/each}
</ul>

<style>
	ul{
		list-style: symbols(cyclic "\1F921"); 
		text: center;
	}
	/* styles go here */
</style>
