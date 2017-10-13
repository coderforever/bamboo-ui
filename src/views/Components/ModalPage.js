import React from 'react';
import PropTypes from 'prop-types';

import {
	Navigation, Row, Col, Button, Group,
	Form, Input, Radio, Checkbox, Menu,
	Modal,
} from '../../../components';

import { toString } from '../../utils/objectUtil';

const MODAL_TYPES = ['default', 'primary', 'info', 'success', 'warning', 'danger', 'forbid'];

class GroupPage extends React.Component {
	constructor() {
		super();
		this.state = {
			visible: false,
			typesVisible: {},
			prefaceVisible: false,
			confirmVisible: false,
			loadingVisible: false,
			loading: false,
		};
	}

	onShowModal = () => {
		this.setState({ visible: true });
	};
	onHideModal = () => {
		this.setState({ visible: false });
	};

	render() {
		const { visible, typesVisible, prefaceVisible, confirmVisible, loadingVisible, loading } = this.state;

		return (
			<Row>
				<Col xs="1/3">
				</Col>

				<Col xs="2/3">
					<h1>模态对话框</h1>
					<p>
						创建一个非阻塞对话框，支持多层弹窗与异步检测功能。
					</p>

					<div className="measurement">
						<div className="preview">
							<Button onClick={this.onShowModal}>点击弹窗</Button>
							<Modal visible={visible} onClose={this.onHideModal} size="sm">
								<Modal.Title>Modal</Modal.Title>
								{/*<Button onClick={this.onHideModal}>Close</Button>*/}
								{/*<Modal.Footer>Hello World!</Modal.Footer>*/}
								{/*<Modal.Preface>Modal</Modal.Preface>*/}
								Hello, Bamboo UI!~
							</Modal>
						</div>

						<pre className="code">
							{`
<Modal
   title="Modal"
   visible={this.state.visible}
   onClose={() => { this.setState({ visible: false }); }}
>
   Hello, Bamboo UI!~
</Modal>
`.trim()}
						</pre>
					</div>

					<h2>状态对话框</h2>
					<p>
						有时候，你希望能够有显示的状态提示。
						您可以通过设置<code>type</code>属性来设置状态（同<code>Button</code>）。
					</p>
					<div className="preview">
						{MODAL_TYPES.map(t => (
							<div className="inline" key={t}>
								<Button
									onClick={() => {
										this.setState({
											typesVisible: {
												...typesVisible,
												[t]: true,
											},
										});
									}}
									type={t}
								>点击弹窗</Button>{' '}
								<Modal
									title="Primary Modal"
									type={t}
									visible={typesVisible[t]}
									onClose={() => {
										this.setState({
											typesVisible: {
												...typesVisible,
												[t]: false,
											},
										});
									}}
								>
									Hello, Bamboo UI!~
								</Modal>
							</div>
						))}
					</div>

					<h2>引言对话框</h2>
					<p>
						有时候，你会希望拓展对话框。
						你可以使用<code>Modal.Preface</code>来添加额外内容。
					</p>

					<div className="preview">
						<Button
							onClick={() => {
								this.setState({ prefaceVisible: true });
							}}
						>点击弹窗</Button>
						<Modal
							title="Preface Modal"
							visible={prefaceVisible}
							onClose={() => {
								this.setState({
									prefaceVisible: false,
								});
							}}
						>
							<p>This is a Modal with Preface:</p>
							<pre className="code">
							{`
<Modal ...>
   <Modal.Preface>
      <img src="/assets/light.jpg" />
   </Modal.Preface>
   ...
</Modal>
`.trim()}
							</pre>
							<Modal.Preface>
								<img src="/assets/light.jpg" alt="Light" />
							</Modal.Preface>
						</Modal>
					</div>

					<h2>确认对话框</h2>
					<p>
						当你设置<code>onConfirm</code>事件属性后，对话框将自动转换成确认对话框。
						（您可以通过添加<code>noMaskClose</code>属性来禁用点击背景关闭功能）
					</p>

					<div className="measurement">
						<div className="preview">
							<Button
								onClick={() => {
									this.setState({ confirmVisible: true });
								}}
							>点击弹窗</Button>
							<Modal
								title="Confirm Modal"
								visible={confirmVisible}
								onClose={() => {
									this.setState({
										confirmVisible: false,
									});
								}}
								onConfirm={() => {
									// TODO: do alert
									console.log('confirm');
									this.setState({
										confirmVisible: false,
									});
								}}
								noMaskClose
							>
								Click confirm will popup another modal
							</Modal>
						</div>

						<pre className="code">
							{`
<Modal onConfirm={...} noMaskClose ...>
   ...
</Modal>
`.trim()}
						</pre>
					</div>
					<p>
						同样，你也可以通过<code>cancelText</code>和<code>confirmText</code>
						来自定义Cancel和Confirm按钮的文本内容。
					</p>

					<h2>等待对话框</h2>
					<p>
						当你需要异步操作时，你可以通过设置<code>loading</code>属性，暂时将对话框锁定。
					</p>

					<div className="measurement">
						<div className="preview">
							<Button
								onClick={() => {
									this.setState({ loadingVisible: true });
								}}
							>点击弹窗</Button>
							<Modal
								title="Confirm Modal"
								visible={loadingVisible}
								loading={loading}
								onClose={() => {
									this.setState({
										loadingVisible: false,
									});
								}}
								onConfirm={() => {
									this.setState({ loading: true });
									setTimeout(() => {
										this.setState({ loading: false, loadingVisible: false });
									}, 2000);
								}}
							>
								Click confirm will display loading animation
							</Modal>
						</div>

						<pre className="code">
							{`
<Modal onConfirm={...} ...>
   ...
</Modal>
`.trim()}
						</pre>
					</div>

					<h2>js调用</h2>
					<p>
						当然，有时候您会希望弹出框像使用<code>alert</code>一般，召之即来。这当然是可以的：
					</p>
					<div className="measurement">
						<div className="preview">
							<Button
								onClick={() => {
									Modal.showDialog({
										title: 'Hello',
										content: 'Bamboo UI',
									});
								}}
							>弹出对话框</Button>

							{' '}

							<Button
								onClick={() => {
									Modal.showDialog({
										title: 'Hello',
										content: 'Bamboo UI',
										onConfirm: () => {
											console.log('Yes!');
										},
									});
								}}
							>弹出确认框</Button>
						</div>
					</div>
				</Col>
			</Row>
		);
	}
}

GroupPage.propTypes = {
	history: PropTypes.object,
};

export default GroupPage;
