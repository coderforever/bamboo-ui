import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';

import Home from '../Home';
import GridPage from '../Components/GridPage';
import ButtonPage from '../Components/ButtonPage';
import IconPage from '../Components/IconPage';
import SliderPage from '../Components/SliderPage';
import MenuPage from '../Components/MenuPage';
import GroupPage from '../Components/GroupPage';
import ModalPage from '../Components/ModalPage';

import Navigation from '../../../components/Navigation';

import styles from './index.scss';

const isProd = process.env.NODE_ENV === 'production';

class Main extends React.Component {
	constructor() {
		super();
		this.state = {
			type: '',
		};
	}

	setType = (type) => {
		this.setState({ type });
	};

	goPage = (path) => {
		const { history: { push } } = this.props;
		push(path);
	};

	render() {
		const { type } = this.state;

		return (
			<div>
				<Navigation active={1} type={type}>
					<Navigation.Item onClick={() => { this.goPage('/'); }}>Home</Navigation.Item>
					<Navigation.Item>
						Components
						<Navigation.Item onClick={() => { this.goPage('/grid'); }}>Grid</Navigation.Item>
						<Navigation.Item onClick={() => { this.goPage('/button'); }}>Button</Navigation.Item>
						<Navigation.Item onClick={() => { this.goPage('/icon'); }}>Icon</Navigation.Item>
						<Navigation.Item onClick={() => { this.goPage('/slider'); }}>Slider</Navigation.Item>
						<Navigation.Item onClick={() => { this.goPage('/menu'); }}>Menu</Navigation.Item>
						<Navigation.Item onClick={() => { this.goPage('/group'); }}>Group</Navigation.Item>
						<Navigation.Item onClick={() => { this.goPage('/modal'); }}>Modal</Navigation.Item>
					</Navigation.Item>
					<Navigation.Item>
						Set Type
						<Navigation.Item onClick={() => { this.setType(''); }}>Default</Navigation.Item>
						<Navigation.Item onClick={() => { this.setType('primary'); }}>Primary</Navigation.Item>
						<Navigation.Item onClick={() => { this.setType('danger'); }}>Danger</Navigation.Item>
					</Navigation.Item>
				</Navigation>

				<div id="content">
					<Route exact path="/" component={Home} />
					<Route path="/grid" component={GridPage} />
					<Route path="/button" component={ButtonPage} />
					<Route path="/icon" component={IconPage} />
					<Route path="/slider" component={SliderPage} />
					<Route path="/menu" component={MenuPage} />
					<Route path="/group" component={GroupPage} />
					<Route path="/modal" component={ModalPage} />
				</div>
			</div>
		);
	}
}

Main.propTypes = {
	dispatch: PropTypes.func,
	history: PropTypes.object,
};

export default withRouter(connect()(cssModules(Main, styles)));
