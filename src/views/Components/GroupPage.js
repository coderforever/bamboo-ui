import React from 'react';
import PropTypes from 'prop-types';

import {
	Navigation, Row, Col, Button, Group,
	Form, Input, Radio, Checkbox, Menu,
} from '../../../components';

import { TYPE_LIST, SIZE_LIST } from '../../utils/enum';
import { toString } from '../../utils/propsUtil';

class GroupPage extends React.Component {
	constructor() {
		super();
		this.state = {
			type: 'primary',
			size: 'md',
			radio: 1,
			transparent: false,
		};
	}

	getSampleCode = () => {
		const { radio, ...form } = this.state;
		const btnStr = toString(form, { type: 'primary', size: 'md' });

		return `
<Group>
   <Button${btnStr}>Button 1</Button>
   <Button${btnStr}>Button 2</Button>
   <Button${btnStr}>Button 3</Button>
</Group>

<Group value={${radio}}>
   <Radio value={1}${btnStr}>Radio 1</Radio>
   <Radio value={2}${btnStr}>Radio 2</Radio>
   <Radio value={3}${btnStr}>Radio 3</Radio>
</Group>

<Group>
   <Input />
   <Button${btnStr}>Go</Button>
</Group>
`.trim();
	};

	render() {
		const { type, transparent, size } = this.state;

		return (
			<div>
				<h1>组</h1>
				<p>
					如果您对样式没有过多要求，该组件可以帮助您将组件进行自动组合。
					（支持<code>Button</code>，<code>Radio</code>，<code>Input</code>）
				</p>
				<p>
					如果您希望使用<code>Form.Field</code>进行数据绑定，
					您可以直接将<code>Group</code>作为<code>Form.Field</code>子组件。
				</p>
				<pre>
					{`
<Form instance={this}>
<Form.Field name="radio">
  <Group>
	 <Radio>Radio 1</Radio>
	 <Radio>Radio 2</Radio>
  </Group>
</Form.Field>
</Form>
`.trim()}
				</pre>

				<p>
					* 当您在<code>Group</code>中使用<code>Radio</code>时，
					<code>Radio</code>组件将自动替换成<code>Button</code>组件。
					因而你可以直接在<code>Radio</code>使用<code>Button</code>的属性。
				</p>

				<h2>试一试</h2>
				<Form instance={this}>
					<div className="measurement">
						<div className="preview">
							<Group>
								{[1, 2, 3].map(val => (
									<Button key={val} type={type} size={size} transparent={transparent}>
										Button {val}
									</Button>
								))}
							</Group>

							<Form.Field name="radio">
								<Group>
									{[1, 2, 3].map(val => (
										<Radio
											key={val}
											type={type}
											size={size}
											value={val}
											transparent={transparent}
										>Radio {val}</Radio>
									))}
								</Group>
							</Form.Field>

							<Group>
								<Input aria-label="input" size={size} />
								<Button type={type} size={size} transparent={transparent}>Go</Button>
							</Group>
						</div>

						<div className="form">
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
							<Form.Field name="transparent" title="Transparent">
								<Checkbox>transparent</Checkbox>
							</Form.Field>
						</div>

						<pre className="code">
							{this.getSampleCode()}
						</pre>
					</div>
				</Form>

				<h2>拓展</h2>
				<p>
					有时候，您会希望<code>Group</code>能够占据一整行宽度。这当然是没有问题的！
				</p>
				<p>
					<code>Group</code>组件会自动将子组件用<code>Group.Item</code>包裹起来，
					因而您也可以显示的自己使用<code>Group.Item</code>来包裹子组件。
				</p>

				<div className="measurement">
					<div className="preview">
						<Group>
							<Group.Item width="100%">
								<Input aria-label="input" />
							</Group.Item>
							<Button>Go</Button>
						</Group>
					</div>

					<pre className="code">
						{`<Group>
<Group.Item width="100%">
  <Input />
</Group.Item>
<Button>Go</Button>
</Group>`}
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
