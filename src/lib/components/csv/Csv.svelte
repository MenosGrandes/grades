<script>
	import CsvHeader from '$lib/components/csv/CsvHeader.svelte';
	import CsvBody from '$lib/components/csv/CsvBody.svelte';
	import {get_headers_from_csv} from '$lib/js/CsvProcessor.js';
	export let data;
	const header_data = get_headers_from_csv(data[0])

</script>

<style>
	/* your styles go here */
	.flex_container {
		display: flex;
		justify-content: space-around;
		flex-wrap: nowrap;
		align-items : center;
		gap: 10px
	}
	.header
	{
		background-color: blue
	}

	.row
	{
		flex-direction:row;
	}
	.flex_item {
		font-weight: bold;
		font-size: 1em;
		text-align: center;
	}
	.cell
	{
		border-left: solid 1px;
		border-right: solid 1px;

	}
</style>


{#if data}
<div class="flex_container">
	{#each header_data as d}
		<div class="flex_item row header cell">
			{d}
		</div>
{/each}
</div>
{/if}
