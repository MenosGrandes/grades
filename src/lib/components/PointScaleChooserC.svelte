<script>
	import { grades_s, grades_store_2 , grading_system_name_s} from '$lib/stores.js';
	let current_gradeing_system;
	const get_names = () =>
	{
		return Array.from($grades_store_2.keys())
	}
	const grades = get_names()

	const onChange = () =>
	{
		$grading_system_name_s = current_gradeing_system

	}
</script>

<style>
	/* your styles go here */
</style>

<!-- markup (zero or more items) goes here -->

<div>
	<label> PICK GRADING SYSTEM!</label>
	<select bind:value={current_gradeing_system} on:change={()=>onChange()} >
			{#each grades as selected_grade}
				<option value={selected_grade}> {selected_grade} </option>
			{/each}
		</select>
	</div>
