import React from 'react';
import PropTypes from 'prop-types';

import {
	Form, Input, Radio, Label,
} from '../../../components';

import { TYPE_LIST, SIZE_LIST } from '../../utils/enum';
import { toString } from '../../utils/propsUtil';

class LabelPage extends React.Component {
	constructor() {
		super();
		this.state = {
			form: {
				text: '你的测试标签',
				type: 'primary',
				size: 'md',
			},
		};
	}

	getSampleCode = () => {
		const { text, ...form } = this.state.form;
		return `<Label${toString(form, { type: 'primary', size: 'md' })}>
   ${text}
</Label>`;
	};

	render() {
		const { form } = this.state;

		return (
			<div>
				<h1>标签</h1>
				<div className="measurement">
					<div className="preview">
						这是{' '}
						<Label
							type={form.type}
							disabled={form.disabled}
							size={form.size}
							transparent={form.transparent}
							checked={form.checked}
						>
							{form.text}
						</Label>
					</div>

					<div className="form">
						<Form instance={this} path="form">
							<Form.Field name="text" title="Text">
								<Input />
							</Form.Field>
							<Form.Field name="type" title="Type">
								{TYPE_LIST.map(({ name, isDefault }) => (
									<Radio key={name} value={name}>
										{name}
										{isDefault && ' (default)'}
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

LabelPage.propTypes = {
};

export default LabelPage;
