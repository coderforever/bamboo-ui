import React from 'react';
import PropTypes from 'prop-types';

import {
	Navigation, Row, Col, Button, DynamicNumber,
	Form, Input, Radio, Checkbox, Tooltip, AutoComplete,
} from '../../../components';

import { TYPE_LIST, SIZE_LIST } from '../../utils/enum';
import { toString } from '../../utils/propsUtil';

class AutoCompletePage extends React.Component {
	constructor() {
		super();
		this.state = {
			form: {},
			value: '',
		};
	}

	getSampleCode = () => {
		return `
<AutoComplete matcher={matcherList} value={...} onChange={...} />
`.replace(/\t/g, '   ').trim();
	};

	render() {
		const { form } = this.state;

		const matcherList = [
			{
				value: 'ABCDE',
			}, {
				value: 'FGHIJ',
			}, {
				value: 'KLMNO',
			}, {
				value: 'PQRST',
			}, {
				value: 'UVWXYZ',
			},
			'ASD',
			'BCD',
			'EGG',
			'GOOD',
			'BAD',
		];

		return (
			<div>
				<h1>自动完成</h1>
				<p>
					该组件将监听键盘事件，请务必确保子组件支持<code>onKeyDown</code>和<code>onKeyUp</code>事件。
				</p>

				<h2>试一试</h2>
				<div className="measurement">
					<div className="preview">
						<Form instance={this}>
							<Form.Field name="value">
								<AutoComplete matcher={matcherList} />
							</Form.Field>
						</Form>
					</div>
					<div className="form">
						<pre>
							{'const matcherList = '}
							{JSON.stringify(matcherList, null, 3)}
						</pre>
					</div>

					<pre className="code">
						{this.getSampleCode()}
					</pre>
				</div>
			</div>
		);
	}
}

AutoCompletePage.propTypes = {
	history: PropTypes.object,
};

export default AutoCompletePage;
