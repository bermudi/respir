<script>
	import IconHouse from '~icons/ph/house-duotone';
	import IconLink from '~icons/ph/arrow-square-out-duotone';
</script>

<svelte:head>
	<title>respirahh: acerca de</title>
	<meta name="description" content="información sobre la aplicación web respirahh." />
</svelte:head>

<main>
	<div class="content container">
		<div class="header">
			<a class="icon-button" href="/">
				<IconHouse style="font-size: 1.3rem;" />
			</a>
			<h1>acerca de respirahh</h1>
			<!-- <a class="link" href="https://github.com/refact0r/respir">
				repositorio github
				<IconLink style="font-size: 1.3rem;" />
			</a> -->
		</div>
		<div class="box">
			<p>
				respirahh está diseñado para ayudar a las personas a relajarse y calmarse del estrés en sus vidas
				a través de ejercicios de respiración guiados.
			</p>
			<!-- <p>
				creado por shibest, refact0r y ben-6 para el Hackathon de Invierno 2024 del Club de Programación
				Interlake.
			</p> -->
		</div>
	</div>
</main>

<style lang="scss">
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		padding: 2rem;
	}

	.container {
		width: 100%;
		max-width: 60rem;
	}

	.box {
		background-color: var(--bg-2);
		border-radius: 1rem;
		padding: 2rem;
		margin-bottom: 1rem;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	h1 {
		margin: 0;
		font-size: 1.5rem;
		font-weight: 500;
	}

	p {
		margin: 0;
		margin-bottom: 1rem;
		color: var(--fg-2);
	}

	p:last-child {
		margin-bottom: 0;
	}
</style>
