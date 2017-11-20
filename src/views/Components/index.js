import React from 'react';
import PropTypes from 'prop-types';

import {
	Row, Col,
} from '../../../components';

export default withSideBar = (Component) => {
	class Page extends React.Component {
		render() {
			return (
				<Row>
					<Col xs="1/4">
					</Col>
					<Col xs="3/4">
						<Component />
					</Col>
				</Row>
			);
		}
	}

	return Page;
};
