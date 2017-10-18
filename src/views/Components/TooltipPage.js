import React from 'react';
import PropTypes from 'prop-types';

import {
	Navigation, Row, Col, Button,
	Form, Input, Radio, Checkbox, Tooltip,
} from '../../../components';

import { TYPE_LIST, SIZE_LIST } from '../../utils/enum';
import { toString } from '../../utils/propsUtil';

class ButtonPage extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		const { form } = this.state;

		return (
			<Row>
				<Col xs="1/3">
					<Tooltip title="hi, Bamboo UI! hi, Bamboo UI! hi, Bamboo UI!hi, Bamboo UI!hi, Bamboo UI!hi, Bamboo UI!hi, Bamboo UI!">
						A
					</Tooltip>
				</Col>

				<Col xs="2/3">
					<h1>提示框</h1>
					<p>
						该组件会包裹子组件用以处理鼠标事件，
						当然您也可以添加<code>inject</code>属性来注入鼠标事件给子组件。
					</p>

					<div className="measurement">
						<div className="preview">
							<Tooltip title="=-=-=-=">
								A
							</Tooltip>
						</div>
					</div>
				</Col>
			</Row>
		);
	}
}

ButtonPage.propTypes = {
	history: PropTypes.object,
};

export default ButtonPage;
