import React from 'react';
import PropTypes from 'prop-types';

import {
	Navigation, Row, Col, Button,
	Form, Input, Radio, Checkbox, Menu,
} from '../../../components';

import { toString } from '../../utils/objectUtil';

const MENU_SAMPLE = [
	{
		title: '默认选项',
		onClick: () => {
			// TODO: Change this to alert / dialog component
			alert('Clicked!');
		},
	},
	{
		title: '禁用选项',
		disabled: true,
	},
	{
		separator: true,
	},
	{
		title: '包含子菜单',
		list: [
			{
				title: '子菜单 1',
			},
			{
				title: '子菜单 2',
				list: [
					{
						title: '子子菜单',
					},
				],
			},
		],
	},
];

class MenuPage extends React.Component {
	constructor() {
		super();
		this.state = {
			form: {
			},
		};
	}

	render() {
		const { form } = this.state;

		return (
			<Row>
				<Col xs="1/3">
				</Col>

				<Col xs="2/3">
					<h1>菜单</h1>
					<p>
						菜单提供了下拉和右击菜单功能。
					</p>

					<Menu menu={MENU_SAMPLE}>
						<strong>[右击这段文字来实验一下]</strong>
					</Menu>

					<pre>
						{`const menu = ${toString(MENU_SAMPLE)};

<Menu menu={menu}>
   <strong>[右击这段文字来实验一下]</strong>
</Menu>`}
					</pre>

					<p>
						* 同其他组件一样，你可以通过<code>size</code>属性来控制菜单大小。
					</p>
				</Col>
			</Row>
		);
	}
}

MenuPage.propTypes = {
	history: PropTypes.object,
};

export default MenuPage;
