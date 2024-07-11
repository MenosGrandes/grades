import { writable } from 'svelte/store';

export const  csv_data_s = writable([]);
export const grades_s = writable([]);
export const  student_function_s = writable();


export const grades_store_2 = writable(new Map())
export const grading_system_name_s = writable()
