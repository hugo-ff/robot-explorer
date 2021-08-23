import types from './types';

const initialState = {
	lightsOn: false,
};

const lights = (state = initialState, { type, payload }) => {
	if (type === types.TOGGLE_LIGHTS_ON_OFF) {
		return {
			...state,
			lightsOn: payload,
		};
	}

	return state;
};

export default lights;
