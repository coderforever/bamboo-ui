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
				multi: false,
				size: 'md',
				disabled: false,
				noSelectAll: false,
				optionDisabled: false,
				groupDisabled: false,
			},
		};
	}

	getSampleCode = () => {
		const { optionDisabled, groupDisabled, ...form } = this.state.form;
		return `
const VALUE_LIST = ${JSON.stringify(VALUE_LIST)};

<Select${toString(form, { size: 'md' })}>
	<Select.Group title="Group 1"${toString({ disabled: groupDisabled })}>
		<Select.Option>Group Value 1</Select.Option>
		<Select.Option>Group Value 2</Select.Option>
		<Select.Option>Group Value 3</Select.Option>
	</Select.Group>
	{VALUE_LIST.map(val => (
		<Select.Option key={val}${toString({ disabled: optionDisabled })}>{val}</Select.Option>
	))}
</Button>`.trim().replace(/\t/g, '   ');
	};

	render() {
		const { form } = this.state;

		return (
			<div>
				<h1>选择框</h1>
				<div className="measurement">
					<div className="preview">
						<Form instance={this} path="form">
							<Form.Field name="value">
								<Select
									value={form.value}
									multi={form.multi}
									size={form.size}
									disabled={form.disabled}
									noSelectAll={form.noSelectAll}
								>
									<Select.Group title="Group 1" disabled={form.groupDisabled}>
										<Select.Option>Group Value 1</Select.Option>
										<Select.Option>Group Value 2</Select.Option>
										<Select.Option>Group Value 3</Select.Option>
									</Select.Group>
									{VALUE_LIST.map(val => (
										<Select.Option key={val} disabled={form.optionDisabled}>
											{val}
										</Select.Option>
									))}
								</Select>
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

							<Form.Field name="multi" title="Multi">
								<Checkbox>multi</Checkbox>
							</Form.Field>

							{form.multi &&
								<Form.Field name="noSelectAll" title="No Select All">
									<Checkbox>noSelectAll</Checkbox>
								</Form.Field>
							}

							<Form.Field name="disabled" title="Disabled">
								<Checkbox>disabled</Checkbox>
							</Form.Field>

							<Form.Field name="optionDisabled" title="Option Disabled">
								<Checkbox>Option Disabled</Checkbox>
							</Form.Field>

							<Form.Field name="groupDisabled" title="Group Disabled">
								<Checkbox>Group Disabled</Checkbox>
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

SelectPage.propTypes = {
	history: PropTypes.object,
};

export default SelectPage;
