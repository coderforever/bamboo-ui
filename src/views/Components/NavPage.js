import React from 'react';
import PropTypes from 'prop-types';

import {
	Navigation, Row, Col, Button, Group,
	Form, Input, Radio, Checkbox, Menu,
	Modal, A, Icon,
} from '../../../components';

import { TYPE_LIST } from '../../utils/enum';

class NavPage extends React.Component {
	constructor() {
		super();
		this.state = {
			type: '',
			active: -1,
		};
	}

	render() {
		const { type, active } = this.state;

		return (
			<Row>
				<Col xs="1/3">
				</Col>

				<Col xs="2/3">
					<h1>导航条</h1>

					<h2>试一试</h2>
					<div className="measurement">
						<div className="preview">
							<Navigation type={type}>
								<Navigation.Group title="Group 1" active={active === 0}>
									<Navigation.Item>Item 1</Navigation.Item>
									<Navigation.Item>Item 2</Navigation.Item>
									<Navigation.Item>Item 3</Navigation.Item>
								</Navigation.Group>
								<Navigation.Item active={active === 1}>
									<a
										href="https://github.com/zombieJ/bamboo-ui"
										target="_blank"
										rel="noopener noreferrer"
									>
										Item 1
									</a>
								</Navigation.Item>
							</Navigation>
						</div>
						<div className="form">
							<Form instance={this}>
								<Form.Field name="type" title="Type">
									<Radio value="">(default)</Radio>
									{TYPE_LIST.map(({ name }) => (
										<Radio key={name} value={name}>{name}</Radio>
									))}
								</Form.Field>
								<Form.Field name="active" title="Active">
									<Radio value={-1}>(none)</Radio>
									<Radio value={0}>No.1</Radio>
									<Radio value={1}>No.2</Radio>
								</Form.Field>
							</Form>
						</div>
						<pre className="code">
							{`

`.trim()}
						</pre>
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
