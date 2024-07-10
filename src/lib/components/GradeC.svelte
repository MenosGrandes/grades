<script>
	export let grade;
</script>

<div>
	<p>
		{grade.min_perc} %
	</p>
	<p>
		{grade.max_perc} %
	</p>
	<p>
		{grade.grade}
	</p>
</div>

<style>
	div {
		display: flex;
		justify-content: space-around;
		padding: 0;
		margin: 0;
		list-style: none;
	}
	p {
		font-weight: bold;
		font-size: 1em;
		text-align: center;
	}
	/* your styles go here */
</style>
