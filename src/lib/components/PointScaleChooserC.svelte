<script>
	import { grades_s, grades_store_2 , grading_system_name_s} from '$lib/stores.js';
	let current_gradeing_system;
	const get_names = () =>
	{
		return Array.from($grades_store_2.keys())
	}
	const grades = get_names()
</script>

<style>
	/* your styles go here */
</style>

<div>
	<label>Available grading systems! <label>
	<select >
			{#each grades as selected_grade}
				<option> {selected_grade} </option>
			{/each}
		</select>
	</div>
