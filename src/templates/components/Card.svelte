<script>
	export let title;
	export let url;
	export let text;
	export let image;
</script>

<div>
	<a href={url}>
		<img src={image} alt="">
		<h2>{title}</h2>
		<p>{text}</p>
	</a>
</div>

<style>
	a {
		text-decoration: none;
		color: inherit;
	}

	h2 {
		padding: 5px;
	}

	p {
		padding: 20px;
	}
</style>
