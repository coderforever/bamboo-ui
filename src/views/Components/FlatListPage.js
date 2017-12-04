import React from 'react';
import PropTypes from 'prop-types';

import {
	Button, Form, Input, Radio, Checkbox, PinBox, FlatList,
} from '../../../components';

import { TYPE_LIST, SIZE_LIST } from '../../utils/enum';
import { toString } from '../../utils/propsUtil';

const FLAT_LIST = [
	{
		value: '1',

		list: [
			{
				value: '1 - 1',
				list: [{ value: '1 - 1 - 1' }],
			},
			{
				value: '1 - 2',
				list: [{ value: '1 - 2 - 1' }],
			},
			{
				value: '1 - 3',
				list: [{ value: '1 - 3 - 1' }],
			},
		],
	},
	{
		value: '2',
		list: [
			{
				value: '2 - 1',
				list: [{ value: '2 - 1 - 1' }],
			},
		],
	},
];

const FLAT_LIST2 = [
	{
		value: '1',

		list: [
			{
				value: '1 - 1',
				title: 'a - 1',
				list: [{ value: 'a - 1 - 1' }],
			},
			{
				value: '1 - 2',
				title: 'a - 2',
				list: [{ value: 'a - 2 - 1' }],
			},
		],
	},
	{
		value: '2',
		list: [
			{
				value: '2 - 1',
				list: [{ value: 'b - 1 - 1' }],
			},
		],
	},
];

class FlatListPage extends React.Component {
	constructor() {
		super();
		this.state = {
			form: {
				value: [],
				trigger: 'click',
				backdrop: false,
				stretch: false,
			},

			list: FLAT_LIST,
		};
	}

	getSampleCode = () => {
		return '';

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
		const { form, list } = this.state;

		return (
			<div>
				<h1>平级列表</h1>
				<p>
					提供了平级下拉功能的列表。
					您可以通过css
					<code>{'.bmbo-flat-list > .bmbo-flat-list-column'}</code>
					来设置列的最大高度。
				</p>

				<div className="measurement">
					<div className="preview">
						<Form instance={this} path="form">
							<Form.Field name="value">
								<FlatList
									list={list}
									columns={3}
								/>
							</Form.Field>
						</Form>
					</div>

					<div className="form">
						<Form instance={this} path="form">
							Value: {JSON.stringify(form.value)}
							{/*<Form.Field name="trigger" title="Trigger">*/}
								{/*{TRIGGER_LIST.map(({ name, isDefault }) => (*/}
									{/*<Radio key={name} value={name}>*/}
										{/*{name}*/}
										{/*{isDefault && ' (default)'}*/}
									{/*</Radio>*/}
								{/*))}*/}
							{/*</Form.Field>*/}

							{/*<Form.Field name="backdrop" title="Backdrop">*/}
								{/*<Checkbox>Hide pin box when click on window</Checkbox>*/}
							{/*</Form.Field>*/}

							{/*<Form.Field name="stretch" title="Stretch">*/}
								{/*<Checkbox>*/}
									{/*{'Stretch the pin box to fit sub component\'s width'}*/}
								{/*</Checkbox>*/}
							{/*</Form.Field>*/}
						</Form>
					</div>
					<pre className="code">
						{this.getSampleCode()}
					</pre>
				</div>

				{/*<Button*/}
					{/*onClick={() => {*/}
						{/*this.setState({ list: FLAT_LIST2 });*/}
					{/*}}*/}
				{/*>Change</Button>*/}
			</div>
		);
	}
}

FlatListPage.propTypes = {
};

export default FlatListPage;
