import React from 'react';
import PropTypes from 'prop-types';

import {
	Navigation, Row, Col, Button, Group,
	Form, Input, Radio, Checkbox, Menu,
	Modal,
} from '../../../components';

import { toString } from '../../utils/objectUtil';

class GroupPage extends React.Component {
	constructor() {
		super();
		this.state = {
			visible: false,
		};
	}

	onShowModal = () => {
		this.setState({ visible: true });
	};

	render() {
		const { visible } = this.state;

		return (
			<Row>
				<Col xs="1/3">
				</Col>

				<Col xs="2/3">
					<h1>模态对话框</h1>
					<p>
						创建一个非阻塞弹出框，支持多层弹窗与异步检测功能。
					</p>

					<div className="preview">
						<Button onClick={this.onShowModal}>点击弹窗</Button>
						<Modal visible={visible} />
					</div>

					<div style={{ height: '2000px' }} />
				</Col>
			</Row>
		);
	}
}

GroupPage.propTypes = {
	history: PropTypes.object,
};

export default GroupPage;
