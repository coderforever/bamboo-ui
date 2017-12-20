import React from 'react';
import PropTypes from 'prop-types';

import {
	Navigation, Row, Col, Button, Group,
	Form, Input, Radio, Checkbox, Menu,
	Modal, A, Icon,
} from '../../../components';

import { toString } from '../../utils/objectUtil';
import { TYPE_LIST, SIZE_LIST } from '../../utils/enum';

class GroupPage extends React.Component {
	constructor() {
		super();
		this.state = {
			form: {
				hasIcon: false,
				type: '',
				size: 'md',
				value: '',
			},
		};
	}

	render() {
		const { form } = this.state;

		return (
			<div>
				<h1>输入框</h1>
				<p>
					你可以通过<code>{'<Input />'}</code>来使用封装好样式的输入框。
				</p>
				<div className="measurement">
					<div className="preview">
						<Form instance={this} path="form">
							<Form.Field name="value">
								<Input
									icon={form.hasIcon ? 'search' : null}
									size={form.size}
									type={form.type}
								/>
							</Form.Field>
						</Form>
					</div>

					<div className="form">
						<Form instance={this} path="form">
							<Form.Field name="size" title="Size">
								{SIZE_LIST.map(({ name, displayName, isDefault }) => (
									<Radio key={name} value={name}>
										{displayName}
										{isDefault && ' (default)'}
									</Radio>
								))}
							</Form.Field>
							<Form.Field name="type" title="Type">
								<Radio value="">(default)</Radio>
								{TYPE_LIST.map(({ name }) => (
									<Radio key={name} value={name}>
										{name}
									</Radio>
								))}
							</Form.Field>
							<Form.Field name="hasIcon">
								<Checkbox>添加图标</Checkbox>
							</Form.Field>
						</Form>
					</div>

					<pre className="code">
					</pre>
				</div>
			</div>
		);
	}
}

GroupPage.propTypes = {
	history: PropTypes.object,
};

export default GroupPage;
