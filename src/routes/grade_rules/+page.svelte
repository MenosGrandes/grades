<script>
	import { student_function_s, csv_headers_s } from '$lib/stores.js';
	import ButtonC from '$lib/utils/ButtonC.svelte';
	import { get } from 'svelte/store';
	let student_function;
	let student_output;

	$: if ($student_function_s) {
		student_function =  $student_function_s;
	}
	const parse = () =>
	{
		student_output = ""
		let code_to_run = `(student, show)=>{` + student_function + `}`;

		let a = new Function('return' + code_to_run)
		console.log(JSON.stringify(code_to_run))
		for(let i =0;i< $csv_headers_s.length;i++)
		{
			a()($csv_headers_s[i],function _s(s){ student_output +=(s + "\r"); })
		}
		$student_function_s = student_function
	}

</script>

<div>
	<textarea id="student_function"  rows="20" cols="90" bind:value={student_function} />
	<ButtonC name={'parse!'} onClickHandler={() => parse()} />
	<textarea id="output"  rows="20" cols="90" bind:value={student_output} readonly/>
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
