import { func, bool } from 'prop-types';
import { connect } from 'react-redux';
import { toggleOnOff } from '../../redux/robot/actions';
import styles from './styles';

const Menu = ({ toggleOn, isOn }) => {
	const handleOnClick = () => toggleOn(!isOn);

	return (
		<styles.Menu>
			<styles.Button onClick={handleOnClick}>{!isOn ? 'Encender' : 'Apagar'}</styles.Button>
		</styles.Menu>
	);
};

Menu.propTypes = {
	toggleOn: func,
	isOn: bool,
};

Menu.defaultProps = {
	toggleOn: () => {},
	isOn: false,
};

const mapStateToProps = state => ({
	isOn: state.robot.isOn,
});

const mapDispatchToProps = dispatch => ({
	toggleOn(isOn) {
		dispatch(toggleOnOff(isOn));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
