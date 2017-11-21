import React from 'react';
import PropTypes from 'prop-types';
import cssModules from 'react-css-modules';

import {
	Navigation, Row, Col, Button, Group,
	Form, Input, Radio, Checkbox, Menu,
	Modal, A, Icon, Curtain,
} from '../../../components';

import { TYPE_LIST } from '../../utils/enum';
import { toString } from '../../utils/propsUtil';

import styles from './CurtainPage.scss';

class CurtainPage extends React.Component {
	constructor() {
		super();
		this.state = {
			form: {
				hasClose: false,
			},
			visible: false,
		};
	}

	onCurtainClose = () => {
		this.setState({ visible: false });
	};

	getSampleCode = () => {
		const { form: { hasClose } } = this.state;
		let closeStr = '';
		if (hasClose) {
			closeStr = ' onClose={...}';
		}

		return `
<Curtain visible={visible}${closeStr}>
	...
</Curtain>
		`.trim().replace(/\t/g, '   ');
	};

	render() {
		const { visible, form: { hasClose } } = this.state;

		const props = {};
		if (hasClose) {
			props.onClose = this.onCurtainClose;
		}

		return (
			<div styleName="curtain">
				<h1>幕布</h1>
				<p>
					该组件提供全屏幕布，你可以通过它来创建一个临时的弹窗空白页面。
				</p>

				<div className="measurement">
					<div className="preview">
						<Button
							onClick={() => {
								this.setState({ visible: true });
							}}
						>
							点击展示舞台
						</Button>

						<Curtain visible={visible} styleName="curtain-sample" {...props}>
							<h1>你好，幕布</h1>
							<img src="./assets/light.min.jpg" alt="Light" />
							<Button
								onClick={() => {
									this.setState({ visible: false });
								}}
							>点击关闭</Button>
						</Curtain>
					</div>

					<div className="form">
						<Form instance={this} path="form">
							<Form.Field name="hasClose">
								<Checkbox>
									Provide <code>onClose</code> function.
									(Will show <span className="bmbo-times" /> on the top right)
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

CurtainPage.propTypes = {
	history: PropTypes.object,
};

export default cssModules(CurtainPage, styles);
