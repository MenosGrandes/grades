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
		//MenosGrandes here should I store full csv?
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
		{#key refresh}
			<CsvHeaders header_data={get_headers_from_csv($csv_data_s[0])} />
	
		{/key}
	{/if}
</div>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
