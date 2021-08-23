import types from './types';

export const setPlacement = coords => ({
	type: types.SET_PLACEMENT,
	payload: coords,
});

export const toggleOnOff = isOn => ({
	type: types.TOGGLE_ON_OFF_ROBOT,
	payload: isOn,
});
