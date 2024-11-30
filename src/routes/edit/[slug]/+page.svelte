<script>
	import IconHouse from '~icons/ph/house-duotone';
	import IconCheck from '~icons/ph/check';
	import IconImport from '~icons/ph/arrow-square-in-duotone';
	import IconCopy from '~icons/ph/copy-duotone';
	import { goto } from '$app/navigation';
	import { customs } from '$lib/stores/exercises.js';

	export let data;

	let index = data.index;

	let customName;
	let customDesc;
	let customCycles;
	let customBID;
	let customBIHD;
	let customBOD;
	let customBOHD;

	$: deconstructCustom($customs[index]);

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

	function deconstructCustom(custom) {
		customName = custom.name;
		customDesc = custom.description;
		customCycles = custom.cycles;
		for (let i = 0; i < custom.routine.length; i++) {
			if (custom.routine[i].type === 'in') {
				customBID = custom.routine[i].duration;
			} else if (custom.routine[i].type === 'hold') {
				if (i === 1) {
					customBIHD = custom.routine[i].duration;
				} else {
					customBOHD = custom.routine[i].duration;
				}
			} else if (custom.routine[i].type === 'out') {
				customBOD = custom.routine[i].duration;
			}
		}
	}

	function editCustom() {
		let custom = constructCustom();
		$customs[index] = custom;
		goto('/');
	}

	let importValue;

	function importData() {
		let data = JSON.parse(importValue);
		deconstructCustom(data);
	}

	function exportData() {
		let custom = constructCustom();
		let exportValue = JSON.stringify(custom);
		navigator.clipboard.writeText(exportValue);
	}
</script>

<svelte:head>
	<title>respirahh: editar</title>
	<meta name="description" content="editar un ejercicio de respiración personalizado." />
</svelte:head>

<main>
	<div>
		<div class="header">
			<a class="icon-button" href="/">
				<IconHouse style="font-size: 1.3rem;" />
			</a>
			<h1>editar ejercicio</h1>
		</div>
		<div class="box">
			<form on:submit|preventDefault={() => importData()}>
				<div class="row">
					<div class="group">
						<label for="import">importar datos del ejercicio (opcional)</label>
						<br />
						<input
							id="import"
							name="import"
							type="text"
							minlength="1"
							bind:value={importValue}
							required
						/>
					</div>
					<button type="submit">
						<IconImport style="font-size: 1.2rem;" />importar
					</button>
				</div>
			</form>
		</div>
		<br />
		<form on:submit|preventDefault={() => editCustom()}>
			<div class="box">
				<div class="row">
					<div class="group">
						<label for="name">nombre</label>
						<br />
						<input
							id="name"
							type="text"
							minlength="1"
							maxlength="20"
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
			<div class="row buttons">
				<button type="button" class="export" on:click={exportData}>
					<IconCopy style="font-size: 1.2rem;" />exportar
				</button>
				<button type="submit" class="save">
					<IconCheck style="font-size: 1.2rem;" />guardar
				</button>
			</div>
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

		&.buttons {
			justify-content: space-between;
		}
	}

	.group {
		width: 100%;

		&.cycles {
			width: 30%;
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

		&:focus {
			background-color: var(--bg-2);
		}
	}
</style>
