<script>
	import { csv_data_s } from '$lib/stores.js';

	import {get_headers_from_csv} from '$lib/js/CsvProcessor.js';

	import {process_csv} from '$lib/js/CsvProcessor.js';
	import Papa from 'papaparse';
	import CsvHeaders from '$lib/components/CsvHeaders.svelte';

	let files;
	let csv;
	let refresh = false
	$: if (csv_data_s) {
		csv = $csv_data_s;
	}
	$: if (files) {
		const process_csv_promise = process_csv(files[0]);
		process_csv_promise.then((file) => {
			Papa.parse(file, {
				dynamicTyping: true,
				header: true,
				complete: function (results) {
					csv = results.data;
					$csv_data_s = csv;
					refresh = !refresh
				}
			});
		});
	}
</script>

<div>
	<input type="file" bind:files accept=".csv" />
	{#if csv.length}
			<CsvHeaders header_data={get_headers_from_csv($csv_data_s[0])} />
	{/if}
</div>

<style>
</style>
