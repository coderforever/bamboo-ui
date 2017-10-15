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
import NavPage from '../Components/NavPage';

import Navigation from '../../../components/Navigation';
import Navigation1 from '../../../components/Navigation';

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
				<Navigation1 active={1} type={type}>
					<Navigation1.Item onClick={() => { this.goPage('/'); }}>Home</Navigation1.Item>
					<Navigation1.Item>
						Components
						<Navigation1.Item onClick={() => { this.goPage('/grid'); }}>Grid</Navigation1.Item>
						<Navigation1.Item onClick={() => { this.goPage('/button'); }}>Button</Navigation1.Item>
						<Navigation1.Item onClick={() => { this.goPage('/icon'); }}>Icon</Navigation1.Item>
						<Navigation1.Item onClick={() => { this.goPage('/slider'); }}>Slider</Navigation1.Item>
						<Navigation1.Item onClick={() => { this.goPage('/menu'); }}>Menu</Navigation1.Item>
						<Navigation1.Item onClick={() => { this.goPage('/group'); }}>Group</Navigation1.Item>
						<Navigation1.Item onClick={() => { this.goPage('/modal'); }}>Modal</Navigation1.Item>
						<Navigation1.Item onClick={() => { this.goPage('/nav'); }}>Navigation</Navigation1.Item>
					</Navigation1.Item>
					<Navigation1.Item>
						Set Type
						<Navigation1.Item onClick={() => { this.setType(''); }}>Default</Navigation1.Item>
						<Navigation1.Item onClick={() => { this.setType('primary'); }}>Primary</Navigation1.Item>
						<Navigation1.Item onClick={() => { this.setType('danger'); }}>Danger</Navigation1.Item>
					</Navigation1.Item>
				</Navigation1>

				<div id="content">
					<Route exact path="/" component={Home} />
					<Route path="/grid" component={GridPage} />
					<Route path="/button" component={ButtonPage} />
					<Route path="/icon" component={IconPage} />
					<Route path="/slider" component={SliderPage} />
					<Route path="/menu" component={MenuPage} />
					<Route path="/group" component={GroupPage} />
					<Route path="/modal" component={ModalPage} />
					<Route path="/nav" component={NavPage} />
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
