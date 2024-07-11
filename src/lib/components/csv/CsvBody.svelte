
<script>
	import {get_values_from_csv} from '$lib/js/CsvProcessor.js';
	import CsvRow from '$lib/components/csv/CsvRow.svelte';
	export let body_data;
	const data_to_show = get_values_from_csv(body_data)
	console.log(data_to_show)
</script>


{#each data_to_show as data}
	<CsvRow data={data}/>
{/each}

<style>
	/* styles go here */
</style>
