import React from 'react';
import PropTypes from 'prop-types';

import {
	Button, Form, Input, Radio, Checkbox, PinBox,
} from '../../../components';

import { TYPE_LIST, SIZE_LIST } from '../../utils/enum';
import { toString } from '../../utils/propsUtil';

const TRIGGER_LIST = [
	{ name: 'click', isDefault: true },
	//{ name: 'hover' },
];

class PinBoxPage extends React.Component {
	constructor() {
		super();
		this.state = {
			form: {
				trigger: 'click',
				backdrop: false,
				stretch: false,
			},
		};
	}

	getSampleCode = () => {
		const { form } = this.state;
		return `
const $pin = (
	<div>
		<p>Hello World!~</p>
		<p>Hello World!~</p>
		<p>Hello World!~</p>
	</div>
);

<PinBox${toString(form, { trigger: 'click' })}>
	<Button>
		点击此按钮尝试粘附框
	</Button>
</Button>
`.trim().replace(/\t/g, '   ');
	};

	render() {
		const { form } = this.state;

		const $pin = (
			<div>
				<p>Hello World!~</p>
				<p>Hello World!~</p>
				<p>Hello World!~</p>
			</div>
		);

		return (
			<div>
				<h1>粘附框</h1>
				<p>
					粘附框可使你的组件拥有弹出粘附弹框的能力，
					例如<code>{'<Select>'}</code>、<code>{'<DatePciker>'}</code>等组件。
					使用该组件请确保子组件接受对应的鼠标事件。
					此外，我们还提供了<code>onVisibilityChange(visibility)</code>事件用于你来处理弹出框额显示/隐藏事件。
				</p>

				<div className="measurement">
					<div className="preview">
						<PinBox
							trigger={form.trigger}
							backdrop={form.backdrop}
							stretch={form.stretch}
							pin={$pin}
							onVisibilityChange={(visibility) => {
								console.log('Do trigger:', visibility);
							}}
						>
							<Button>
								点击此按钮尝试粘附框
							</Button>
						</PinBox>
					</div>

					<div className="form">
						<Form instance={this} path="form">
							<Form.Field name="trigger" title="Trigger">
								{TRIGGER_LIST.map(({ name, isDefault }) => (
									<Radio key={name} value={name}>
										{name}
										{isDefault && ' (default)'}
									</Radio>
								))}
							</Form.Field>

							<Form.Field name="backdrop" title="Backdrop">
								<Checkbox>Hide pin box when click on window</Checkbox>
							</Form.Field>

							<Form.Field name="stretch" title="Stretch">
								<Checkbox>
									{'Stretch the pin box to fit sub component\'s width'}
								</Checkbox>
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

PinBoxPage.propTypes = {
};

export default PinBoxPage;
