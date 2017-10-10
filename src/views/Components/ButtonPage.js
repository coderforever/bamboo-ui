import React from 'react';
import PropTypes from 'prop-types';

import {
	Navigation, Row, Col, Button,
	Form, Input, Radio, Checkbox,
} from '../../../components';

import { toString } from '../../utils/propsUtil';

class ButtonPage extends React.Component {
	constructor() {
		super();
		this.state = {
			form: {
				text: '你的测试按钮',
				type: '',
				disabled: false,
				size: '',
				transparent: false,
				checked: false,
			},
		};
	}

	onNavClick = (path) => {
		const { history } = this.props;
		history.push(path);
	};

	getSampleCode = () => {
		const { text, ...form } = this.state.form;
		return `<Button${toString(form)}>
   ${text}
</Button>`;
	};

	render() {
		const { form } = this.state;

		return (
			<Row>
				<Col xs="1/3">
					<Navigation vertical>
						<Navigation.Item>
							Type
							<Navigation.Item onClick={() => { this.onNavClick('/button/default'); }}>
								Default
							</Navigation.Item>
							<Navigation.Item onClick={() => { this.onNavClick('/button/primary'); }}>
								Primary
							</Navigation.Item>
						</Navigation.Item>
						<Navigation.Item>
							Button 2
						</Navigation.Item>
					</Navigation>
				</Col>

				<Col xs="2/3">
					<h1>按钮</h1>
					<p>
						按钮通过<code>Button</code>调用，我们提供了一下几种样式。
						你可以通过<code>type</code>属性来进行设置。
					</p>
					<div className="preview">
						<span className="margin">
							<Button>default</Button>
						</span>
						<span className="margin">
							<Button type="primary">primary</Button>
						</span>
						<span className="margin">
							<Button type="info">info</Button>
						</span>
						<span className="margin">
							<Button type="success">success</Button>
						</span>
						<span className="margin">
							<Button type="warning">warning</Button>
						</span>
						<span className="margin">
							<Button type="danger">danger</Button>
						</span>
						<span className="margin">
							<Button type="forbid">forbid</Button>
						</span>
					</div>

					<h2>试一试</h2>
					<div className="measurement">
						<div className="preview">
							<Button
								type={form.type}
								disabled={form.disabled}
								size={form.size}
								transparent={form.transparent}
								checked={form.checked}
							>
								{form.text}
							</Button>
						</div>

						<div className="form">
							<Form instance={this} path="form">
								<Form.Field name="text" title="Text">
									<Input />
								</Form.Field>
								<Form.Field name="type" title="Type">
									<Radio value="">(default)</Radio>
									<Radio value="primary">primary</Radio>
									<Radio value="info">info</Radio>
									<Radio value="success">success</Radio>
									<Radio value="warning">warning</Radio>
									<Radio value="danger">danger</Radio>
									<Radio value="forbid">forbid</Radio>
								</Form.Field>
								<Form.Field name="disabled" title="Disabled">
									<Checkbox>disabled</Checkbox>
								</Form.Field>
								<Form.Field name="size" title="Size">
									<Radio value="xs">xs</Radio>
									<Radio value="sm">sm</Radio>
									<Radio value="">(default)</Radio>
									<Radio value="lg">lg</Radio>
								</Form.Field>
								<Form.Field name="transparent" title="Transparent">
									<Checkbox>transparent</Checkbox>
								</Form.Field>
								<Form.Field name="checked" title="Checked">
									<Checkbox>checked</Checkbox>
								</Form.Field>
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

ButtonPage.propTypes = {
	history: PropTypes.object,
};

export default ButtonPage;
