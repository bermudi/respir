<script>
	import IconHouse from '~icons/ph/house-duotone';
	import IconPlus from '~icons/ph/plus';
	import IconImport from '~icons/ph/arrow-square-in-duotone';
	import { goto } from '$app/navigation';
	import { customs } from '$lib/stores/exercises.js';

	let customName;
	let customDesc;
	let customCycles = 10;
	let customBID = 4;
	let customBIHD = 4;
	let customBOD = 4;
	let customBOHD = 4;

	function constructCustom() {
		let custom = {
			id: encodeURIComponent(customName),
			name: customName,
			description: customDesc,
			cycles: customCycles,
			animation: 'circle',
			routine: [
				{
					name: 'inhalar',
					duration: customBID,
					type: 'in'
				}
			]
		};

		if (customBIHD && customBIHD > 0) {
			custom.routine.push({
				name: 'mantener',
				duration: customBIHD,
				type: 'hold'
			});
		}
		custom.routine.push({
			name: 'exhalar',
			duration: customBOD,
			type: 'out'
		});
		if (customBOHD && customBOHD > 0) {
			custom.routine.push({
				name: 'mantener',
				duration: customBOHD,
				type: 'hold'
			});
		}

		return custom;
	}

	function addCustom() {
		let custom = constructCustom();
		$customs = [...$customs, custom];
		goto('/');
	}

	let importValue;

	function importData() {
		let data = JSON.parse(importValue);
		customName = data.name;
		customDesc = data.description;
		customCycles = data.cycles;
		for (let i = 0; i < data.routine.length; i++) {
			if (data.routine[i].type === 'in') {
				customBID = data.routine[i].duration;
			} else if (data.routine[i].type === 'hold') {
				if (i === 1) {
					customBIHD = data.routine[i].duration;
				} else {
					customBOHD = data.routine[i].duration;
				}
			} else if (data.routine[i].type === 'out') {
				customBOD = data.routine[i].duration;
			}
		}
	}
</script>

<svelte:head>
	<title>respirahh: crear</title>
	<meta name="description" content="crear un ejercicio de respiración personalizado." />
</svelte:head>

<main>
	<div>
		<div class="header">
			<a class="icon-button" href="/">
				<IconHouse style="font-size: 1.3rem;" />
			</a>
			<h1>crear ejercicio personalizado</h1>
		</div>
		<div class="box">
			<form on:submit|preventDefault={() => importData()}>
				<div class="row">
					<div class="group">
						<label for="import">importar datos del ejercicio (opcional)</label>
						<br />
						<input id="import" type="text" minlength="1" bind:value={importValue} required />
					</div>
					<button type="submit">
						<IconImport style="font-size: 1.2rem;" />importar
					</button>
				</div>
			</form>
		</div>
		<br />
		<form on:submit|preventDefault={() => addCustom()}>
			<div class="box">
				<div class="row">
					<div class="group">
						<label for="name">nombre</label>
						<br />
						<input
							id="name"
							type="text"
							minlength="1"
							maxlength="50"
							required
							bind:value={customName}
						/>
					</div>
					<div class="group cycles">
						<label for="cycles">ciclos</label>
						<br />
						<input id="cycles" type="number" min="1" step="1" required bind:value={customCycles} />
					</div>
				</div>
				<div class="group">
					<label for="description">descripción</label>
					<br />
					<input id="description" type="text" maxlength="100" bind:value={customDesc} />
				</div>
				<div class="row">
					<div class="group">
						<label for="bid">duración de inhalación </label>
						<br />
						<input id="bid" type="number" min="1" step="1" required bind:value={customBID} />
					</div>
					<div class="group">
						<label for="bihd">duración de retención después de inhalar </label>
						<br />
						<input id="bihd" type="number" step="1" bind:value={customBIHD} />
					</div>
				</div>
				<div class="row">
					<div class="group">
						<label for="bod">duración de exhalación </label>
						<br />
						<input id="bod" type="number" min="1" step="1" required bind:value={customBOD} />
					</div>
					<div class="group">
						<label for="bohd">duración de retención después de exhalar </label>
						<br />
						<input id="bohd" type="number" step="1" bind:value={customBOHD} />
					</div>
				</div>
			</div>
			<button type="submit" class="create">
				<IconPlus />crear ejercicio
			</button>
		</form>
	</div>
</main>

<style lang="scss">
	main {
		flex: 1;
		flex-direction: column;

		@include flexCenter;
	}

	.header {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	.box {
		padding: 1.5rem;
		border-radius: 2rem;
		background-color: var(--bg-2);
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		backdrop-filter: blur(6px);
	}

	.row {
		display: flex;
		gap: 1rem;
		align-items: flex-end; // This will align the inputs at the bottom

		&.buttons {
			justify-content: flex-end;
		}
	}

	.group {
		width: 100%;
		display: flex;
		flex-direction: column; // Stack label and input vertically

		&.cycles {
			width: 30%;
		}

		label {
			margin-bottom: 0.3rem;
			// Remove display: inline-block since we're using flex
		}
	}

	button {
		background-color: var(--bg-2);
		padding: 0.8rem 1rem;
		gap: 0.5rem;
		border-radius: 2rem;
		margin-top: 1rem;
		font-size: 1.2rem;
		transition: background-color 0.2s ease-in-out;

		@include flexCenter;

		&:hover {
			background-color: var(--bg-3);
		}
	}

	label {
		margin-bottom: 0.3rem;
		display: inline-block;
	}

	input {
		width: 100%;
		border: none;
		outline: none;
		font: inherit;
		color: inherit;
		transition: background-color 0.2s ease-in-out;
	}

	input[type='text'],
	input[type='number'] {
		padding: 0.7rem 1.4rem;
		border-radius: 2rem;
		background-color: var(--bg-3);
		height: 2.5rem; // Add fixed height for consistency
		box-sizing: border-box; // Include padding in height calculation

		&:focus {
			background-color: var(--bg-2);
		}
	}
</style>
