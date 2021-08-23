import { useState, useEffect } from 'react';
import { validateNumber, validateObject, validateString } from 'utils';
import Stack from 'classes/stack';
import { turn, goBackAndForward } from './utils';

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

const movesStack = new Stack();
const redoStack = new Stack();

/**
 * @name useInstructions
 * @description - custom hook to handle robot instructions and update placement states
 * @returns {object} - object with functions and observable properties for react hooks
 * @example
 */
const useInstructions = () => {
	const [orientation, setOrientation] = useState('');
	const [coords, setCoords] = useState([]);

	useEffect(() => {
		if (!orientation) return null;

		const placement = { x: coords[0], y: coords[1], direction: orientation };

		if (JSON.stringify(placement) === JSON.stringify(movesStack.peek())) return null;

		return movesStack.push(placement);
	}, [orientation, coords]);

	/**
	 * @function orient
	 * @description function that receives an orientation value and set it to orientation state
	 * @param {string} orientation
	 * @example orient('north') // orientation = 'north'
	 */
	const orient = direction => {
		if (!DIRECTIONS.includes(direction)) throw new Error('Must enter a valid orientation');
		setOrientation(direction);
	};

	/**
	 * @function at
	 * @description high order function that receives 'x' and 'y' coords values and calls to setCoords set state function in order to set the new coords
	 * @param {number} x - this value represents the position between west and east
	 * @param {number} y - this value represents the robot position between north and south
	 * @example at(3, 0) // setCoords([3, 0]);
	 */
	const at = coordsArr => {
		const [x, y] = coordsArr;
		if (!validateNumber(x) || !validateNumber(y)) throw new Error('Must enter valid coordinates');
		return setCoords([x, y]);
	};

	/**
	 * @function turnRight
	 * @description high order function that calls to 'turn' function for set a new orientation
	 * @returns {function} - calls to high order function 'turn' with the turn direction as arg
	 */
	const turnRight = () => orient(turn('right', orientation));

	/**
	 * @function turnLeft
	 * @description high order function that calls to 'turn' function for set a new orientation
	 * @returns {function} - calls to high order function 'turn' with the turn direction as arg
	 */
	const turnLeft = () => orient(turn('left', orientation));

	/**
	 * @function advance
	 * @description high order function that calls 'at' function that calls goBackAndForward
	 * with 'advance' arg
	 * @returns {function} - returns at function with goBackAndForward return value as arg
	 */
	const advance = () => at(goBackAndForward('advance', orientation, coords));

	/**
	 * @function moveBack
	 * @description high order function that calls 'at' function that calls goBackAndForward
	 * with 'moveBack' arg
	 * @returns {function} - returns at function with goBackAndForward return value as arg
	 */
	const moveBack = () => at(goBackAndForward('moveBack', orientation, coords));

	/**
	 * @function place
	 * @description function that receives a placement object data and set a new positioning
	 * by calling 'at' and 'orient' functions
	 * @param {object} placement - { x, y, direction }
	 * @example place({ x: 0, y: 0, direction: 'north' }) // at(0, 0); orient('north');
	 */
	const place = placement => {
		if (!placement) return null;
		if (!validateObject(placement)) throw new Error('Invalid placement data type');
		if (!Object.keys(placement).length) throw new Error('Placement data must not be empty');

		const { x, y, direction } = placement;

		at([x, y]);
		return orient(direction);
	};

	/**
	 * @function evaluateInstructions
	 * @description function that receives an instructions string and for each instruction
	 * calls to the proper method
	 * @param {string} instructions - 'RLALAL'
	 * @returns {function} - commands.forEach(instruction => \[instruction\]());
	 * @example evaluate('RLA') // turnRight(); turnLeft(); advance();
	 */
	const evaluateInstructions = instructions => {
		if (!validateString(instructions) || !/^[AaRrLlBb]+$/.test(instructions))
			throw new Error(
				`Must enter a valid instruction command string.
			 See the robot instructions to learn about valid instructions.`
			);

		const COMMANDS = {
			A: () => advance(),
			L: () => turnLeft(),
			R: () => turnRight(),
			B: () => moveBack(),
		};

		return [...instructions.toUpperCase()].forEach(inst => COMMANDS[inst]());
	};

	/**
	 * @function undo
	 * @description function that takes the placement history stack and undo the last movement
	 * @returns {function} - call to 'place' with the previousPlacement arg
	 * @example undo(placementStack); // place(previousPlacement);
	 */
	const undo = () => {
		if (movesStack.isEmpty()) return null;
		redoStack.push(movesStack.pop());
		return place(movesStack.peek());
	};

	/**
	 * @function undo
	 * @description function that takes the undo movements stack and redo the last undone movement
	 * @returns {function} - call to 'place' with the previousPlacement arg
	 * @example redo(undoneStack); // place(previousPlacement);
	 */
	const redo = () => {
		if (redoStack.isEmpty()) return null;
		return place(redoStack.pop());
	};

	return {
		turnLeft,
		turnRight,
		advance,
		moveBack,
		place,
		orientation,
		coords,
		evaluateInstructions,
		undo,
		redo,
	};
};

export default useInstructions;
