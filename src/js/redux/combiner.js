import { combineReducers } from 'redux';
import robot from './robot/reducer';
import lights from './lights/reducer';

export default combineReducers({
	robot,
	lights,
});
