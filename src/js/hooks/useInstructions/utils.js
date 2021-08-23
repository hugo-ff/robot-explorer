import { validateString } from 'utils';

const DIRECTIONS = [
	'north',
	'northEast',
	'east',
	'southEast',
	'south',
	'southWest',
	'west',
	'northWest',
];

/**
 * @function turn
 * @description function that receives a turn direction and determine the new orientation
 * @memberOf Robot
 * @param {string} turnDirection - 'right' or 'left'
 * @return {function} - calls to orient function with the new orientation string as arg
 * @example turn('right') // orient('northEast')
 */
export const turn = (turnDirection, currentOrientation) => {
	if (!validateString(turnDirection)) throw new Error('Must enter a valid turn direction');

	const currentDirectionIndex = DIRECTIONS.indexOf(currentOrientation);
	const indexIncrement = turnDirection === 'right' ? 1 : DIRECTIONS.length - 1;

	return DIRECTIONS[(currentDirectionIndex + indexIncrement) % DIRECTIONS.length];
};

/**
 * @function goBackAndForward
 * @description function that use a hash table that contains all posible advancements or
 * backward moves for each orientation case and returns a call to 'at' func in each one.
 * @param {string} - the current orientation
 * @example advance('northEast') // at(x++, y++);
 */
export const goBackAndForward = (operation, currentOrientation, coords) => {
	if (!DIRECTIONS.includes(currentOrientation)) throw new Error('Must enter a valid orientation');
	const [x, y] = coords;

	const ADVANCEMENTS = {
		north: [x, y + 1],
		northEast: [x + 1, y + 1],
		east: [x + 1, y],
		southEast: [x + 1, y - 1],
		south: [x, y - 1],
		southWest: [x - 1, y - 1],
		west: [x - 1, y],
		northWest: [x - 1, y + 1],
	};

	const BACKWARDS = {
		north: [x, y - 1],
		northEast: [x - 1, y - 1],
		east: [x - 1, y],
		southEast: [x - 1, y + 1],
		south: [x, y + 1],
		southWest: [x + 1, y + 1],
		west: [x + 1, y],
		northWest: [x + 1, y - 1],
	};

	return operation === 'advance' ? ADVANCEMENTS[currentOrientation] : BACKWARDS[currentOrientation];
};
