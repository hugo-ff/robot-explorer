import Robot from 'components/Robot';
import Menu from 'components/Menu';
import styles from './styles';

const Home = () => (
	<styles.Home data-testid="home">
		<styles.Container>
			<h1>Mars Robot Explorer!</h1>
			<Robot />
			<Menu />
		</styles.Container>
	</styles.Home>
);

export default Home;
