import types from './types';

const toggleLights = lightsOn => ({
	type: types.TOGGLE_LIGHTS_ON_OFF,
	payload: lightsOn,
});

export default toggleLights;
