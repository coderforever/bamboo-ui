import React from 'react';
import PropTypes from 'prop-types';

import { Navigation, Row, Col } from '../../../components';

class ButtonPage extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		return (
			<Row>
				<Col xs="1/3">
					<Navigation vertical>
						<Navigation.Item>
							Type
							<Navigation.Item>Default</Navigation.Item>
							<Navigation.Item>Primary</Navigation.Item>
							<Navigation.Item>Info</Navigation.Item>
						</Navigation.Item>
						<Navigation.Item>
							Button 2
						</Navigation.Item>
					</Navigation>
				</Col>
			</Row>
		);
	}
}

ButtonPage.propTypes = {
};

export default ButtonPage;
