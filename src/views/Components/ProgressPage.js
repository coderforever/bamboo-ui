import React from 'react';
import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';

import {
	Navigation, Row, Col, Button, Group,
	Form, Input, Radio, Checkbox, Menu,
	Modal, A, Icon, Curtain, Progress,
} from '../../../components';

import { TYPE_LIST, SIZE_LIST } from '../../utils/enum';
import { toString } from '../../utils/propsUtil';

import styles from './CurtainPage.scss';

class CurtainPage extends React.Component {
	constructor() {
		super();
		this.state = {
			form: {
				value: 50,
				type: 'primary',
				size: 'md',
				active: false,
				showMark: false,
			},
		};
	}

	render() {
		const { form } = this.state;

		return (
			<div styleName="curtain">
				<h1>进度条</h1>
				<p>
					没错，是个组件库就会有进度条组件。
				</p>

				<h2>试一试</h2>
				<div className="measurement">
					<div className="preview">
						<Progress
							value={Number(form.value)}
							type={form.type}
							size={form.size}
							active={form.active}
							showMark={form.showMark}
						/>
					</div>

					<div className="form">
						<Form instance={this} path="form">
							<Form.Field name="type" title="Type">
								{TYPE_LIST.map(({ name }) => (
									<Radio key={name} value={name}>
										{name}
										{name === 'primary' && ' (default)'}
									</Radio>
								))}
							</Form.Field>
							<Form.Field name="size" title="Size">
								{SIZE_LIST.map(({ name, displayName, isDefault }) => (
									<Radio key={name} value={name}>
										{displayName}
										{isDefault && ' (default)'}
									</Radio>
								))}
							</Form.Field>
							<Form.Field name="value" title="Value">
								<Input type="number" />
							</Form.Field>
							<Form.Field name="showMark" title="Show Mark">
								<Checkbox>showMark</Checkbox>
							</Form.Field>
							<Form.Field name="active" title="Active">
								<Checkbox>active</Checkbox>
							</Form.Field>
						</Form>
					</div>

					<pre className="code">
						lol
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
