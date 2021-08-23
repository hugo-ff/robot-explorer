import { useEffect } from 'react';
import { number, string, shape, bool, func } from 'prop-types';
import useInstructions from 'hooks/useInstructions';
import { connect } from 'react-redux';
import Lights from 'components/Lights';
import { setPlacement } from '../../redux/robot/actions';

const Robot = ({ placement, isOn, setNewPlacement }) => {
	const { turnLeft, turnRight, advance, moveBack, place, orientation, coords, undo, redo } =
		useInstructions();

	useEffect(() => {
		if (!isOn) return;
		place(placement);
	}, [isOn]);

	useEffect(() => {
		if (!isOn) return;
		setNewPlacement({ x: coords[0], y: coords[1], direction: orientation });
	}, [coords, orientation]);

	const handleKeyUp = e => {
		if (!isOn) return null;

		const KEYS_TABLE = {
			37: () => turnLeft(),
			38: () => advance(),
			39: () => turnRight(),
			40: () => moveBack(),
		};

		return KEYS_TABLE[e.keyCode.toString()]();
	};

	return (
		<div>
			<h2>Robot</h2>
			<p>Estado: {isOn ? 'Encendido' : 'Apagado'}</p>
			<p>Mis coordenadas actuales son: {`[${coords[0]}, ${coords[1]}]`}</p>
			<p>Estoy mirando hacia el: {orientation}</p>
			<input type="text" onKeyUp={handleKeyUp} />
			<button type="button" onClick={undo}>
				Deshacer movimiento
			</button>
			<button type="button" onClick={redo}>
				Rehacer movimiento
			</button>
			<Lights />
		</div>
	);
};

Robot.propTypes = {
	placement: shape({
		x: number,
		y: number,
		direction: string,
	}),
	isOn: bool,
	setNewPlacement: func,
};

Robot.defaultProps = {
	placement: {},
	isOn: false,
	setNewPlacement: () => {},
};

const mapStateToProps = ({ robot }) => ({
	placement: robot.placement,
	isOn: robot.isOn,
});

const mapDispatchToProps = dispatch => ({
	setNewPlacement(newPlacement) {
		dispatch(setPlacement(newPlacement));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Robot);
