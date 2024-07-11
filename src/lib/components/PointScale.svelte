<script>
	import { grades_s, grades_store_2 } from '$lib/stores.js';
	import { GradeD, GradesD } from '$lib/js/Grade.js';
	import { saveObjectToJsonFile, loadObjectFromFile } from '$lib/js/FileUtils.js';
	import GradeC from '$lib/components/GradeC.svelte';
	import ButtonC from '$lib/utils/ButtonC.svelte';
	import { get, writable } from 'svelte/store';

	const basic_grades = [2, 3, 3.5, 4, 4.5, 5, 6];

	const filter_selected_grades = (_grades) => {
		return _grades.filter((item) => {
			for (let i = 0; i < grades.grades.length; i++) {
				if (item == grades.grades[i].grade) {
					return false;
				}
			}
			return true;
		});
	};

	let min_perc;
	let max_perc;
	let grade;
	let name = 'example_name';
	let grades = $grades_s?.name ? $grades_s.copy() : new GradesD('example', []);

	let selected_grades = filter_selected_grades(basic_grades);

	let files;
	const resetGrades = () => {
		grades = new GradesD('example', []);
		selected_grades = basic_grades;
		console.log($grades_store_2)
	};
	const saveAndValidateGrades = () => {
		//MenosGrandes.. it can be done as additional feature. For now it will not validate the grade system itself

		grades.name = name;
		grades = grades;
		saveObjectToJsonFile(grades, name + 'grades.json');
	};
	/*
Svelte will trigger renrendering of component only on assignment change!
	*/
	const addGrade = () => {
		//validate first
		if (min_perc >= max_perc) {
			throw new Error('Min perc cannot be bigger than max perc');
		}
		/*
		Handle name change in here? MenosGrandes
			*/
		grades.addGrade(new GradeD(min_perc, max_perc, grade));
		grades.name = name;
		grades.grades.sort((a, b) => {
			return a.grade - b.grade;
		});
		grades = grades;
		/*
		Clean all selected items from form!
			*/
		selected_grades = selected_grades.filter((item) => {
			return item != grade;
		});
		min_perc = max_perc + 1;
		max_perc = null;
		grade = null;
	};

	$: if (files) {
		const process_file_promise = loadObjectFromFile(files[0]);
		process_file_promise.then((grades_from_json) => {
			const _tmp = JSON.parse(grades_from_json);
			const _grades = new GradesD(_tmp.name, []);
			for (let i = 0; i < _tmp.grades.length; i++) {
				_grades.addGrade(
					new GradeD(_tmp.grades[i].min_perc, _tmp.grades[i].max_perc, _tmp.grades[i].grade)
				);
			}
			grades = _grades.copy();
			/*
			I need to set it to undefined, in other way it goes into loop
				*/
			files = undefined;
			/*
			remove all items from optionbox that are in the loaded file
				*/
			selected_grades = selected_grades.filter((item) => {
				for (let i = 0; i < grades.grades.length; i++) {
					if (item == grades.grades[i].grade) {
						return false;
					}
				}
				return true;
			});

			grades_s.set(grades.copy());
			//grades_store_2.update({grades : grades.copy(), name : grades.name});
			grades_store_2.update((items)=>{
				console.log(items)
				items.set(grades.name, grades.copy())
				return items
			});
		});
	}
</script>

<div>
	<div class="flex_container">
		<p class="flex_item">Name</p>
		<input bind:value={name} class="flex_item" />
	</div>

	<div class="flex_container">
		<p class="flex_item">MinPerc</p>
		<p class="flex_item">MaxPerc</p>
		<p class="flex_item">Grade</p>
	</div>

	<form on:submit|preventDefault={() => addGrade()} class="flex_container">
		<input bind:value={min_perc} class="flex_item" type="number" min="0" max="100" required />
		<input bind:value={max_perc} class="flex_item" type="number" min="0" max="100" required />
		<select bind:value={grade} class="flex_item" required>
			{#each selected_grades as selected_grade}
				<option value={selected_grade}> {selected_grade} </option>
			{/each}
		</select>
		<button type="submit" class="flex_item"> Save </button>
	</form>

	<div>
		{#if grades.name != 'example'}
			<h1>
				{grades.name}
			</h1>
			{#each grades.grades as grade_from_grades}
				<GradeC grade={grade_from_grades} />
			{/each}
		{/if}
	</div>

	<div class="flex_container">
		<ButtonC name={'SaveGrade'} onClickHandler={() => saveAndValidateGrades()} />
		<ButtonC name={'ResetGrades'} onClickHandler={() => resetGrades()} />

		<input type="file" bind:files accept=".json" />
	</div>
</div>

<style>
	/* your styles go here */

	.flex_container {
		display: flex;
		justify-content: space-around;
	}
	.flex_item {
		font-weight: bold;
		font-size: 1em;
		text-align: center;
	}
</style>
