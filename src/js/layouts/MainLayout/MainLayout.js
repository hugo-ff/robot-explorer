import { element } from 'prop-types';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import styles from './styles';

const MainLayout = ({ children }) => (
	<Provider store={store}>
		<styles.MainLayout data-testid="mainLayout">{children}</styles.MainLayout>
	</Provider>
);

MainLayout.propTypes = {
	children: element.isRequired,
};

export default MainLayout;
