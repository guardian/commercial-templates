<script>
	export let title;
	export let url;
	export let text;
</script>

<div>
	<a href={url}>
		<h2>{title}</h2>
		<p>{text}</p>
	</a>
</div>
