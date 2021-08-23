import types from './types';

const initialState = {
	placement: { x: 0, y: 0, direction: 'north' },
	isOn: false,
};

const robot = (state = initialState, { type, payload }) => {
	if (type === types.TOGGLE_ON_OFF_ROBOT) {
		return {
			...state,
			isOn: payload,
		};
	}

	if (type === types.SET_PLACEMENT) {
		return {
			...state,
			placement: payload,
		};
	}

	return state;
};

export default robot;
