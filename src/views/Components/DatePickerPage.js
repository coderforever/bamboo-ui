import React from 'react';
import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';

import {
	Navigation, Row, Col, Button, Group,
	Form, Input, Radio, Checkbox, Menu,
	Modal, A, Icon, Curtain, DatePicker,
	Picker,
} from '../../../components';

import { TYPE_LIST } from '../../utils/enum';
import { toString } from '../../utils/propsUtil';

import styles from './CurtainPage.scss';

class CurtainPage extends React.Component {
	constructor() {
		super();

		const now = new Date();

		this.state = {
			form: {
				value: now.toISOString().replace('T', ' ').slice(0, 10),
			},
			visible: false,
		};
	}

	getSampleCode = () => {
		const { form: { hasClose } } = this.state;
		let closeStr = '';
		if (hasClose) {
			closeStr = ' onClose={...}';
		}

		return `
<Curtain visible={visible}${closeStr}>
	...
</Curtain>
		`.trim().replace(/\t/g, '   ');
	};

	render() {
		const { form } = this.state;

		return (
			<div styleName="curtain">
				<h1>日期选择器</h1>
				<span className="bmbo-caret bmbo-caret-right" />

				<div className="measurement">
					<div className="preview">
						<Form instance={this} path="form">
							<Form.Field name="value">
								<Picker />
							</Form.Field>
						</Form>
					</div>

					<div className="form">
						<Form instance={this} path="form">
						</Form>
					</div>

					<pre className="code">
						{this.getSampleCode()}
					</pre>
				</div>
			</div>
		);
	}
}

CurtainPage.propTypes = {
	history: PropTypes.object,
};

export default cssModules(CurtainPage, styles);
