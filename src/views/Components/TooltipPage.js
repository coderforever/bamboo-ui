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
		this.state = {
			form: {
				title: 'Hello, Bamboo UI!',
				placement: 'top',
				inject: false,
			},
		};
	}

	getSampleCode = () => {
		const { form } = this.state;

		return `
<Tooltip${toString(form, { placement: 'top' })}>
	<Button>Hover Me!</Button>
</Tooltip>
`.replace(/\t/g, '   ').trim();
	};

	render() {
		const { form } = this.state;

		return (
			<div>
				<h1>提示框</h1>
				<p>
					该组件会包裹子组件用以处理鼠标事件，
					当然您也可以添加<code>inject</code>属性来注入鼠标事件给子组件，以避免额外的dom元素。
				</p>
				<p>
					(当您使用<code>inject</code>时，请确保子元素接收<code>onMouseEnter</code>与<code>onMouseLeave</code>事件)
				</p>

				<div className="measurement">
					<div className="preview">
						<Tooltip title="Hello, Bamboo UI!">
							【试试悬浮这段文字】
						</Tooltip>
					</div>

					<pre className="code">
						{`
<Tooltip title="Hello, Bamboo UI!">
【试试悬浮这段文字】
</Tooltip>
						`.replace(/\t/g, '   ').trim()}
					</pre>
				</div>

				<h2>试一试</h2>
				<div className="measurement">
					<div className="preview">
						<Tooltip
							title={form.title}
							placement={form.placement}
							inject={form.inject}
						>
							<Button>Hover Me!</Button>
						</Tooltip>
					</div>
					<div>
						<Form instance={this} path="form">
							<Form.Field name="title" title="Title">
								<Input />
							</Form.Field>
							<Form.Field name="placement" title="placement">
								<Radio value="top">Top (default)</Radio>
								<Radio value="bottom">Bottom</Radio>
								<Radio value="left">Left</Radio>
								<Radio value="right">Right</Radio>
							</Form.Field>
							<Form.Field name="inject" title="Inject">
								<Checkbox>inject</Checkbox>
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

ButtonPage.propTypes = {
	history: PropTypes.object,
};

export default ButtonPage;
