import React from 'react';
import PropTypes from 'prop-types';

import {
	Navigation, Row, Col, Button,
	Form, Input, Radio, Checkbox, Select,
} from '../../../components';

import { TYPE_LIST, SIZE_LIST } from '../../utils/enum';
import { toString } from '../../utils/propsUtil';

const VALUE_LIST = [
	'Good',
	'Bad',
	'Just So So',
];

class SelectPage extends React.Component {
	constructor() {
		super();
		this.state = {
			form: {
				value: VALUE_LIST[0],
			},
		};
	}

	getSampleCode = () => {
		const { text, ...form } = this.state.form;
		return `<Button${toString(form, { type: 'primary', size: 'md' })}>
   ${text}
</Button>`;
	};

	render() {
		const { form } = this.state;

		return (
			<Row>
				<Col xs="1/3">
				</Col>

				<Col xs="2/3">
					<h1>选择框</h1>
					<div className="measurement">
						<div className="preview">
							<Form instance={this} path="form">
								<Form.Field name="value">
									<Select
										value={form.value}
									>
										{VALUE_LIST.map(val => (
											<Select.Option key={val}>{val}</Select.Option>
										))}
									</Select>
								</Form.Field>
							</Form>
						</div>

						<div className="form">
							<Form instance={this} path="form">
								{/*<Form.Field name="value" title="Value">*/}
									{/*<Input />*/}
								{/*</Form.Field>*/}
								{/*<Form.Field name="type" title="Type">*/}
									{/*{TYPE_LIST.map(({ name, isDefault }) => (*/}
										{/*<Radio key={name} value={name}>*/}
											{/*{name}*/}
											{/*{isDefault && ' (default)'}*/}
										{/*</Radio>*/}
									{/*))}*/}
								{/*</Form.Field>*/}
								{/*<Form.Field name="disabled" title="Disabled">*/}
									{/*<Checkbox>disabled</Checkbox>*/}
								{/*</Form.Field>*/}
								{/*<Form.Field name="size" title="Size">*/}
									{/*{SIZE_LIST.map(({ name, displayName, isDefault }) => (*/}
										{/*<Radio key={name} value={name}>*/}
											{/*{displayName}*/}
											{/*{isDefault && ' (default)'}*/}
										{/*</Radio>*/}
									{/*))}*/}
								{/*</Form.Field>*/}
								{/*<Form.Field name="transparent" title="Transparent">*/}
									{/*<Checkbox>transparent</Checkbox>*/}
								{/*</Form.Field>*/}
								{/*<Form.Field name="checked" title="Checked">*/}
									{/*<Checkbox>checked</Checkbox>*/}
								{/*</Form.Field>*/}
							</Form>
						</div>
						<pre className="code">
							{this.getSampleCode()}
						</pre>
					</div>
				</Col>
			</Row>
		);
	}
}

SelectPage.propTypes = {
	history: PropTypes.object,
};

export default SelectPage;