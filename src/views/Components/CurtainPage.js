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
			visible: false,
		};
	}

	render() {
		const { visible } = this.state;

		return (
			<Row styleName="curtain">
				<Col xs="1/3">
				</Col>

				<Col xs="2/3">
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

							<Curtain visible={visible} styleName="curtain-sample">
								<h1>你好，幕布</h1>
								<img src="./assets/light.jpg" alt="Light" />
								<Button
									onClick={() => {
										this.setState({ visible: false });
									}}
								>点击关闭</Button>
							</Curtain>
						</div>

						<pre className="code">
							{`
<Curtain visible={visible}>
   ...
</Curtain>
`.trim()}
						</pre>
					</div>
				</Col>
			</Row>
		);
	}
}

CurtainPage.propTypes = {
	history: PropTypes.object,
};

export default cssModules(CurtainPage, styles);
