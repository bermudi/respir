<script>
	import { fade } from 'svelte/transition';
	import IconAir from '~icons/ph/wind-duotone';
	import IconGear from '~icons/ph/gear-duotone';
	import IconInfo from '~icons/ph/info-duotone';
	import IconSlider from '~icons/ph/sliders-horizontal-duotone';
	import IconCheck from '~icons/ph/check';
	import IconX from '~icons/ph/x';
	import IconTrash from '~icons/ph/trash-duotone';
	import IconPlus from '~icons/ph/plus';
	import { presets, customs, bestHold } from '$lib/stores/exercises.js';

	let showCycles = false;
	let isCustom = false;
	let currentIdx;
	let currentCycles;

	function openEditCycles(index, custom) {
		showCycles = true;
		currentIdx = index;
		isCustom = custom;
		if (isCustom) {
			currentCycles = $customs[index].cycles;
		} else {
			currentCycles = $presets[index].cycles;
		}
	}

	function cancelEditCycles() {
		showCycles = false;
	}

	function setCycles() {
		if (currentCycles > 0 && currentCycles % 1 == 0) {
			if (isCustom) {
				$customs[currentIdx].cycles = currentCycles;
			} else {
				$presets[currentIdx].cycles = currentCycles;
			}
		} else {
			if (isCustom) {
				$customs[currentIdx].cycles = 10;
			} else {
				$presets[currentIdx].cycles = 10;
			}
		}

		showCycles = false;
	}

	function totalTime(exercise) {
		let cycleDuration = exercise.routine.reduce((sum, curr) => sum + curr.duration, 0);
		let secs = cycleDuration * exercise.cycles;
		return formatTime(secs);
	}

	function formatTime(secs) {
		let mins = Math.floor(secs / 60);
		let remainder = Math.round(secs % 60);
		return `${mins}:${remainder.toString().padStart(2, '0')}`;
	}

	function formatDate(date) {
		let month = date.getMonth() + 1;
		let day = date.getDate();
		return `${month}/${day}`;
	}

	function deleteExercise(index) {
		$customs = $customs.filter((_, i) => i !== index);
	}
</script>

<svelte:head>
	<title>respirahh</title>
	<meta name="description" content="ejercicios de respiración para ayudarte a relajarte, concentrarte o dormir." />
</svelte:head>

