import React from 'react';
import PropTypes from 'prop-types';

import {
	Navigation, Row, Col, Button,
	Form, Input, Radio, Checkbox,
} from '../../../components';

import { toString } from '../../utils/propsUtil';

class MenuPage extends React.Component {
	constructor() {
		super();
		this.state = {
			form: {
			},
		};
	}

	render() {
		const { form } = this.state;

		return (
			<Row>
				<Col xs="1/3">
				</Col>

				<Col xs="2/3">
					<h1>菜单</h1>
					<p>
						菜单提供了下拉和右击菜单功能。
					</p>
				</Col>
			</Row>
		);
	}
}

MenuPage.propTypes = {
	history: PropTypes.object,
};

export default MenuPage;
