import { connect } from 'react-redux';
import { shape, number, string, bool, func } from 'prop-types';
import toggleLights from '../../redux/lights/actions';

const Lights = ({ placement, isOn, toggleOnOff, lightsOn }) => {
	const { direction } = placement || {};
	const handleClick = () => toggleOnOff(!lightsOn);
	const buttonText = !lightsOn ? 'Encender Luces' : 'Apagar Luces';

	return (
		<>
			{!isOn && <p>Debe encender el robot para poder encender las luces</p>}
			{lightsOn && <p>Las luces apuntan al {direction}</p>}
			{isOn && (
				<button type="button" onClick={handleClick}>
					{buttonText}
				</button>
			)}
		</>
	);
};

Lights.propTypes = {
	placement: shape({
		x: number,
		y: number,
		direction: string,
	}),
	isOn: bool,
	toggleOnOff: func,
	lightsOn: bool,
};

Lights.defaultProps = {
	placement: {},
	isOn: false,
	toggleOnOff: () => {},
	lightsOn: false,
};

const mapStateToProps = ({ robot, lights }) => ({
	placement: robot.placement,
	isOn: robot.isOn,
	lightsOn: lights.lightsOn,
});

const mapDispatchToProps = dispatch => ({
	toggleOnOff(lightsOn) {
		dispatch(toggleLights(lightsOn));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Lights);
