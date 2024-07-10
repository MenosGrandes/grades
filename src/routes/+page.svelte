<script>
	import { grades_s, csv_headers_s } from '$lib/stores.js';

	import process_csv from '$lib/js/CsvProcessor.js';
	import Papa from 'papaparse';
	import CsvHeaders from '$lib/components/CsvHeaders.svelte';

	let files;
	let csv;
	$: if (csv_headers_s) {
		//MenosGrandes here should I store full csv?
		csv = $csv_headers_s;
	}
	$: if (files) {
		const process_csv_promise = process_csv(files[0]);
		process_csv_promise.then((file) => {
			Papa.parse(file, {
				dynamicTyping: true,
				header: true,
				transformHeader: function (header, index) {
					return header;
				},
				complete: function (results) {
					csv = results.data;
					$csv_headers_s = csv;
				}
			});
		});
	}
</script>

<div>
	<input type="file" bind:files accept=".csv" />
	{#if csv}
		<CsvHeaders />
	{/if}
	{#if $grades_s?.name}
		{#each $grades_s.grades as item}
			<div>{item.grade}</div>
		{/each}
		<!-- content here -->
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