<main>
	{#if showCycles}
		<div class="form-popup" transition:fade={{ duration: 100 }}>
			<form class="form-container" transition:fade={{ duration: 100 }}>
				<label for="cycles">número de ciclos</label>

				<div class="formbuttons">
					<input type="number" min="1" step="1" bind:value={currentCycles} />
					<button
						type="button"
						class="icon-button cancel"
						on:click|preventDefault={() => cancelEditCycles()}
					>
						<IconX style="font-size: 1.3rem;" />
					</button>
					<button
						type="submit"
						class="icon-button submit"
						on:click|preventDefault={() => setCycles()}
					>
						<IconCheck style="font-size: 1.3rem;" />
					</button>
				</div>
			</form>
		</div>
	{/if}

	<section>
		<div class="head">
			<div class="text">
				<h1>respirahh <span class="text-icon"><IconAir /></span></h1>
				<p class="description">ejercicios de respiración para ayudarte a relajarte, concentrarte o dormir.</p>
			</div>

			<div class="buttons">
				<a href="settings" class="icon-button" title="configuración">
					<IconGear style="font-size: 1.3rem;" />
				</a>
				<a href="about" class="icon-button" title="acerca de">
					<IconInfo style="font-size: 1.3rem;" />
				</a>
			</div>
		</div>

		<h2>ejercicios</h2>
		<div class="exercises">
			{#each $presets as preset, i}
				<a href="/{preset.id}" class="exercise" title="respiración {preset.id}">
					<div class="left">
						<h3>{preset.name}</h3>
						<p>{preset.cycles} ciclos - {totalTime(preset)}</p>
						<p>{preset.description}</p>
					</div>
					<button
						class="icon-button"
						title="editar ejercicio"
						on:click|preventDefault={() => openEditCycles(i, false)}
					>
						<IconSlider style="font-size: 1rem;" />
					</button>
				</a>
			{/each}
			<a href="/hold-test" class="exercise" title="prueba de retención de respiración">
				<div class="left">
					<h3>prueba de retención de respiración</h3>
					<p>mejor tiempo - {formatTime($bestHold)}</p>
					<p>prueba tu capacidad de retención de respiración</p>
				</div>
			</a>
		</div>

		<h2>ejercicios personalizados</h2>
		<div class="exercises b">
			{#each $customs as custom, i}
				<a href="/custom/{i}" class="exercise" title="respiración {custom.id}">
					<div class="left">
						<h3>{custom.name}</h3>
						<p>{custom.cycles} ciclos - {totalTime(custom)}</p>
						<p>{custom.description}</p>
					</div>
					<div class="smallbuttons">
						<a class="icon-button" title="editar ejercicio personalizado" href="/edit/{i}">
							<IconSlider style="font-size: 1rem;" />
						</a>
						<button
							class="icon-button"
							title="eliminar ejercicio personalizado"
							on:click|preventDefault={() => deleteExercise(i)}
						>
							<IconTrash style="font-size: 1rem;" />
						</button>
					</div>
				</a>
			{/each}
		</div>
		<a href="/create" class="exercise create" id="create" title="crear nuevo ejercicio personalizado">
			<IconPlus /><span>crear o importar ejercicio personalizado</span>
		</a>
	</section>
</main>

<style lang="scss">
	main {
		flex: 1;
		flex-direction: column;

		@include flexCenter;
	}

	.row {
		display: flex;
	}

	.column {
		flex: 50%;
		padding: 0rem 2rem;
	}

	.columb {
		flex: 33%;
		padding: 0rem 0.5rem;
	}

	h1 {
		font-size: 2.5rem;
		margin: 0;
		font-weight: 700;
		cursor: default;
	}

	h2 {
		margin: 1rem 0 0.5rem 0;
		font-size: 1.1rem;
		font-weight: 500;
	}

	.head {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: flex-start;
		margin: 0.5rem 0 2rem 0;

		@media (min-width: 768px) {
			flex-direction: row;
			gap: 3rem;
			justify-content: space-between;
			align-items: start;
		}
	}

	.description {
		font-size: 1.1rem;
		margin: 0.5rem 0 0 0;

		@media (min-width: 768px) {
			font-size: 1.2rem;
			margin: 1rem 0 0 0;
		}
	}

	.buttons {
		display: flex;
		gap: 1rem;
	}

	.smallbuttons {
		display: flex;
		gap: 0.5rem;
	}

	.formbuttons {
		display: flex;
		gap: 1rem;

		input {
			width: 100%;
		}
	}

	section {
		width: 100%;
		max-width: 62rem;
		padding: 0 1rem;
		box-sizing: border-box;

		@media (min-width: 768px) {
			padding: 0 2rem;
		}
	}

	.exercises {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		width: 100%;

		@media (min-width: 768px) {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.exercise {
		padding: 1.1rem;
		background-color: var(--bg-2);
		backdrop-filter: blur(6px);
		border-radius: 2rem;
		text-decoration: none;
		color: inherit;
		cursor: pointer;
		display: flex;
		justify-content: space-between;
		align-items: start;
		transition: 0.2s;
		width: 100%;
		box-sizing: border-box;

		h3 {
			margin: 0;
			font-size: 1.3rem;
			font-weight: 600;
			word-break: break-word;
		}

		p {
			margin: 0.5rem 0 0 0;
		}

		button,
		.icon-button {
			padding: 0.7rem;
			backdrop-filter: none;
			flex-shrink: 0;
		}

		&.create {
			padding: 1rem;
			margin-top: 1rem;
			justify-content: center;
			align-items: center;
			font-size: 1.2rem;
			gap: 0.5rem;
			text-align: center;

			span {
				margin: 0;
			}
		}

		.left {
			margin-left: 0.3rem;
			margin-right: 1rem;
			flex: 1;
			min-width: 0;
		}

		&:hover:not(:has(button:hover)) {
			background-color: var(--bg-3);
		}
	}

	.graph {
		height: 10rem;
		width: 100%;
		background-color: var(--bg-2);
		backdrop-filter: blur(6px);
		border-radius: 2rem;
		padding: 1.5rem 0 1rem 0;

		display: flex;
		justify-content: space-around;
		align-items: flex-end;
	}

	.day {
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: flex-end;
		gap: 0.3rem;
		height: 100%;
	}

	.bar {
		width: 1rem;
		background-color: var(--bg-3);
		margin: 0 0.1rem;
		border-radius: 0.5rem;
	}

	.form-popup {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 9;
		top: 0;
		left: 0;
		backdrop-filter: blur(10px);
	}

	.form-container {
		max-width: 30rem;
		width: 100%;
		padding: 1.5rem;
		background-color: var(--bg-2);
		border-radius: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		backdrop-filter: blur(10px);
	}

	.form-container label {
		font-size: 1.2rem;
	}

	.form-container input[type='number'] {
		width: 100%;
		border: none;
		padding: 0.7rem 1.4rem;
		border-radius: 2rem;
		font: inherit;
		font-size: 1.2rem;
		color: inherit;
		background-color: var(--bg-3);
	}

	.form-container input[type='number']:focus {
		outline: none;
		background-color: var(--bg-2);
	}
</style>
