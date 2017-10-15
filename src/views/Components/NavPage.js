import React from 'react';
import PropTypes from 'prop-types';

import {
	Navigation, Row, Col, Button, Group,
	Form, Input, Radio, Checkbox, Menu,
	Modal, A, Icon,
} from '../../../components';

import { toString } from '../../utils/objectUtil';

class NavPage extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		return (
			<Row>
				<Col xs="1/3">
				</Col>

				<Col xs="2/3">
					<h1>导航</h1>

					<div className="measurement">
						<div className="preview">
							<Navigation type="forbid">
								<Navigation.Item title="ASD" />
							</Navigation>
						</div>
					</div>
				</Col>
			</Row>
		);
	}
}

NavPage.propTypes = {
	history: PropTypes.object,
};

export default NavPage;
