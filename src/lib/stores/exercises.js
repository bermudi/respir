import { persisted } from 'svelte-persisted-store';

export const bestHold = persisted('bestHold', 0);
export const customs = persisted('customs', []);
export const presets = persisted('presets', [
	{
		id: 'igual',
		name: 'respiración igual',
		description: 'te ayuda a relajarte y concentrarte',
		cycles: 10,
		animation: 'circle',
		routine: [
			{
				name: 'inhalar',
				duration: 4,
				type: 'in'
			},
			{
				name: 'exhalar',
				duration: 4,
				type: 'out'
			}
		]
	},
	{
		id: '4-7-8',
		name: 'respiración 4-7-8',
		description: 'promueve la relajación y un mejor sueño',
		cycles: 10,
		animation: 'circle',
		routine: [
			{
				name: 'inhalar',
				duration: 4,
				type: 'in'
			},
			{
				name: 'mantener',
				duration: 7,
				type: 'hold'
			},
			{
				name: 'exhalar',
				duration: 8,
				type: 'out'
			}
		]
	},
	{
		id: 'caja',
		name: 'respiración cuadrada',
		description: 'mejora la concentración y reduce el estrés',
		cycles: 10,
		animation: 'box',
		routine: [
			{
				name: 'inhalar',
				duration: 4,
				type: 'in'
			},
			{
				name: 'mantener',
				duration: 4,
				type: 'hold'
			},
			{
				name: 'exhalar',
				duration: 4,
				type: 'out'
			},
			{
				name: 'mantener',
				duration: 4,
				type: 'hold'
			}
		]
	}
]);
