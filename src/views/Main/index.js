import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';

import Home from '../Home';
import ButtonPage from '../ButtonPage';

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
					<Navigation.Item onClick={() => { this.goPage('/'); }}>Main</Navigation.Item>
					<Navigation.Item>
						Components
						<Navigation.Item onClick={() => { this.goPage('/button'); }}>Button</Navigation.Item>
						<Navigation.Item>Good 2 Good Good</Navigation.Item>
						<Navigation.Item>Good 3</Navigation.Item>
					</Navigation.Item>
					<Navigation.Item>
						Set Type
						<Navigation.Item onClick={() => { this.setType(''); }}>Default</Navigation.Item>
						<Navigation.Item onClick={() => { this.setType('primary'); }}>Primary</Navigation.Item>
						<Navigation.Item onClick={() => { this.setType('danger'); }}>Danger</Navigation.Item>
					</Navigation.Item>
				</Navigation>

				<Route exact path="/" component={Home} />
				<Route exact path="/button" component={ButtonPage} />
			</div>
		);
	}
}

Main.propTypes = {
	dispatch: PropTypes.func,
	history: PropTypes.object,
};

export default withRouter(connect()(cssModules(Main, styles)));
