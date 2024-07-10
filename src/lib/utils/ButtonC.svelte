<script>
	export let onClickHandler;
	export let name;
</script>

<!-- markup (zero or more items) goes here -->

<button on:click={onClickHandler}>{name}</button>

<style>
	/* your styles go here */
</style>
