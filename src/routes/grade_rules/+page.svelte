<script>
	import { student_function_s, csv_data_s} from '$lib/stores.js';
	import { grades_store_2 , grading_system_name_s} from '$lib/stores.js';
	import {GradingSystemD} from '$lib/js/Grade.js';
	import { get } from 'svelte/store';

	import ButtonC from '$lib/utils/ButtonC.svelte';
	import CsvHeaders from '$lib/components/CsvHeaders.svelte';
	import PointScaleChooserC from '$lib/components/PointScaleChooserC.svelte';
	import {get_headers_from_csv} from '$lib/js/CsvProcessor.js';

	let student_function;
	let student_output;

	$: if ($student_function_s) {
		student_function =  $student_function_s;
	}
	const show = (s) =>
	{
		student_output +=(s + "\r"); 
	}


	/*
	Inject functions with names as the grading system
	https://stackoverflow.com/questions/584907/javascript-better-way-to-add-dynamic-methods

	*/
	function addMethods(object, methods) {
  for (var name in methods) {
    object[name] = methods[name];
  }
};
	class Grading
	{
		constructor()
		{
			var methods = {}
			$grades_store_2.forEach((value,key,map) =>{
				console.log(JSON.stringify(value) +" "+ key)
				methods[key]=function(_points){
					return GradingSystemD.grade(value,_points)
				}

			});
			addMethods(this,methods)
		}
	}
	const grading = new Grading()
	const parse = () =>
	{
		student_output = ""
		let code_to_run = `(student, show, grading)=>{` + student_function + `}`;

		let a = new Function('return' + code_to_run)
		console.log("code_to_run")
		console.log(JSON.stringify(code_to_run))
		for(let i =0;i< $csv_data_s.length;i++)
		{
			a()($csv_data_s[i], show, grading)
		}
		$student_function_s = student_function
	}

</script>

<div>
	{#if $csv_data_s.length}
	<CsvHeaders header_data={get_headers_from_csv($csv_data_s[0])}/>
	<textarea id="student_function"  rows="20" cols="90" bind:value={student_function} />
	<ButtonC name={'PARSE!'} onClickHandler={() => parse()} />
	<PointScaleChooserC/>
	<textarea id="output"  rows="20" cols="90" bind:value={student_output} readonly/>
	{:else}
		<h4>LOAD DATA FIRST</h4>
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
