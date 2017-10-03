import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cssModules from 'react-css-modules';

import styles from './index.scss';


class Home extends React.Component {
	render() {
		return (
			<div>
				2333!!!
			</div>
		);
	}
}

Home.propTypes = {
	filter: PropTypes.string,
	dispatch: PropTypes.func,
};

const mapState = ({ app: { filter } }) => ({
	filter,
});

export default connect(mapState)(cssModules(Home, styles));
